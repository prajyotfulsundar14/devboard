# Single-stage: build and run the Go binary from the same golang image.
# (No multi-stage yet — slimming the final image comes later in the course.)
#FROM golang:1.22-alpine as builder

#WORKDIR /app

# Download deps first for better layer caching.
#COPY go.mod go.sum ./
#RUN go mod download

# Build the binary.
#COPY . .
#RUN CGO_ENABLED=0 go build -o devboard-backend .



#FROM dhi.io/golang:1.22-alpine

#COPY --from=builder /app/devboard-backend/ /devboard-backend

# Run as a non-root user.
#RUN adduser -D -u 10001 app && chown -R app:app /app
#USER app

E#XPOSE 8080
#ENTRYPOINT ["./devboard-backend"]


# Multi-stage build: compile in golang, run from minimal base
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Download dependencies first for better layer caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source and build binary
COPY . .
RUN CGO_ENABLED=0 go build -o devboard-backend .

# Runtime stage: minimal image
FROM alpine:3.24

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/devboard-backend /app/devboard-backend

# Run as non-root user
RUN adduser -D -u 10001 app && chown -R app:app /app
USER app

EXPOSE 8080
ENTRYPOINT ["/app/devboard-backend"]
