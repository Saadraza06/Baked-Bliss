# Use a clean, lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install project dependencies
RUN npm install

# Copy all project source code
COPY . .

# Build the React + Vite application
RUN npm run build

# Install a simple, lightweight static file server globally
RUN npm install -g serve

# Expose port 80 to access the container
EXPOSE 80

# Serve the build folder on port 80 with single-page application routing support (-s)
CMD ["serve", "-s", "dist", "-l", "80"]
