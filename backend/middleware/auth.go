package middleware

import (
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func getJWTSecret() string {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "your-secret-key" 
	}
	return secret
}

func JWTMiddleware() echo.MiddlewareFunc {
	config := echojwt.Config{
		SigningKey: []byte(getJWTSecret()),
	}
	return echojwt.WithConfig(config)
}
