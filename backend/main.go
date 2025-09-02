package main

import (
	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/handlers"
	authmiddleware "shinchi-clinic-backend/middleware"
	"shinchi-clinic-backend/models"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	db.Init()
	db.DB.AutoMigrate(&models.News{}, &models.Blog{}, &models.User{})

	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	public := e.Group("/api")
	protected := e.Group("/api")
	protected.Use(authmiddleware.JWTMiddleware())

	public.POST("/login", handlers.Login)
	
	protected.GET("/me", handlers.GetCurrentUser)
	protected.GET("/users", handlers.GetUsers)
	protected.POST("/users", handlers.CreateUser)
	protected.DELETE("/users/:id", handlers.DeleteUser)

	public.GET("/news", handlers.GetNews)
	public.GET("/news/:id", handlers.GetNewsByID)
	protected.POST("/news", handlers.CreateNews)
	protected.PUT("/news/:id", handlers.UpdateNews)
	protected.DELETE("/news/:id", handlers.DeleteNews)

	public.GET("/blog", handlers.GetBlogs)
	public.GET("/blog/:id", handlers.GetBlogByID)
	protected.POST("/blog", handlers.CreateBlog)
	protected.PUT("/blog/:id", handlers.UpdateBlog)
	protected.DELETE("/blog/:id", handlers.DeleteBlog)

	e.Logger.Fatal(e.Start(":8080"))
}
