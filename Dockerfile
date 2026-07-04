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

# Expose port 8080 by default (can be overridden by environment variable)
EXPOSE 8080

# Serve the build folder on the dynamic port defined by Google Cloud Run ($PORT)
CMD ["sh", "-c", "npx serve -s dist -l ${PORT:-8080}"]
