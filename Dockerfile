FROM node:24-alpine

# 先用 root（默认）安装 pnpm
RUN corepack enable \
  && corepack prepare pnpm@latest --activate

# 再切到 node 用户
USER node
WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

# CMD ["pnpm", "start"]
