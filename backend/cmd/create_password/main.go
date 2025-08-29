package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	"shinchi-clinic-backend/db"
	"shinchi-clinic-backend/models"
)

func main() {
	// データベース接続を初期化
	db.Init()

	// データベースマイグレーション（必要な場合）
	err := db.DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// ユーザーIDの入力を求める
	fmt.Print("Username: ")
	reader := bufio.NewReader(os.Stdin)
	username, err := reader.ReadString('\n')
	if err != nil {
		log.Fatal("Failed to read input:", err)
	}

	// 改行文字を削除し、空白をトリム
	username = strings.TrimSpace(username)

	if username == "" {
		log.Fatal("Username cannot be empty")
	}

	// 既存のユーザーがいるかチェック
	var existingUser models.User
	result := db.DB.Where("username = ?", username).First(&existingUser)
	if result.Error == nil {
		fmt.Printf("User '%s' already exists. Do you want to update the password? (y/N): ", username)
		response, err := reader.ReadString('\n')
		if err != nil {
			log.Fatal("Failed to read input:", err)
		}
		response = strings.TrimSpace(strings.ToLower(response))
		if response != "y" && response != "yes" {
			fmt.Println("Operation cancelled.")
			return
		}
	}

	// 強力なパスワードを生成
	password, err := models.GenerateSecurePassword()
	if err != nil {
		log.Fatal("Failed to generate password:", err)
	}

	// ユーザーを作成または更新
	user := models.User{
		Username: username,
		Password: password, // BeforeCreate フックでハッシュ化される
	}

	if result.Error == nil {
		// 既存ユーザーのパスワードを更新
		err = user.HashPassword(password)
		if err != nil {
			log.Fatal("Failed to hash password:", err)
		}

		result = db.DB.Model(&existingUser).Update("password", user.Password)
		if result.Error != nil {
			log.Fatal("Failed to update user:", result.Error)
		}
		fmt.Printf("Password updated for user '%s'\n", username)
	} else {
		// 新しいユーザーを作成
		result = db.DB.Create(&user)
		if result.Error != nil {
			log.Fatal("Failed to create user:", result.Error)
		}
		fmt.Printf("User '%s' created successfully\n", username)
	}

	// 生成されたパスワードを表示
	fmt.Printf("Generated password: %s\n", password)
	fmt.Println("\n⚠️  IMPORTANT: Please save this password in a secure location!")
	fmt.Println("⚠️  This password will not be displayed again!")
}
