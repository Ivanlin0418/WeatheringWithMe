FROM node:12

WORKDIR /app


COPY package*.json ./


RUN npm install 

RUN npm install reactstrap

COPY . .

ENV Port = 9090

EXPOSE 9090

CMD ["npm", "start"]