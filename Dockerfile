# Stage 1: Build the Vue.js application
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build the application
# The command is taken from your "scripts" in package.json
RUN npm run build

# Stage 2: Serve the application with a lightweight web server
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]