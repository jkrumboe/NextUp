FROM node:20-alpine AS base
RUN npm install -g pnpm@8.15.0

FROM base AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/backend ./apps/backend
RUN pnpm install --frozen-lockfile
RUN cd apps/backend && pnpm run build
RUN cd apps/backend && npx prisma generate

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/node_modules ./node_modules
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/main"]
