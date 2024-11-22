FROM node:22.1-slim AS node
WORKDIR /work

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn,sharing=locked \
    yarn install

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=bind,source=index.html,target=index.html \
    --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
    --mount=type=bind,source=tsconfig.node.json,target=tsconfig.node.json \
    --mount=type=bind,source=vite.config.ts,target=vite.config.ts \
    --mount=type=bind,source=vite.config.ext.ts,target=vite.config.ext.ts \
    --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=TEMP.js,target=TEMP.js \
    --mount=type=cache,target=/root/.yarn,sharing=locked \
    yarn build && yarn build:ext

FROM nginx:1.27-alpine

# Quite the Nginx startup logs.
ENV  NGINX_ENTRYPOINT_QUIET_LOGS=true

# Default to Cloud Run port.
# Ref: https://cloud.google.com/run/docs/reference/container-contract#port
ENV PORT=8080

# Defaults Google Cloud Load Balancer header.
# Ref: https://cloud.google.com/load-balancing/docs/https#target-proxies
ENV REAL_IP_HEADER=X-Forwarded-For

# Default values.
ENV MARKETPLACE_API=
ENV AUTH_CLIENT_ID=
ENV AUTH_DOMAIN=
ENV AUTH_AUDIENCE=
ENV REPORT_URL=
ENV REEARTH_API=
ENV REEARTH_CLASSIC_WEB=
ENV CORS_ALLOWED_ORIGINS=
ENV REEARTH_VISUALIZER_WEB=

COPY --from=node /work/dist/ /usr/share/nginx/html
COPY --chown=nginx:nginx  docker/reearth_config.json.template /tmp/reearth_config.json.template
COPY --chown=nginx:nginx docker/nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY --chown=nginx:nginx docker/40-envsubst-on-reearth_config.sh /docker-entrypoint.d/
