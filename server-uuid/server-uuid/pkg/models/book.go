package models

import (
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/virendra18/go-bookstore/pkg/config"
)

var db *gorm.DB

type Book struct {
	gorm.Model

	Name          string `gorm:"" json:"name"`
	Author        string `json:"author"`
	Publication   string `json:"publication"`
	Description   string `gorm:"type:TEXT" json:"description"`
	Category      string `json:"category"`
	UploadedImage string `json:"uploadedimage"`
	FeaturedBook  bool   `json:"featured"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Book{})
}

func (b *Book) CreateBook() *Book {
	db.NewRecord(b)
	db.Create(&b)
	return b
}

func GetAllBooks() []Book {
	var Books []Book
	db.Find(&Books)
	return Books
}

func GetBookById(Id int64) (*Book, *gorm.DB) {
	var getBook Book
	db := db.Where("ID = ?", Id).Find(&getBook)
	return &getBook, db
}

// func GetBookByCategory(Category string) (*Book, *gorm.DB) {
// 	var getBook Book
// 	db := db.Where("category = ?", Category).Find(&getBook)
// 	return &getBook, db
// }

func GetBookByCategory(Category string) ([]Book, *gorm.DB) {
	var getBook []Book
	db := db.Where("category = ?", Category).Find(&getBook)
	// return getBook, db
	return getBook, db

}
func GetSearchedBook(Name string) ([]Book, *gorm.DB) {
	var getBook []Book

	searchQuery := strings.Title(Name)

	db := db.Where("name = ?", searchQuery).Find(&getBook)
	// db := db.Where("name = ?", searchQuery).First(&getBook)

	// return getBook, db
	return getBook, db

}
func GetFeaturedBooks() ([]Book, *gorm.DB) {
	var getBook []Book
	db := db.Where("featured_book = ?", 1).Find(&getBook)
	// return getBook, db
	return getBook, db

}

func DeleteBook(ID int64) Book {
	var book Book
	db.Where("ID = ?", ID).Delete(book)
	return book
}
