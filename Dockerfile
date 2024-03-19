# Use node image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (if needed)
# RUN npm run build

# Expose port if needed
EXPOSE 5173

CMD ["npm", "run", "dev"]
