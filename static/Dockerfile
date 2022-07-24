FROM arm64v8/node:12

ADD ./package.json /srv/package.json

WORKDIR /srv

RUN npm install

EXPOSE 8080
CMD ["./node_modules/.bin/webpack", "--progress", "-p"]
