## Como usar


Instale as dependências:
```bash
npm install
```

Crie um arquivo .env com a string do banco neon | Diretório raiz
```env
DATABASE_URL=STRING DO BANCO NEON
```

Crie um arquivo .env.local com uma JWT aleatória (recomendo o [JWT Secrets](https://jwtsecrets.com/)) | Diretório raiz
```env
JWT_SECRET=52c1e2fa7403850e2895d9bbb2d99fe5
```

Gere as tabelas no banco
```
npm i -D drizzle-kit
npx drizzle-kit generate
npx drizzle-kit migrate
```

Inicie o servidor
```bash
npm run dev
```
