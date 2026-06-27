# Stage 1 — build the app into static files
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install (cache layer)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — minimal runtime for serving built dist
FROM node:20-alpine

WORKDIR /app

# Install vite globally for preview server
RUN npm install -g vite@5 && npm cache clean --force

# Copy only built dist from builder stage
COPY --from=build /app/dist ./dist

# Copy config for preview
COPY vite.preview.config.js ./vite.config.js

# Create non-root user
RUN adduser -D -u 10001 appuser
USER appuser

EXPOSE 4173

CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
