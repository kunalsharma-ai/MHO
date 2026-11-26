FROM node:alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

FROM base AS development

RUN npm install
COPY . .

EXPOSE 3000

# USER node

CMD ["npm", "run", "dev"]

FROM base AS builder

RUN npm install

COPY . .

# public/ is gitignored at the repo root, so a clean checkout has none and the production COPY below failed.
RUN mkdir -p public
RUN npm run build
# RUN npm ci --omit=dev

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD ["npm", "start"]