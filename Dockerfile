# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:14
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install
RUN npm install react-scripts -g
 
# Copies everything over to Docker environment
COPY . .

# RUN npm run start
CMD [ "node", "src/index.js" ]

# Production Environment
FROM bitnami/nginx
#COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/build /app