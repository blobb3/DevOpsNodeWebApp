FROM node:22.15.0

# Create app directory
WORKDIR /usr/src/app

# Copy app
COPY . .

# Install
RUN npm install

# Docker Run Command
EXPOSE 3000
CMD [ "node", "server.js" ]