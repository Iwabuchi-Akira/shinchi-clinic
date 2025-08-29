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

ENV USE_DUMMY_API=false

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
