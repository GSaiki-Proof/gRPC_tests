FROM node:17
WORKDIR /app

ENV TZ='America/Sao_Paulo'
RUN date

COPY . ./
RUN chown -R node:node /app
RUN yarn install

CMD yarn run build