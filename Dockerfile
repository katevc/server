  
# Specify a base image
FROM alpine:3.10

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install 
COPY . .

EXPOSE 8080

# Default command
CMD ["npm", "run", "start"]