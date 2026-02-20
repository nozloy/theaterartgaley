# Use Google's Docker Hub mirror to avoid unauthenticated pull rate limits in CI/CD.
ARG NODE_IMAGE=public.ecr.aws/docker/library/node:20-bookworm-slim

# 1 - Builder
FROM ${NODE_IMAGE} AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 2 - Runner
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
