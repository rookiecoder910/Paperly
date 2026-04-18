package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/rookiecoder910/paperly-backend/config"
	"github.com/rookiecoder910/paperly-backend/handlers"
	"github.com/rookiecoder910/paperly-backend/middleware"
	"github.com/rookiecoder910/paperly-backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Connect to database
	db, err := gorm.Open(sqlite.Open(cfg.DBPath), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}
	log.Println("✅ Database connected:", cfg.DBPath)

	// Auto-migrate models
	if err := db.AutoMigrate(&models.User{}, &models.Note{}); err != nil {
		log.Fatal("❌ Failed to migrate database:", err)
	}
	log.Println("✅ Database migrated")

	// Initialize Gin
	r := gin.Default()

	// Apply CORS middleware
	r.Use(middleware.CORSMiddleware(cfg.FrontendURL))

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(db, cfg)
	ocrHandler := handlers.NewOCRHandler(cfg)
	hwHandler := handlers.NewHandwritingHandler(cfg)

	// ─── Public Routes ────────────────────────────────────────────
	api := r.Group("/api")
	{
		api.GET("/health", handlers.HealthCheck)

		// Auth (no token required)
		auth := api.Group("/auth")
		{
			auth.POST("/signup", authHandler.Signup)
			auth.POST("/login", authHandler.Login)
		}
	}

	// ─── Protected Routes ─────────────────────────────────────────
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware(cfg.JWTSecret))
	{
		protected.GET("/auth/me", authHandler.Me)
		protected.POST("/ocr", ocrHandler.ExtractText)
		protected.POST("/generate", hwHandler.Generate)
	}

	// Start server
	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("🚀 Paperly API server starting on http://localhost%s", addr)
	log.Printf("   Frontend URL: %s", cfg.FrontendURL)
	log.Printf("   OCR Service:  %s", cfg.OCRServiceURL)
	log.Printf("   HW  Service:  %s", cfg.HandwritingServiceURL)

	if err := r.Run(addr); err != nil {
		log.Fatal("❌ Server failed to start:", err)
	}
}
