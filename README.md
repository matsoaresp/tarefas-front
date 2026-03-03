# 📝 Gerenciador de Tarefas

Aplicação web desenvolvida com **Next.js (App Router)** para gerenciamento de tarefas, permitindo criar, listar, editar e excluir registros com persistência local utilizando `localStorage`. O projeto irá evoluir para utilizar banco de dados e autenticação 

Este projeto foi inicializado com `create-next-app` e tem como foco o aprendizado de arquitetura moderna com App Router, componentização e tipagem com TypeScript.

---

## 🚀 Demonstração

Após iniciar o servidor de desenvolvimento, acesse:

```
http://localhost:3000
```

---

## 🎯 Funcionalidades

- ✅ Criar tarefa (nome e descrição)
- ✅ Listar tarefas dinamicamente
- ✅ Editar tarefa existente
- ✅ Excluir tarefa
- ✅ Persistência de dados no navegador
- ✅ Atualização reativa da interface
- ✅ Tipagem forte com TypeScript

---

## 🛠️ Tecnologias Utilizadas

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **LocalStorage (API do navegador)**

---

## 📂 Estrutura do Projeto

```bash
src/
 ├── app/
 │    ├── (private)/
 │    │     └── criar-task/
 │    │           ├── page.tsx
 │    │           └── components/
 │    │                └── CriarTask.tsx
 ├── public/
 ├── package.json
 └── tsconfig.json
```

### 📌 Organização

- `page.tsx` → Define a rota da aplicação.
- `CriarTask.tsx` → Componente Client responsável pela lógica das tarefas.
---

## ⚙️ Como Executar o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Ou, se preferir:

```bash
yarn dev
```

```bash
pnpm dev
```


### 3️⃣ Abrir no navegador

```
http://localhost:3000
```

---

## 💾 Persistência de Dados

O projeto utiliza `localStorage` para armazenar as tarefas:

```ts
localStorage.setItem("tasks", JSON.stringify(tasks))
```

### ⚠️ Limitações

- Os dados são armazenados apenas no navegador atual.
- Não há sincronização entre dispositivos.
- Não há autenticação ou controle de usuários.

---

## 🧠 Conceitos Aplicados

- Componentes Client no App Router
- Hook `useState` para gerenciamento de estado
- Hook `useEffect` para sincronização inicial
- Tipagem com `type` no TypeScript
- Manipulação de arrays com:
  - `map()`
  - `filter()`
  - Spread operator (`...`)

---

## 📈 Possíveis Melhorias Futuras

- 🔐 Implementar autenticação de usuários
- 🗄️ Integrar banco de dados (PostgreSQL ou MongoDB)
- 🌐 Criar rotas de API (`/api/tasks`)
- 🎨 Implementar estilização com Tailwind CSS
- 🧪 Adicionar testes automatizados
- ☁️ Deploy em ambiente de produção

---


## 📚 Referências

- Documentação oficial do Next.js: https://nextjs.org/docs
- Guia do App Router: https://nextjs.org/docs/app
- Plataforma de deploy: https://vercel.com

---

## 👨‍💻 Autor
Projeto desenvolvido para fins de estudo e prática em desenvolvimento frontend com foco em arquitetura moderna utilizando Next.js e TypeScript.

Mateus Soares Prado
