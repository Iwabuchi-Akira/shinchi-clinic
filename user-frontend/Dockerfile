# ビルド用
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 実行用
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./

ENV API_BASE_URL=http://backend:8080/api

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
