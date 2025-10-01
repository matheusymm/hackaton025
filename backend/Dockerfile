# ---- Base Stage ----
# Use a specific Node.js version for reproducibility.
# The 'alpine' variant is lightweight, which is great for production.
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS dependencies

RUN npm ci

FROM dependencies AS builder

COPY . .

RUN npx prisma generate --schema=/app/src/infra/prisma/schema.prisma

RUN npm run build

FROM base AS production

ENV NODE_ENV=production

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infra/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["node", "dist/index.js"]