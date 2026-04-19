FROM golang:1.22-alpine AS builder

WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and build
COPY . .
# Disable CGO for a static binary (works well with alpine/sqlite setup if using pure Go sqlite or CGO if required)
# Note: Since the backend uses gorm.io/driver/sqlite which requires CGO, we need CGO enabled
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev
RUN go build -o paperly-api .

# Final minimal Stage
FROM alpine:latest
RUN apk add --no-cache ca-certificates

WORKDIR /app
COPY --from=builder /app/paperly-api .

# We'll allow taking env variables rather than relying entirely on .env
EXPOSE 8080

CMD ["./paperly-api"]
