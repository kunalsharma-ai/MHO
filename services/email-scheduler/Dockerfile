FROM node:24-alpine AS base

WORKDIR /app

ENV port=3000
ENV mongodb=mongodb://db/email-scheduler

RUN npm i encryption-aes express express-fileupload mongoose nodemailer optiwari.india-http-error twig

RUN npm init -y
RUN npm pkg set name=email-scheduler
RUN npm pkg set type=module
RUN npm pkg set main=server.js
RUN npm pkg set scripts.start="node server.js"

FROM base AS development

ENV mode=dev

RUN npm install nodemon
RUN npm pkg set scripts.dev="nodemon server.js"

CMD [ "npm","run","dev" ]

FROM base AS production

ENV mode=prod

CMD [ "npm","run","start" ]