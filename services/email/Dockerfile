FROM node:latest AS base

RUN apt update && apt upgrade -y
RUN mkdir /app
RUN chown 1000:1000 /app -R
WORKDIR /app
USER node
RUN npm install kafkajs nodemailer express twig express-fileupload encryption-aes
RUN npm init -y
RUN npm pkg set name="email-microservice"
RUN npm pkg delete description
RUN npm pkg set type="module"
RUN npm pkg set main="server.js"
RUN npm pkg set scripts.start="node server.js"

FROM base AS development
RUN npm install nodemon
RUN npm pkg set scripts.dev="nodemon server.js"
CMD [ "npm","run","dev" ]

FROM base AS production

CMD [ "npm","run","start" ]