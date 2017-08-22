FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Set environment variable
ENV CONNECTION_URL "rabbit"

# Install app dependencies
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
