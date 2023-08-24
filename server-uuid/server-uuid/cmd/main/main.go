package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/rs/cors"
	"github.com/virendra18/go-bookstore/pkg/routes"
)

func main() {
	r := mux.NewRouter()
	routes.RegisterBookStoreRoutes(r)
	http.Handle("/", r)

	c := cors.New(cors.Options{
		// AllowedOrigins: []string{"http://127.0.0.1:5500", "http://127.0.0.1:5501","http://127.0.0.2:5500", "http://127.0.0.2:5501", "http://127.0.0.2", "http://127.0.0.1:5173/", "http://127.0.0.1:5173", "http://127.0.0.1:5174/"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	// handler := cors.Default().Handler(r)
	handler := c.Handler(r)

	log.Fatal(http.ListenAndServe("localhost:8080", handler))
}
