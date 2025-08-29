package models

import (
	"crypto/rand"
	"math/big"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID       uint   `json:"id" gorm:"primarykey"`
	Username string `json:"username" gorm:"unique;not null"`
	Password string `json:"-" gorm:"not null"`
}

const (
	// パスワード生成用の文字セット
	uppercase   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	lowercase   = "abcdefghijklmnopqrstuvwxyz"
	digits      = "0123456789"
	symbols     = "!@#$%^&*_+-="
	passwordLen = 16
)

// 強力なパスワードを生成する
func GenerateSecurePassword() (string, error) {
	// 各文字セットから最低1文字は含めるようにする
	charset := uppercase + lowercase + digits + symbols
	password := make([]byte, passwordLen)

	// 各カテゴリから最低1文字を確保
	categories := []string{uppercase, lowercase, digits, symbols}
	for i, category := range categories {
		charIndex, err := rand.Int(rand.Reader, big.NewInt(int64(len(category))))
		if err != nil {
			return "", err
		}
		password[i] = category[charIndex.Int64()]
	}

	// 残りの文字をランダムに選択
	for i := 4; i < passwordLen; i++ {
		charIndex, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		password[i] = charset[charIndex.Int64()]
	}

	// Fisher-Yates shuffle でパスワードをシャッフル
	for i := passwordLen - 1; i > 0; i-- {
		j, err := rand.Int(rand.Reader, big.NewInt(int64(i+1)))
		if err != nil {
			return "", err
		}
		password[i], password[j.Int64()] = password[j.Int64()], password[i]
	}

	return string(password), nil
}

// パスワードをハッシュ化する
func (u *User) HashPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// パスワードを確認する
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// データベース保存前にパスワードをハッシュ化
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.Password != "" {
		return u.HashPassword(u.Password)
	}
	return nil
}
