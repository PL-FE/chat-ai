FROM node:20
COPY ./ /app
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm install && pm2 start app.js
