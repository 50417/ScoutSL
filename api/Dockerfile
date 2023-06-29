# from base image node
FROM node:16-alpine

#create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json ./


RUN npm install --silent
# if buildinc code for production 
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 4001

#command executable and version
CMD ["npm","start"]