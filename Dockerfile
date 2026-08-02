FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.29-alpine AS runtime

ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/config.json.template /etc/nginx/templates/config.json.template
COPY --chmod=755 docker/15-config-defaults.envsh /docker-entrypoint.d/15-config-defaults.envsh
COPY --from=build /app/dist/ng-monolithic-starter/browser /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
