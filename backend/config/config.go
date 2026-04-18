package config

import (
	"os"

	"github.com/joho/godotenv"
)

// Config holds all configuration for the application.
type Config struct {
	Port                  string
	JWTSecret             string
	DBPath                string
	OCRServiceURL         string
	HandwritingServiceURL string
	FrontendURL           string
}

// Load reads configuration from environment variables (with .env fallback).
func Load() *Config {
	// Load .env file if it exists (ignore error if missing)
	_ = godotenv.Load()

	return &Config{
		Port:                  getEnv("PORT", "8080"),
		JWTSecret:             getEnv("JWT_SECRET", "paperly-super-secret-key-change-me"),
		DBPath:                getEnv("DB_PATH", "paperly.db"),
		OCRServiceURL:         getEnv("OCR_SERVICE_URL", "http://localhost:5001"),
		HandwritingServiceURL: getEnv("HANDWRITING_SERVICE_URL", "http://localhost:5002"),
		FrontendURL:           getEnv("FRONTEND_URL", "http://localhost:3000"),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
