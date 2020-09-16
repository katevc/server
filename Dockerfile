  
# Specify a base image
FROM alpine:3.10

# ENV NODE_VERSION 14.10.0
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm instal
COPY . .

EXPOSE 8080

# Default command
CMD ["npm", "run", "start"]