FROM node:24-alpine AS base

WORKDIR /frfs

COPY package.json .
RUN env
RUN npm install

FROM node:24-alpine AS development

WORKDIR /frfs

COPY package.json .
RUN env
RUN npm install -g vite@latest
RUN npm install

EXPOSE 3000
CMD [ "npm","run","dev" ]

FROM base AS builder
COPY . .
RUN npm run build


FROM nginx:alpine AS production

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frfs/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]