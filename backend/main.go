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

	// CORSミドルウェア
	e.Use(middleware.CORS())
	// ログミドルウェア
	e.Use(middleware.Logger())
	// リカバリミドルウェア
	e.Use(middleware.Recover())

	// 認証が不要なルート（パブリックAPI）
	public := e.Group("/api")

	// ログインのみ認証不要
	public.POST("/login", handlers.Login)

	// 認証が必要なルート（プロテクトされたAPI）
	protected := e.Group("/api")
	protected.Use(authmiddleware.JWTMiddleware())

	// 現在のユーザー情報
	protected.GET("/users", handlers.GetCurrentUser)

	protected.POST("/register", handlers.Register)

	// ニュース関連のAPI（すべて認証が必要）
	protected.GET("/news", handlers.GetNews)
	protected.POST("/news", handlers.CreateNews)
	protected.GET("/news/:id", handlers.GetNewsByID)
	protected.PUT("/news/:id", handlers.UpdateNews)
	protected.DELETE("/news/:id", handlers.DeleteNews)

	// ブログ関連のAPI（すべて認証が必要）
	protected.GET("/blog", handlers.GetBlogs)
	protected.POST("/blog", handlers.CreateBlog)
	protected.GET("/blog/:id", handlers.GetBlogByID)
	protected.PUT("/blog/:id", handlers.UpdateBlog)
	protected.DELETE("/blog/:id", handlers.DeleteBlog)

	e.Logger.Fatal(e.Start(":8080"))
}
