FROM node:18.16.1-slim AS node
WORKDIR /work
# RUN apt-get update && apt-get install -y python3 make gcc g++ \
#   && apt-get clean  \
#   && rm -rf /var/lib/apt/lists/*
COPY package.json yarn.lock ./
RUN yarn install
COPY . . 
RUN yarn build && yarn build:ext

FROM nginx:1.27-alpine
COPY --from=node /work/dist/ /opt/reearth-marketplace
COPY docker/reearth_config.json.tmpl /tmp/reearth_config.json.tmpl
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-envsubst-on-reearth_config.sh /docker-entrypoint.d/
