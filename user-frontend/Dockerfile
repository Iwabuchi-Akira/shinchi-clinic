# ビルド用
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV USE_DUMMY_API=false
# ビルド前にダミーAPIファイルを削除
RUN if [ "$USE_DUMMY_API" != "true" ]; then \
      echo "Removing dummy API files for production build..."; \
      rm -rf src/app/api/blog; \
      rm -rf src/app/api/news; \
      echo "Dummy API files removed."; \
    else \
      echo "Keeping dummy API files for development..."; \
    fi
RUN npm run build

# 実行用
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./

ENV USE_DUMMY_API=false

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
