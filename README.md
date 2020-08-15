
<h1 align="center">
    <img alt="JoelhoEmFoco" title="#JoelhoEmFoco" src="./frontend/src/assets/svg/logo.svg" />
</h1>

<h4 align="center"> 
	Joelho em Foco - Concluído
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> •  
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

Joelho em Foco -  Oferece serviços de atendimento online e tele atendimento personalizado, para garantir a continuidade dos cuidados com a saúde, orientar sobre a prática de exercícios físicos e abordar sobre a importância da educação em dor. 


Projeto desenvolvido como uma forma dos alunos do curso de fisioterapia conseguisse atender seus pacientes mesmo durante o **COVID-19**, de forma totalmente online e personalizada.
feito como MVP para [Gisele Duarte](https://www.instagram.com/gih_duart/).


---

## ⚙️ Funcionalidades

- [x] Administradores podem cadastar na plataforma:
  - [x] os pacientes que serão atendidos
  - [x] os fisioterapeutas que irá atender os pacientes
  - [x] videos e artigos de eduacação em dor

- [x] Os fisioterapeutas podem:
  - [x] acessar o perfil do paciente e sua ficha
  - [x] cadastrar o link do google meet para video chamada

- [x] Os pacientes podem acessar:
  - [x] seu perfil e avaliação do fisio
  - [x] suestionário de funcionalidade
  - [x] cadastar escala de dor do dia
  - [x] cadastar escala de humor do dia
  - [x] acessar o link do google meet  

---

## 🎨 Layout

Prévia do layout:

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="JoelhoEmFoco" title="#JoelhoEmFoco" src="https://i.ibb.co/Wytfs04/screencapture-fisio-frontend-herokuapp-2020-08-14-23-27-20.png" width="400px">

  <img alt="JoelhoEmFoco" title="#JoelhoEmFoco" src="https://i.ibb.co/jz0t9yW/screencapture-fisio-frontend-herokuapp-home-painscale-2020-08-14-23-28-25.png" width="400px">
</p>

---

## 🚀 Como executar o projeto

Este projeto é divido em três partes:
1. Backend (pasta backend) 
2. Frontend (pasta frontend)

💡 O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/rbarbosa95/fisio-joelho-em-foco.git

# Acesse a pasta do projeto no terminal/cmd
$ cd fisio-joelho-em-foco

# Vá para a pasta backend
$ cd backend

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn develop

# O backend inciará na porta:1337 - acesse http://localhost:1337 

```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/rbarbosa95/fisio-joelho-em-foco.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd fisio-joelho-em-foco

# Vá para a pasta da aplicação Front End
$ cd web

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn serve

# A aplicação será aberta na porta:8080 - acesse http://localhost:8080

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Frontend**  ([Vue](https://vuejs.org/)  +  [vuetifyjs](https://vuetifyjs.com/))

-   **[Vue Router](https://router.vuejs.org/)**
-   **[Vuex](https://vuex.vuejs.org/)**
-   **[Axios](https://github.com/axios/axios)**

> Veja o arquivo  [package.json](https://github.com/rbarbosa95/fisio-repo-project/blob/master/frontend/package.json)

#### **Backend**  ([Strapi](https://strapi.io/))

-   **[KnexJS](http://knexjs.org/)**
-   **[SQLite](https://github.com/mapbox/node-sqlite3)**


> Veja o arquivo  [package.json](https://github.com/rbarbosa95/fisio-repo-project/blob/master/backend/package.json)

---

## 🎮 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 👨🏽‍💻 Autor

<div align="left">
<table>
  <tr align="center">
    <td>Coded By</td>
  </tr>
  <tr align="center">
    <td>
      <a href="https://github.com/rbarbosa95">
        <img src="https://avatars0.githubusercontent.com/u/15218743?s=460&u=d76d008067b2ee2fe2f55db081ea78cdad461e57&v=4" width="100" />
      </a>
    </td>
  </tr>
</table>
</div>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com 💚 por [Ramon Barbosa](https://www.linkedin.com/in/ramon-guimaraes/)

---
