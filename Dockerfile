FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Конфигурация — /app/config.json, шаблоны — /app/templates/*.hbs
# (если не подложены, берутся *.hbs.example)
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY config.default.json ./
COPY templates ./templates
RUN for f in templates/*.example; do [ -f "${f%.example}" ] || cp "$f" "${f%.example}"; done
COPY --from=build /app/dist ./dist
USER node
EXPOSE 8001
CMD ["node", "dist/src/index.js"]
