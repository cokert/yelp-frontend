FROM node as build

WORKDIR /src
COPY ./package.json /src/package.json
RUN npm install
COPY ./ /src
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /src/package.json /app/package.json
RUN npm install express
RUN npm install bent
COPY --from=build /src/src/server /app/src/server
COPY --from=build /src/dist /app/dist

ENTRYPOINT ["npm", "start"]