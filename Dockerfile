# ─── Stage 1: Install Dependencies ───────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm install --frozen-lockfile || npm install

# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client before building
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ─── Stage 3: Production Runner ───────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create and permission the .next cache dir
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema for runtime schema push
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Need npx at runtime for prisma db push — install prisma in runner too
RUN npm install prisma --no-save

# Copy and permission the entrypoint
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

USER nextjs

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
