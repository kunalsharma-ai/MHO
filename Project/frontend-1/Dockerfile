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