package handlers

import (
	"net/http"
	"os"
	"time"

	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/models"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

// ログインリクエスト用の構造体
type LoginRequest struct {
	Username string `json:"username" form:"username"`
	Password string `json:"password" form:"password"`
}

// ユーザー登録リクエスト用の構造体（パスワードフィールドを削除）
type RegisterRequest struct {
	Username string `json:"username" form:"username"`
}

// JWTシークレットキーを取得（環境変数から取得、なければデフォルト値）
func getJWTSecret() string {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "your-secret-key" // 本番環境では必ず環境変数で設定してください
	}
	return secret
}

// ユーザー登録
func Register(c echo.Context) error {
	req := new(RegisterRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// バリデーション
	if req.Username == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Username is required"})
	}

	// ユーザーが既に存在するかチェック
	var existingUser models.User
	if err := db.DB.Where("username = ?", req.Username).First(&existingUser).Error; err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"error": "User already exists"})
	}

	// 強力なパスワードを自動生成
	password, err := models.GenerateSecurePassword()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate password"})
	}

	// 新しいユーザーを作成
	user := models.User{
		Username: req.Username,
		Password: password, // BeforeCreateでハッシュ化される
	}

	if err := db.DB.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create user"})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message":  "User created successfully",
		"password": password, // 生成されたパスワードを返す
		"user": map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

// ログイン
func Login(c echo.Context) error {
	req := new(LoginRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// ユーザーを検索
	var user models.User
	if err := db.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
	}

	// パスワードを確認
	if !user.CheckPassword(req.Password) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
	}

	// JWTトークンを生成
	claims := jwt.MapClaims{
		"user_id":  user.ID,
		"username": user.Username,
		"exp":      time.Now().Add(time.Minute * 15).Unix(), // 15分有効
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(getJWTSecret()))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate token"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"token": t,
		"user": map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

// 現在のユーザー情報を取得
func GetCurrentUser(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := uint(claims["user_id"].(float64))

	var currentUser models.User
	if err := db.DB.First(&currentUser, userID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"id":       currentUser.ID,
		"username": currentUser.Username,
	})
}
