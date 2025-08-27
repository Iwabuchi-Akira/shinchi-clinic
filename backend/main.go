package main

import (
	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/handlers"
	"shinchi-clinic-backend/models"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	db.Init()
	db.DB.AutoMigrate(&models.News{}, &models.Blog{})

	e := echo.New()

	e.Use(middleware.CORS())

	e.GET("/api/news", handlers.GetNews)
	e.POST("/api/news", handlers.CreateNews)
	e.GET("/api/news/:id", handlers.GetNewsByID)
	e.PUT("/api/news/:id", handlers.UpdateNews)
	e.DELETE("/api/news/:id", handlers.DeleteNews)

	e.GET("/api/blog", handlers.GetBlogs)
	e.POST("/api/blog", handlers.CreateBlog)
	e.GET("/api/blog/:id", handlers.GetBlogByID)

	e.Logger.Fatal(e.Start(":8080"))
}
