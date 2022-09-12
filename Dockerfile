FROM node:16.14.0

VOLUME /home/volumes/pm2/logs /app/public/logs
  
WORKDIR /app
COPY . /app

# Instalar dependencias, fazer o build, remover dependencias de desenvolvimento
RUN npm install && npm install -g pm2 
RUN npm run build && npm prune --production

# gerar arquivo de configuração do prisma
RUN npx prisma generate --schema=./src/infra/db/techs/prisma/config/schema.prisma

# Remover src e tests, e criar pasta de logs
RUN rm -rf src/ tests/ && mkdir -p public/logs

EXPOSE 3333

# Criar dir de logs
RUN mkdir -p public/logs

# Rodar a aplicacao utilizando o pm2
CMD pm2 start npm --name "SGM" --time -o "./public/logs/sgm-out.log" -e "./public/logs/sgm-error.log" -- start && pm2 logs "SGM"
