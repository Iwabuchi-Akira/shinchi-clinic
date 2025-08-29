package handlers

import (
	"net/http"

	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/models"
	"github.com/labstack/echo/v4"
)

type RegisterRequest struct {
	Username string `json:"username" form:"username"`
}

func CreateUser(c echo.Context) error {
	req := new(RegisterRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	if req.Username == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Username is required"})
	}

	var existingUser models.User
	if err := db.DB.Where("username = ?", req.Username).First(&existingUser).Error; err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"error": "User already exists"})
	}

	password, err := models.GenerateSecurePassword()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate password"})
	}

	user := models.User{
		Username: req.Username,
		Password: password,
	}

	if err := db.DB.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create user"})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message":  "User created successfully",
		"password": password,
		"user": map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

func GetUsers(c echo.Context) error {
	var users []models.User
	if err := db.DB.Find(&users).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch users"})
	}

	var userResponses []map[string]interface{}
	for _, user := range users {
		userResponses = append(userResponses, map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"count": len(users),
		"users": userResponses,
	})
}

func DeleteUser(c echo.Context) error {
	userID := c.Param("id")
	if userID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "User ID is required"})
	}

	var user models.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	if err := db.DB.Delete(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete user"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "User deleted successfully",
		"user": map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}
