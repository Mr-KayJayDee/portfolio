# Stage 1: Build
FROM node:26.12.1-alpine AS builder
WORKDIR /app

# Install pnpm (corepack n'est plus fourni depuis Node 25)
RUN npm install -g pnpm@10

# Copy manifests first for layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDeps needed for build)
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Stage 2: Runtime
FROM node:26.12.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Nuxt SSR bundles all server deps into .output/server/
COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD ["node", "/app/.output/server/index.mjs"]
