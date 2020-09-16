  
# Specify a base image
FROM 14.10-alpine3.12 AS alpine

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install 
COPY . .

EXPOSE 8080

# Default command
CMD ["npm", "run", "start"]