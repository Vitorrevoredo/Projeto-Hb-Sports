# HB Sports - E-commerce de Artigos Esportivos

O **HB Sports** é uma aplicação Full-Stack de e-commerce desenvolvida para comercialização de vestuário, calçados e acessórios esportivos (categorias Masculino, Feminino, Calçados e Coleções).

---

## 📌 Sobre o Projeto

A plataforma oferece uma experiência completa de compras online, incluindo navegação por categorias de produtos, busca e filtragem, detalhamento de itens, carrinho de compras e sistema de autenticação de usuários (registro e login com criptografia de senha e tokens de sessão).

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **HTML5 & CSS3**: Estruturação semântica e estilização responsiva.
- **JavaScript (Vanilla)**: Manipulação dinâmica do DOM, consumo das APIs REST e gestão de sessão do usuário.

### **Backend**
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework para criação de rotas e da API RESTful.
- **SQLite3**: Banco de dados relacional leve para armazenamento de usuários e produtos.
- **bcryptjs**: Criptografia segura de senhas.
- **jsonwebtoken (JWT)**: Autenticação baseada em tokens.
- **CORS**: Habilitação de requisições cross-origin entre cliente e servidor.

---

## 📁 Estrutura do Projeto

```text
Projeto-Hb-Sports/
├── package.json               # Dependências da raiz
├── servidor/                  # Aplicação Backend Node.js / Express
│   ├── index.js               # Ponto de entrada do servidor Express
│   ├── server.js              # Configuração secundária de servidor
│   ├── package.json           # Dependências do backend (Express, SQLite3, etc.)
│   ├── controllers/           # Lógica de negócios (autenticação e produtos)
│   │   ├── authController.js
│   │   └── produtosController.js
│   ├── database/              # Banco de dados e scripts de povoamento
│   │   ├── db.js              # Conexão com SQLite
│   │   ├── produtos.db        # Arquivo do banco de dados SQLite
│   │   └── seed.js            # Script para popular o banco de dados
│   ├── routes/                # Definição das rotas da API REST
│   │   ├── authRoute.js       # Rotas de login e registro (/api/auth)
│   │   └── produtosRoute.js   # Rotas de catálogo e produtos (/api/produtos)
│   └── public/                # Frontend da aplicação (Páginas Estáticas e Assets)
│       ├── index.html         # Página Inicial (Home)
│       ├── masculino.html     # Categoria Masculino
│       ├── feminino.html      # Categoria Feminino
│       ├── calcados.html      # Categoria Calçados
│       ├── colecao.html       # Coleções especiais
│       ├── produto.html       # Detalhes do Produto
│       ├── carrinho.html      # Carrinho de compras
│       ├── login.html         # Autenticação de usuário
│       ├── registre-se.html   # Cadastro de novo usuário
│       ├── perfil.html        # Perfil do usuário
│       ├── css/               # Folhas de estilo
│       ├── js/                # Scripts do cliente
│       └── assets/            # Imagens e mídias
```

---

## 🔌 Endpoints da API REST

### **Produtos (`/api/produtos`)**
- `GET /api/produtos`: Retorna a lista completa de produtos cadastrados.
- `GET /api/produtos/:id`: Retorna os detalhes de um produto específico pelo ID.

### **Autenticação (`/api/auth`)**
- `POST /api/auth/register`: Cadastra um novo usuário no banco de dados (gera hash da senha com `bcrypt`).
- `POST /api/auth/login`: Autentica o usuário e retorna o token JWT de acesso.

---

## 🔧 Como Executar o Projeto

### **Pré-requisitos**
- **Node.js** (versão 14 ou superior) e **npm** instalados.

### **Passos para Instalação e Execução**

1. **Clonar o Repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Projeto-Hb-Sports
   ```

2. **Navegar até a pasta do servidor e instalar as dependências:**
   ```bash
   cd servidor
   npm install
   ```

3. **Popular o Banco de Dados (Seed):**
   *Executará o script de inicialização do banco SQLite com produtos e usuários de teste.*
   ```bash
   npm run seed
   ```

4. **Iniciar o Servidor:**
   ```bash
   npm start
   ```

5. **Acessar a Aplicação:**
   Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)

---

## 👥 Recursos Principais

- 🛒 **Catálogo de Produtos**: Navegação dinâmica por categorias esportivas.
- 🔍 **Detalhamento**: Visualização de preços, fotos e especificações técnicas de cada item.
- 🔐 **Autenticação**: Registro de novos clientes e login seguro.
- 🛍️ **Carrinho de Compras**: Adição de itens e cálculo do total da compra.
