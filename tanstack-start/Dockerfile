# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # this builds with Nitro under the hood (via Vite+Nitro plugin)

# 2. Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
# Nitro output lives in .output
COPY --from=builder /app/.output ./.output

# EXPOSE 3000   # or whichever port Nitro will listen on
CMD ["node", ".output/server/index.mjs"]
