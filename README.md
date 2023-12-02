<p align="center">
  <img width="550" height="99" src="https://user-images.githubusercontent.com/106932234/204160165-1936c0db-539f-4a11-bf5e-1f3d3f789896.png">
</p>

<h3 align="center">Projeto realizado durante a trilha Explorer da Rocketseat</h3> <br><br>

<h3 align="center"><a href="https://foodexplorer-kevinsilvaa.netlify.app">Veja o resultado final do projeto</a></h3><br><br>

# Detalhes do projeto

### Este projeto é um cardápio digital de um restaurante fictício!</h3><br>
  
Durante a construção desse cardápio digital tive a oportunidade de adquirir experiência e treinar tudo que foi ensinado durante a trilha Explorer da Rocketseat, principalmente ReactJS e Node.js
A aplicação foi construída com base em um layout do figma e foi utilizado <strong>React</strong> para o [Front-end](https://github.com/KevinSilvaa/foodexplorer-frontend) e <strong>Node.js</strong> no [Back-end](https://github.com/KevinSilvaa/foodexplorer-backend).<br><br>
O Back-end é uma API RESTful que foi feita utilizando principalmente Node.js e Express.
O token de autenticação da aplicação é guardado dentro de um cookie ao invês de guardá-lo no localStorage, assim, deixando a aplicação mais segura.

# A aplicação possui dois cargos com permissões diferentes:

O Cargo de "admin" possui permissões para criar, editar, atualizar e deletar pratos e também pode mudar o status de pedidos que foram feitos pelos usuários.

O cargo de "customer", ou seja, usuário comum, possui permissão para favoritar pratos, fazer pedidos e checar o status de cada pedido que foi feito por ele se encontra.

Caso um usuário acesse uma rota que não está permitida para o seu cargo, ele irá cair em uma página de Not Found, e posteriormente, será redirecionado para a página inicial da aplicação.

<br>
<br>

# Tecnologias utilizadas para construção do Back-end

- `Node.js`: Uma framework do JavaScript utilizada para a construção de API´s.
    
  - `Express`; É utlizado para gerenciar requisições HTTP, tratar exceções dentro da aplicação e muito mais.
  - `Cors`; Utilizado para dar acesso ao Front-end utilizar as rotas e funcionalidades do Back-end.
    
- `SQLite`; É o banco de dados utilizado nesta aplicação, principalmente pela sua facilidade de uso.
- `Knex.js`; É um utilizado por conta da sua fácil criação de tabelas dentro do banco de dados e automação deste processo, sendo chamado de Query Builder.
- `JWT`; Utilizado para lidar com tokens de autenticação dentro da aplicação.

&nbsp;
&nbsp;
&nbsp;

### [Veja também como foi construído o Front-end](https://github.com/KevinSilvaa/foodexplorer-frontend).

# Como executar o projeto localmente

### Clone o projeto para o local desejado na sua máquina

## Front-end
```bash
$ git clone git@github.com:KevinSilvaa/foodexplorer-frontend.git
```

## Back-end
```bash
$ git clone git@github.com:KevinSilvaa/foodexplorer-backend.git
```

### É necessário executar tanto o Front-end, quanto o Back-end para que o projeto funcione corretamente.

&nbsp;
&nbsp;
&nbsp;

### 🚧 Executando o Back-end
```bash
# Insira uma porta e um segredo para o token de autenticação em um arquivo .env
AUTH_SECRET=
PORT=

# Navegue até o diretório onde o Back-end está localizado
cd foodexplorer-backend

# Instale todas dependências necessárias do projeto
$ npm install

# Inicie a aplicação
$ npm run dev
```

### 💻 Executando o Front-end
```bash
# Navegue até o diretório onde o Front-end está localizado
$ cd foodexplorer-frontend

# Instale todas as dependências necessárias do projeto
$ npm install

# Inicie a aplicação
$ npm run dev

# Após todos esses passos, utilize o endereço enviado via terminal dentro do navegador. O endereço padrão utilizado no projeto foi:

http://localhost:5173
```

## 🔖 Layout

Caso queira visualizar o layout do projeto, [clique aqui](https://www.figma.com/file/uPtB43YFVq8AsAsGz7tjqI/food-explorer-v2-(Community)?node-id=201%3A1532&mode=dev).

## Feito por:

### Kevin
### Linkedin: www.linkedin.com/in/kevinsilvaa
