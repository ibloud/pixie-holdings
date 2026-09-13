FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY public ./public
COPY src ./src
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
