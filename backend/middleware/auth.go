package middleware

import (
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

// JWTシークレットキーを取得
func getJWTSecret() string {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "your-secret-key" // 本番環境では必ず環境変数で設定してください
	}
	return secret
}

// JWT認証ミドルウェア
func JWTMiddleware() echo.MiddlewareFunc {
	config := echojwt.Config{
		SigningKey: []byte(getJWTSecret()),
	}
	return echojwt.WithConfig(config)
}
