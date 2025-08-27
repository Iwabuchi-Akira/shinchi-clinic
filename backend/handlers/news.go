package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/models"
)

func GetNews(c echo.Context) error {
	var news []models.News
	db.DB.Find(&news)
	return c.JSON(http.StatusOK, news)
}

func CreateNews(c echo.Context) error {
	news := new(models.News)
	if err := c.Bind(news); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	news.PublishedAt = time.Now()
	news.UpdatedAt = time.Now()
	db.DB.Create(&news)
	return c.JSON(http.StatusCreated, news)
}

func GetNewsByID(c echo.Context) error {
	id := c.Param("id")
	var news models.News
	if err := db.DB.First(&news, id).Error; err != nil {
		return c.JSON(404, map[string]string{"error": "News not found"})
	}
	return c.JSON(200, news)
}

func UpdateNews(c echo.Context) error {
	id := c.Param("id")
	var news models.News
	if err := db.DB.First(&news, id).Error; err != nil {
		return c.JSON(404, map[string]string{"error": "News not found"})
	}

	if err := c.Bind(&news); err != nil {
		return c.JSON(400, map[string]string{"error": err.Error()})
	}

	news.UpdatedAt = time.Now()
	db.DB.Save(&news)
	return c.JSON(200, news)
}

func DeleteNews(c echo.Context) error {
	id := c.Param("id")
	if err := db.DB.Delete(&models.News{}, id).Error; err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	return c.JSON(204, nil)
}


