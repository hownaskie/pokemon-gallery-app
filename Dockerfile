FROM node:20-alpine AS builder

# Update package lists and upgrade packages to fix vulnerabilities
# Install libc6-compat to ensure compatibility with certain npm packages
# Upgrade npm to the latest version
RUN apk update && apk upgrade --no-cache libc6-compat && npm install -g npm@latest

# Set the working directory
WORKDIR /builder

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies as per lock file without making updates
RUN npm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runner stage starts from the nginx:alpine image
FROM nginx:alpine AS runner

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built artifacts from the builder stage
COPY --from=builder /builder/dist /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Inform docker that the container listens on port 80
EXPOSE 80

# Define the command to run the app
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]