# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app
COPY --from=builder /app/.output /app/.output
EXPOSE 3000
CMD ["node", "/app/.output/server/index.mjs"]
