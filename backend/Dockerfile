# ビルド用
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server main.go
RUN go build -o create_user cmd/create_password/main.go

# 実行用
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/server .
COPY --from=builder /app/create_user .
EXPOSE 8080
CMD ["./server"]
