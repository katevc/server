# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
#FROM node:14 AS buildserver
FROM node:14.8.0-alpine

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# RUN npm run start
CMD [ "node", "src/index.js" ]