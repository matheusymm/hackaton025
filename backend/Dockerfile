# ---- Base Stage ----
# Use a specific Node.js version for reproducibility.
# The 'alpine' variant is lightweight, which is great for production.
FROM node:20-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# ---- Dependencies Stage ----
# This stage installs all dependencies, including devDependencies needed for building.
FROM base AS dependencies

# Install dependencies using 'npm ci' for faster, more reliable builds
RUN npm ci

# ---- Builder Stage ----
# This stage builds the TypeScript code into JavaScript.
FROM dependencies AS builder

# Copy the rest of the source code
COPY . .

# Generate the Prisma Client based on your schema
# This is crucial for your application to interact with the database.
RUN npx prisma generate --schema=/app/src/infra/prisma/schema.prisma

# Build the TypeScript project
# This assumes you have a "build" script in your package.json (e.g., "build": "tsc")
RUN npm run build

# ---- Production Stage ----
# This is the final, lean image that will be deployed.
FROM base AS production

# Set the environment to production
ENV NODE_ENV=production

# Install ONLY production dependencies
RUN npm ci --only=production

# Copy the built application code and Prisma artifacts from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infra/prisma ./prisma
# Copy the generated Prisma client from the builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port the app runs on (change 3000 if your app uses a different port)
EXPOSE 3000

# The command to run the application
CMD ["node", "dist/index.js"]