FROM --platform=linux/amd64 node:21.1.0
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 8888
CMD ["node", "index.js"]