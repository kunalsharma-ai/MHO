# Builds the MHO API from this repo in the layout its imports expect: /src/app + /src/utils.
# Build from the Project folder:  docker build -f backend/Dockerfile -t mho-api .
# (The live stack currently runs the prebuilt registry.sampledge.com/turn2opinion/backend:1.0.1 image,
#  which does not include the changes in this folder.)
FROM node:22-alpine
WORKDIR /src
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY backend/app ./app
COPY utils ./utils
# controller/Profile.js and new-module import "../utils" from inside app/
RUN ln -s ../utils /src/app/utils
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "app/server.js"]
