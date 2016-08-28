FROM node:6.3.1

RUN mkdir -p /root/tinyUrl

WORKDIR /root/tinyUrl

ADD . /root/tinyUrl

RUN cd /root/tinyUrl

RUN npm install nodemon -g

RUN npm install

EXPOSE 7777

CMD ["nodemon", "/root/tinyUrl/server.js"]