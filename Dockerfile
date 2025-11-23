# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:20-alpine AS deps

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build the application
# ============================================
FROM node:20-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Prune to production dependencies only (saves space in runner)
RUN pnpm prune --prod

# ============================================
# Stage 3: Runtime image
# ============================================
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOST=0.0.0.0
ENV HOSTNAME=0.0.0.0

WORKDIR /app

# Tools for healthcheck
RUN apk add --no-cache curl

# App files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:${PORT}/ || exit 1

CMD ["node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
