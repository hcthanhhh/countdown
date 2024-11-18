FROM node:20.16-bullseye-slim

RUN mkdir -p /tmp
COPY package.json /tmp/
COPY pnpm-lock.yaml /tmp/
RUN npm install -g pnpm

RUN cd /tmp && pnpm install --frozen-lockfile

WORKDIR /opt/app
RUN cp -r /tmp/node_modules .

COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "start"]