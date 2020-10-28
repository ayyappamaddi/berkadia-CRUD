FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm i --production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
