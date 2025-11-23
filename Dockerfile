# ============================================
# Stage 1: Build the application
# ============================================
FROM node:20-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency manifests first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js (standalone output configured in next.config.mjs)
RUN pnpm build

# ============================================
# Stage 2: Runtime image
# ============================================
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

WORKDIR /app

# Required for the healthcheck
RUN apk add --no-cache curl

# Copy the standalone server and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/ || exit 1

CMD ["node", "server.js"]
