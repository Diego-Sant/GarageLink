# Desenvolvimento Back-end Avançado (Front-end com React)
  &nbsp;

## GarageLink

O objetivo deste projeto é desenvolver um site de compra e venda de carros que facilite a comunicação direta entre vendedores e compradores. Inspirado em plataformas como OLX e Webmotors, o site não realiza transações, mas permite a interação entre usuários em nível global.
    &nbsp;

---
## Projeto Front-end com React e TailwindCSS

Projeto feito com 9 rotas completamente funcionais.

As rotas utilizadas no projeto são: 

* Página de cadastro do usuário: `("/cadastrar")`
* Página de login do usuário: `("/entrar")`
* Menu principal: `("/")`
* Perfil do usuário: `("/perfil")`
* Atualizar perfil: `("/perfil/atualizar")`
* Criar anúncio de carro: `("/publicar")`
* Página individual do carro: `("/carros/:id")`
* Página de atualização de informações do carro: `("/atualizar/:id")`
* Página de listagem de carros: `("/carros?disponibilidade=&cidade=&precoMin=0&precoMax=10000000&ordem=")`
  &nbsp;

---
## Como inicializar

Primeiramente será necessário abrir o aplicativo `Docker Desktop`. Também será necessário parar outras imagens/conteineres pois além de ter um limite de espaço, a rota do localhost pode ser a mesma e acabar acontecendo um erro do aplicativo já estar aberto.

```
docker ps -a
```

```
docker stop (CONTAINER ID)
```

```
docker rm (CONTAINER ID)
```

Por ser um arquivo com `Docker File`, a instalação com `npm install` não é necessária. Ao em vez disso, será feito o build e o run com os comando do Docker.

```
docker build -t garagelink .
```

Após a instalação, será feita a inicialização do arquivo Docker.

```
docker run -d -p 3001:3000 --name conteinergaragelink garagelink
```

Desse jeito, o projeto será iniciado em `http://localhost:3001`. Porém, antes de tentar qualquer outra coisa, será necessário iniciar o back-end com as instruções que serão dadas no README do projeto.

```
https://github.com/Diego-Sant/MVP-GarageLinkAPI-DesenvolvimentoBackEnd
```
  &nbsp;

---
## Fluxograma

![Fluxograma feito no eraser.io](/public/readmeimage/fluxograma.png)
  &nbsp;

---
## Sobre a API Externa

O `Cloudinary` é utilizado no projeto para facilitar o upload, armazenamento, gerenciamento e otimização de imagens dos carros anunciados e da foto de perfil do usuário. Ele oferece uma solução completa de gerenciamento de mídia, permitindo que as imagens sejam hospedadas externamente e otimizadas automaticamente para o desempenho do site, sem a necessidade de ocupar espaço no servidor principal.

Os arquivos que eu trato a api externa são o `uploadCarWidget.jsx` e o `uploadWidget.jsx`, o primeiro arquivo trata das imagens dos carros que serão enviadas na publicação, e o segundo trata da imagem do usuário.
  &nbsp;

---
## Como fazer uma publicação

Após criar e entrar com uma conta, você será direcionado ao menu principal, em seguida clique em "Perfil" na área de navegação e "Criar anúncio" do lado de "Minhas publicações". Para poupar tempo todas as informações estarão no arquivo `dummydata.js` no diretório `(/src/lib/dummydata.js)`.