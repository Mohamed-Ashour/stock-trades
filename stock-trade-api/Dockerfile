FROM node:16-alpine

ENV NODE_ENV development
WORKDIR /code
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --quiet
COPY . .

CMD ["npm", "run", "start:dev"]