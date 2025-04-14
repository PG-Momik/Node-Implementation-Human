# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g typescript

COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./

RUN npm install

COPY src ./src
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.js"]