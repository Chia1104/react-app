ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS builder

ARG VITE_ENV_EXAMPLE \
    TURBO_TEAM \
    TURBO_TOKEN

ENV VITE_ENV_EXAMPLE=${VITE_ENV_EXAMPLE} \
    TURBO_TEAM=${TURBO_TEAM} \
    TURBO_TOKEN=${TURBO_TOKEN} \
    PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat && \
    corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-cache,target=/pnpm/store pnpm install --prefer-offline

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY /docker/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=builder /app/dist /usr/share/nginx/html

ENV PORT=8080 \
    HOST=0.0.0.0

EXPOSE 8080

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
