
# TaskTimer - App de Produtividade

Um aplicativo de gerenciamento de tarefas com timer Pomodoro, desenvolvido com React e disponível para web e mobile.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Mobile**: Capacitor (iOS/Android)
- **Estado**: React Context + localStorage
- **Roteamento**: React Router

## 📱 Funcionalidades

- ✅ Sistema de autenticação
- ✅ Criação e gerenciamento de tarefas
- ✅ Timer Pomodoro customizável
- ✅ Modo claro/escuro
- ✅ Interface responsiva
- ✅ Notificações
- ✅ App mobile nativo (iOS/Android)

## 🛠️ Como executar

### Web (Desenvolvimento)
```bash
npm install
npm run dev
```

### Mobile (Produção)
Consulte o arquivo `MOBILE_SETUP.md` para instruções detalhadas.

## 📦 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── contexts/         # Contextos React
├── hooks/           # Hooks customizados
├── pages/           # Páginas da aplicação
└── lib/             # Utilitários
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Desenvolvimento web
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npx cap run android` - Executar no Android
- `npx cap run ios` - Executar no iOS

## 📱 Instalação Mobile

O app pode ser instalado como PWA no navegador ou como app nativo seguindo as instruções em `MOBILE_SETUP.md`.
