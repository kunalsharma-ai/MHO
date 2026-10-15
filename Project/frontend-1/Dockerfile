# syntax=docker/dockerfile:1
# Multi-stage image for the MyHealthOpinions website.
#   docker build --target dev  -t mho-website:dev  .   hot-reload dev server on :5173
#   docker build --target prod -t mho-website:prod .   prerendered static site served by nginx on :80
ARG NODE_VERSION=22

# ---- shared: dependencies --------------------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS deps
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# ---- dev: Vite dev server (mount the source as a volume, see docker-compose.example.yml) -----
FROM deps AS dev
COPY . .
ENV DEV_HOST=0.0.0.0
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---- build: client bundle + server bundle + prerender → /app/dist ----------------------------
FROM deps AS build
COPY . .
# Build-time public settings (compiled into the JavaScript; never pass secrets here).
ARG VITE_SITE_URL=https://www.myhealthopinions.com
ARG VITE_REGISTER_URL=/api/v1/user
ARG VITE_LOGIN_URL=/api/v1/user/login
ARG VITE_RESEND_URL=/api/v1/user/resend
ARG VITE_FORGOT_URL=/api/v1/forgot-password
ARG VITE_CATEGORY_URL=/api/v1/category
ARG VITE_ENQUIRY_URL=/api/enquiry
ARG VITE_REVIEWS_URL=/api/reviews
ARG VITE_REWARD_FEED_URL=
ARG VITE_GA4_ID=
ARG VITE_MIN_AGE=18
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_REGISTER_URL=$VITE_REGISTER_URL \
    VITE_LOGIN_URL=$VITE_LOGIN_URL \
    VITE_RESEND_URL=$VITE_RESEND_URL \
    VITE_FORGOT_URL=$VITE_FORGOT_URL \
    VITE_CATEGORY_URL=$VITE_CATEGORY_URL \
    VITE_ENQUIRY_URL=$VITE_ENQUIRY_URL \
    VITE_REVIEWS_URL=$VITE_REVIEWS_URL \
    VITE_REWARD_FEED_URL=$VITE_REWARD_FEED_URL \
    VITE_GA4_ID=$VITE_GA4_ID \
    VITE_MIN_AGE=$VITE_MIN_AGE
RUN npm run build

# ---- prod: static files behind nginx ---------------------------------------------------------
FROM nginx:1.27-alpine AS prod
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
