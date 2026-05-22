FROM node:18-bullseye-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY jest.config.js ./
COPY eslint.config.cjs ./
COPY .prettierrc ./.prettierrc
COPY .prettierignore ./.prettierignore
COPY src ./src

RUN npm run build

FROM node:18-bullseye-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]