FROM node:16.15.1

WORKDIR /app

COPY package.json ./
COPY packages/client/package.json packages/client/
COPY packages/server/package.json packages/server/
COPY packages/shared/package.json packages/shared/

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]