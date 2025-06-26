
# Setup do App Mobile com Capacitor

## Pré-requisitos
- Node.js instalado
- Para iOS: macOS com Xcode
- Para Android: Android Studio

## Passos para rodar no VS Code local:

### 1. Clone o projeto
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd do-it-timer-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Construa o projeto
```bash
npm run build
```

### 4. Inicialize o Capacitor (só na primeira vez)
```bash
npx cap init
```

### 5. Adicione as plataformas
```bash
# Para Android
npx cap add android

# Para iOS (apenas no macOS)
npx cap add ios
```

### 6. Sincronize o projeto
```bash
npx cap sync
```

### 7. Execute o app
```bash
# Para Android
npx cap run android

# Para iOS
npx cap run ios
```

## Para desenvolvimento:
1. Faça mudanças no código
2. Execute `npm run build`
3. Execute `npx cap sync`
4. O app será atualizado automaticamente

## Notas importantes:
- O app funciona tanto no navegador quanto mobile
- Para testar no dispositivo físico, siga os passos acima
- Para desenvolvimento rápido, use o hot-reload configurado no capacitor.config.ts
