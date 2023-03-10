FROM node:16-alpine

WORKDIR /WeShareUs-blog-API

COPY package*.json ./

RUN npm ci

ARG MYSQL_HOST
ARG MYSQL_USERNAME
ARG MYSQL_PASSWORD
ARG MYSQL_PORT
ARG JWT_SECRET_KEY
ARG KAKAO_REST_API_KEY

ENV MYSQL_HOST=$MYSQL_HOST \
    MYSQL_USERNAME=$MYSQL_USERNAME \
    MYSQL_PASSWORD=$MYSQL_PASSWORD \
    MYSQL_PORT=$MYSQL_PORT \
    JWT_SECRET_KEY=$JWT_SECRET_KEY \
    KAKAO_REST_API_KEY=$KAKAO_REST_API_KEY

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# 추후에 CD작업에서 secret 키로 환경변수를 넘겨서 build하면 된다.