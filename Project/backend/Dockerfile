# MHO API. Build from this folder; app/ and utils/ sit side by side here, as the imports expect.
#
#   docker build --target development -t mho-api:dev  Project/backend
#   docker build --target production  -t mho-api:prod Project/backend   (production is also the default)
#
# Stages:
#   base         Node, the work folder and the package files
#   build        every dependency, the source, then only the production dependencies kept
#   development  every dependency plus nodemon; restarts on file changes (mount app/ and utils/ over /app)
#   production   a small image with the built folder from "build", run as the node user
#
# (The live stack currently runs the prebuilt registry.sampledge.com/turn2opinion/backend:1.0.1 image,
#  which does not include the changes in this folder.)

FROM node:22-alpine AS base
WORKDIR /app
ENV port=3000
COPY package.json package-lock.json* ./

FROM base AS build
RUN npm ci || npm install
COPY app ./app
COPY utils ./utils
# app/utils is a link to ../utils. Docker copies it as it is; rebuild it in case a checkout made it a plain file.
RUN rm -rf app/utils && ln -s ../utils app/utils
# The test suite needs MongoDB, so it is not run here. Keep only what production needs.
RUN npm prune --omit=dev

FROM base AS development
ENV NODE_ENV=development
RUN (npm ci || npm install) && npm install -g nodemon
COPY app ./app
COPY utils ./utils
RUN rm -rf app/utils && ln -s ../utils app/utils
EXPOSE 3000
CMD ["nodemon", "app/server.js"]

FROM node:22-alpine AS production
WORKDIR /app
# The API writes log files into its work folder, so the node user must own it.
RUN chown node:node /app
ENV NODE_ENV=production
ENV port=3000
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3000
CMD ["node", "app/server.js"]
