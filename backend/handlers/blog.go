package handlers

import (
	"net/http"
	"time"

	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/models"

	"github.com/labstack/echo/v4"
)

func GetBlogs(c echo.Context) error {
	var blogs []models.Blog
	db.DB.Find(&blogs)
	return c.JSON(http.StatusOK, blogs)
}

func CreateBlog(c echo.Context) error {
	blog := new(models.Blog)
	if err := c.Bind(blog); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	blog.PublishedAt = time.Now()
	blog.UpdatedAt = time.Now()
	db.DB.Create(&blog)
	return c.JSON(http.StatusCreated, blog)
}

func GetBlogByID(c echo.Context) error {
	id := c.Param("id")
	var blog models.Blog
	if err := db.DB.First(&blog, id).Error; err != nil {
		return c.JSON(404, map[string]string{"error": "Blog not found"})
	}
	return c.JSON(200, blog)
}
