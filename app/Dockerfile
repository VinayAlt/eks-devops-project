# Stage 1: Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy application code
COPY . .

# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app .

# Expose app port
EXPOSE 3000

# Environment variable (optional but good practice)
ENV NODE_ENV=production

# Start application
CMD ["node", "app.js"]