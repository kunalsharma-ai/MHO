# Builds the MHO API from this folder. app/ and utils/ sit side by side here, as the imports expect, and
# app/utils is a link to ../utils for the files that import "../utils" from inside app/.
# Build from this folder:  docker build -t mho-api Project/backend
# (The live stack currently runs the prebuilt registry.sampledge.com/turn2opinion/backend:1.0.1 image,
#  which does not include the changes in this folder.)
FROM node:22-alpine
WORKDIR /src
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY app ./app
COPY utils ./utils
# Docker copies the app/utils link as it is; make sure it exists even if a checkout turned it into a plain file.
RUN rm -rf /src/app/utils && ln -s ../utils /src/app/utils
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "app/server.js"]
