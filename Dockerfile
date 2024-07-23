FROM node:16-alpine

ENV NODE_ENV=production

RUN npm install -g nodemon

RUN npm install -g concurrently

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:reload"]
