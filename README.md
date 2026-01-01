# File Analyzer Tool - Lead Gen B2B (Google Maps & Places)

Esta ferramenta foi desenvolvida para prospecção de leads B2B, focando em encontrar empresas através da API do Google Maps/Places que necessitam de serviços digitais (como criação de sites).

## 🚀 Funcionalidades

- **Busca por Região**: Utiliza a API do Google Places para encontrar estabelecimentos.
- **Filtros Inteligentes**: Filtre por categoria, raio de busca e limite de resultados.
- **Dashboard Intuitivo**: Acompanhe suas buscas e gerencie os leads encontrados.
- **Exportação**: Suporte para exportação de dados (preparado para Google Sheets).
- **Interface Moderna**: Desenvolvido com React, Tailwind CSS e Shadcn UI.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI, Framer Motion.
- **Backend**: Node.js, Express.
- **Banco de Dados**: PostgreSQL com Drizzle ORM.
- **APIs**: Google Places API.

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL (ou uma URL de conexão válida)

### 2. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes chaves:

```env
GOOGLE_MAPS_API_KEY=Sua_Chave_Aqui
DATABASE_URL=Sua_URL_do_PostgreSQL
```

### 3. Instalação
```bash
# Instalar dependências
npm install

# Configurar o banco de dados (Drizzle)
npm run db:push
```

### 4. Execução
```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 📋 Próximos Passos Recomendados

1. **Implementação da Lógica Real da API**: O arquivo `server/lib/google.ts` contém atualmente uma implementação de "mock" (simulação). Você deve substituir a função `mockSearch` pela chamada real à API do Google Places usando a chave que você já possui.
2. **Configuração do Banco de Dados**: Certifique-se de ter um banco PostgreSQL rodando e a `DATABASE_URL` configurada corretamente no seu ambiente de deploy (Vercel, Railway, Render, etc).
3. **Google Sheets**: Para habilitar a exportação, você precisará configurar uma Service Account no Google Cloud e adicionar as credenciais em `GOOGLE_SHEETS_CREDENTIALS`.

## 📄 Licença
Este projeto está sob a licença MIT.
