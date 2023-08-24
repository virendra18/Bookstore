package routes

import(
	"github.com/gorilla/mux"
	"github.com/virendra18/go-bookstore/pkg/controllers"
)

var RegisterBookStoreRoutes=func(router *mux.Router){
	router.HandleFunc("/book/",controllers.CreateBook).Methods("POST")
	router.HandleFunc("/book/",controllers.GetBook).Methods("GET")
	router.HandleFunc("/book/{bookId}",controllers.GetBookById).Methods("GET")
	router.HandleFunc("/book/category/{bookCategory}",controllers.GetBookByCategory).Methods("GET")
	// router.HandleFunc("/feautredbook/featured",controllers.GetBookByCategory).Methods("GET")
	router.HandleFunc("/featuredbook",controllers.GetFeaturedBooks).Methods("GET")
	router.HandleFunc("/searchbook/{bookName}",controllers.GetSearchedBook).Methods("GET")
	router.HandleFunc("/updatebook/{bookId}",controllers.UpdateBook).Methods("PUT")
	router.HandleFunc("/deletebook/{bookId}",controllers.DeleteBook).Methods("DELETE")
}