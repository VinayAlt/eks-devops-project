# Stage 1: Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy all app files (app.js, login.html, signup.html)
COPY . .

# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

# Copy from builder stage
COPY --from=builder /app .

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "app.js"]