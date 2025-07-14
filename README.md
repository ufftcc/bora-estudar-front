# Bora Estudar UFF - Frontend

Uma aplicação web moderna para facilitar a criação e gerenciamento de grupos de estudo na Universidade Federal Fluminense (UFF). O sistema permite que estudantes se conectem, criem grupos de estudo e colaborem de forma eficiente através da integração com Discord.

## Sobre o Projeto

O **Bora Estudar UFF** é uma plataforma que conecta estudantes universitários interessados em formar grupos de estudo. A aplicação oferece funcionalidades para:

- **Autenticação de usuários** com sistema de registro e login
- **Criação e gerenciamento de grupos de estudo**
- **Busca e filtros avançados** para encontrar grupos relevantes
- **Integração com Discord** para comunicação em tempo real
- **Interface responsiva** e intuitiva

## Tecnologias Utilizadas

### Frontend
- **Angular 17** - Framework principal
- **TypeScript** - Linguagem de programação
- **Angular Material** - Componentes de UI
- **PrimeNG** - Biblioteca adicional de componentes
- **SCSS** - Pré-processador CSS
- **RxJS** - Programação reativa

### Ferramentas de Desenvolvimento
- **Angular CLI** - Ferramenta de linha de comando
- **Karma + Jasmine** - Testes unitários
- **Webpack** - Bundler de módulos

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Angular CLI** (`npm install -g @angular/cli`)

## Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd bora-estudar-front-help
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
O projeto está configurado para se conectar com o backend na porta 8080. Verifique o arquivo `src/proxy.conf.mjs` se necessário.

### 4. Execute a aplicação
```bash
npm start
# ou
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`

## Estrutura do Projeto

```
src/
├── app/
│   ├── auth/                    # Módulo de autenticação
│   │   ├── components/          # Componentes de login, registro, etc.
│   │   └── models/              # Modelos de dados de autenticação
│   ├── core/                    # Funcionalidades centrais
│   │   ├── security/            # Guards, interceptors, auth service
│   │   └── helpers/             # Utilitários
│   ├── shared/                  # Componentes e serviços compartilhados
│   │   ├── components/          # Componentes reutilizáveis
│   │   └── models/              # Modelos de dados compartilhados
│   ├── study-group/             # Módulo principal de grupos de estudo
│   │   ├── study-group-search-bar/      # Busca de grupos
│   │   ├── study-group-detail/          # Detalhes do grupo
│   │   ├── study-create-group/          # Criação de grupos
│   │   ├── my-study-group/              # Meus grupos
│   │   └── study-group-associate/       # Integração Discord
│   └── angular-material.module.ts       # Configuração Material Design
├── assets/                      # Recursos estáticos
├── environments/                # Configurações de ambiente
└── styles.scss                  # Estilos globais
```

## Funcionalidades Principais

### Autenticação
- **Registro de usuários** com validação de email
- **Login seguro** com JWT tokens
- **Confirmação de email**

### Grupos de Estudo
- **Criação de grupos** com informações detalhadas
- **Busca e filtros** por modalidade, horário, dias da semana
- **Visualização de detalhes** dos grupos
- **Gerenciamento de participantes**
- **Edição de grupos** (apenas para criadores)

### Integração Discord
- **Associação de conta Discord** obrigatória
- **Criação automática de canais** para grupos
- **Convites automáticos** para participantes

## Interface do Usuário

A aplicação utiliza **Angular Material** e **PrimeNG** para proporcionar:
- Design moderno e responsivo
- Navegação intuitiva com sidebar
- Feedback visual com snackbars
- Componentes acessíveis
- Tema consistente em toda aplicação

### Executar testes com coverage
```bash
ng test --code-coverage
```

## Build e Deploy

### Build de desenvolvimento
```bash
npm run build
# ou
ng build
```

### Build de produção
```bash
ng build --configuration production
```

Os arquivos de build serão gerados no diretório `dist/bora-estudar-front/`

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Build da aplicação
- `npm run watch` - Build com watch mode
- `npm test` - Executa os testes unitários

## Configuração de Proxy

O projeto está configurado para fazer proxy das requisições `/api` para `http://localhost:8080`. Esta configuração pode ser ajustada no arquivo `src/proxy.conf.mjs`.

## Responsividade

A aplicação é responsiva e otimizada para:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (até 767px)

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é parte de um Trabalho de Conclusão de Curso (TCC) da Universidade Federal Fluminense.

