# Backend SGM GeoCrawler

O Crawler de geocodificação é um sistema capaz de receber endereços de logradouros e geocodificá-los. A geocodificação é feita através de APIs disponíveis na internet, como Google Maps e Open Street Maps, por exemplo. Após a geocodificação ser concluída, os dados geocodificados são armazenados em uma base de dados.

Atualmente o projeto utiliza seis APIs:

-   Google Maps
-   Nominatim
-   MapBox
-   TomTom
-   Here
-   Open Route Service

A aplicação segue o modelo de arquitetura desenvolvido pelo Dr. Tiago Senna, que foi baseado nos conceitos de _Clean Architecture_. [Clique aqui](https://whimsical.com/EYVdcCWXbQ8d2nHKz84ihE) para acessar a arquitetura do TerraLab.

<hr>

## Índice

-   [Começando](#começado)
    -   [Pré-requisitos](#pré-requisitos)
    -   [Instalação](#instalação)
    -   [Imagem Docker](#imagem-docker)
-   [Executando Testes](#executando-testes)
-   [Realizando deploy](#realizando-deploy)
    -   [Pipeline](#pipeline)
    -   [Docker Registry](#docker-registry)

<hr/>

## Começado

Este documento irá mostrar como instalar e executar a aplicação, além de como rodar os testes de cobertura.

### Pré-requisitos

Para rodar a aplicação, é necessário ter o **Node** na versão 16.4.0, o **npm** e o banco de dados **PostgreSQL** na versão 14.1 instalados na máquina.

Para desenvolvimento local, é necessário ter o **nodemon** instalado globalmente. Para instalá-lo globalmente em sua máquina, execute o comando:

    npm install -g nodemon

Outra ferramenta que pode ser utilizada para rodar a aplicação é a biblioteca **pm2**. Para instalar em sua máquina, execute o comando:

    npm install -g pm2

A biblioteca pm2 é utilizada no ambiente de produção ou para rotinas de execução que utilizam um período de tempo muito longo (acima de um dia), pois a ferramenta mantém a aplicação em execução “para sempre”. Então caso a aplicação caia, o pm2 irá reiniciá-la. Além disso, com o pm2 é possível guardar os logs em arquivos. Assim fica mais fácil identificar erros e comportamentos inesperados.

### Instalação

Para modificar o código, devemos acessar o repositório do projeto e cloná-lo na máquina local. Para isto basta executar o comando:

    git clone <link-do-repositório>

Após a clonagem, temos que acessar o diretório do projeto e criar um arquivo chamado **.env** e um outro chamado **.env.test**, a partir do arquivo **.env.example**.

Estes arquivos serão responsáveis por guardar as variáveis de ambiente que a aplicação precisa para funcionar de forma correta. No arquivo **.env.test** ficam as variáveis de ambiente relacionadas aos testes. **Não utilize o mesmo banco para testes e produção!**

No arquivo **.env**, o desenvolvedor deve obrigatoriamente inserir as informações de acesso ao banco de dados, e uma chave de criptografia. Dependendo da versão do Crawler, o desenvolvedor também deve inserir as chaves de acesso aos serviços de geocodificação.

Após configurar todas as variáveis de ambiente, podemos prosseguir com a instalação da aplicação.

Para instalar as bibliotecas e rodar a aplicação na máquina precisamos executar os seguintes comandos:

    npm install
    npx prisma generate --schema=./src/infra/db/techs/prisma/config/schema.prisma
    npm run build
    npm start

-   **Atenção:** o prisma é um ORM, utilizado para abstrair os comandos SQL para algo mais semelhante à orientação a objetos. Caso seja feita alguma alteração no banco de dados, você pode atualizar o seu `prisma.schema` executando o comando:

        npx prisma db pull --schema=./src/infra/db/techs/prisma/config/schema.prisma

E para criar as tabelas em um banco de dados novo, você deve primeiramente criar um novo banco de dados no PostgreSQL, adicionar as credenciais de acesso nos arquivos `.env` e depois executar o comando:

    npx prisma migrate dev --name init --schema=./src/infra/db/techs/prisma/config/schema.prisma

Outra forma de rodar a aplicação é através do pm2. Para iniciar a aplicação pelo pm2, basta executar o comando:

    pm2 start npm --name "SGM" -o ./public/logs/sgm-out.log -e ./public/logs/sgm-error.log -- start && pm2 logs "SGM"

Os logs ficarão guardados na pasta `public/logs`. Existem dois tipos de logs: a saída padrão e os logs de erro. Eles ficam em arquivos separados.

A outra forma de rodar a aplicação, que é mais adequada para o ambiente de desenvolvimento, é através do comando:

    npm run dev

A biblioteca responsável pela execução é o **nodemon**. O nodemon recompila e reinicia a aplicação caso seja salva alguma alteração no código.

-   Caso não seja configurada uma porta para o servidor, por padrão será utilizada a porta 3333.

        http://localhost:3333/

### Imagem Docker

O docker é um ambiente de desenvolvimento que permite a criação de imagens que podem ser utilizadas para criar containers. Para criar uma imagem, basta executar o comando:

    	docker build -t <nome-da-imagem> .

Para rodar a aplicação, basta executar o comando:

    	docker run <nome-da-imagem>

-   Certifique-se de que o seu container consegue acessar o seu banco de dados!

<hr>

## Executando testes

Os testes foram desenvolvidos utilizando a ferramenta **Jest**.

Para rodar todos os testes automatizados localmente:

    npm run test

Para rodar somente os testes unitários:

    npm run test:unit

Para rodar somente os testes de integração/funcionais:

    npm run test:functional

E para rodar todos os testes gerando um relatório de cobertura de testes:

    npm run test:coverage

Ao realizar o push em uma branch que está preparada para um _merge request_, os testes automatizados serão executados automaticamente pelo sistema de CI/CD.

<hr>

## Realizando deploy

### Pipeline

O deploy é feito de forma automatizada pelo sistema de CI/CD do GitLab.

Os estágios do pipeline são:

-   **Build**: compila o código e gera um arquivo de testes automatizados.
-   **Test**: executa os testes automatizados.
-   **Deploy**: envia o projeto para o servidor.

O deploy é feito primeiramente no ambiente de Staging (release) e depois, caso as funcionalidades estiverem funcionando corretamente, no ambiente de produção (master).

### Docker Registry

Após passar nos estágios de build e de teste, o projeto é enviado para o servidor. Na etapa de deploy, primeiramente é feito o build da imagem docker da aplicação. Após o build, a imagem é registrada em um registro de container privado do TerraLab.

    docker build -t <nome-da-imagem> .
    docker login -u <usuario> -p <senha>
    docker push <nome-da-imagem>

O deploy no servidor acontece ao fazer o pull desta imagem.

    docker pull <nome-da-imagem>
    docker-compose build crawler
    docker-compose up -d
