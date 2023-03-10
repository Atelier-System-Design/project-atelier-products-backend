FROM node:16
WORKDIR /project-atelier-products-backend
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]