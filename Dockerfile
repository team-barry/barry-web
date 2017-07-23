FROM node:8.2.1

ENV APP_ROOT /barry/web

RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

ADD package.json ${APP_ROOT}/package.json
ADD yarn.lock ${APP_ROOT}/yarn.lock
RUN yarn install

ADD . $APP_ROOT

RUN yarn build
