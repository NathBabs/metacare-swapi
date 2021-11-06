FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/

RUN npm set unsafe-perm true

RUN npm install

# Bundle app source
COPY . /usr/src/app/

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]