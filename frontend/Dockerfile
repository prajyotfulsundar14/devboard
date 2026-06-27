# Stage 1 — build the app into static files
FROM dhi.io/node:22-debian13-dev AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 1b — resolve the preview-server dependency in isolation (still has npm here)
WORKDIR /runtime
COPY vite.preview.config.js ./vite.config.js
RUN npm init -y && \
    npm install --omit=dev vite@5.4.11 && \
    npm cache clean --force && \
    find . -type f -name "*.md" -delete

# Stage 2 — minimal runtime, no shell, no package manager
FROM dhi.io/node:22-debian13
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /runtime ./

EXPOSE 4173

# Exec form for proper signal handling
ENTRYPOINT ["node", "--no-warnings", "./node_modules/.bin/vite"]
CMD ["preview", "--host", "0.0.0.0", "--port", "4173"]