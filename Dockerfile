FROM node:8.2.1

ENV APP_ROOT /barry/web
ENV API_SERVER http://localhost:8000/v1

WORKDIR $APP_ROOT

RUN yarn global add serve

COPY package.json $APP_ROOT/package.json
COPY yarn.lock $APP_ROOT/yarn.lock
RUN yarn install

COPY . $APP_ROOT

CMD \
  REACT_APP_SERVER=${API_SERVER} yarn build && \
  serve -s build -p 5000
