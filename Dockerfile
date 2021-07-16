FROM node:14-alpine3.14
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production --silent
COPY . .
RUN npm run build
CMD ["npm", "start"]
