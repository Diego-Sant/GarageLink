# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

# Copy the rest of the application files
COPY ./src ./src
COPY ./public ./public

# Expose the development server port
EXPOSE 3001

# Start the app in development mode
CMD ["npm", "start"]