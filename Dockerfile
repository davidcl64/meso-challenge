FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# Set required environment variables
ENV NODE_ENV production

# Install production modules
RUN npm install --production

# Copy app source code
COPY dist /usr/src/app/dist/
COPY public /usr/src/app/

# Nothing secret here now, but this needs to be abstracted out before
# anything is deployed
COPY .env /usr/src/app/.env

#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]