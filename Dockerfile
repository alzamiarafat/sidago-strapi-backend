FROM node:20.19.0-slim

WORKDIR /app

COPY package.json package-lock.json ./

COPY package.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps \
  && npm uninstall better-sqlite3 --no-audit --no-fund

COPY . .

RUN mkdir -p /app/public/uploads

RUN npm run build

EXPOSE 9012

CMD ["npm", "run", "start"]