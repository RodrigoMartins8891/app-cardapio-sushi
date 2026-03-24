# 🍣 App Cardápio Japonês

Um aplicativo de cardápio digital desenvolvido com **React Native** e **Expo**, focado em uma experiência de usuário fluida com navegação por categorias e busca em tempo real.

## 🚀 Funcionalidades

- **Navegação Superior (Top Tabs):** Menu deslizante com categorias (Roll, Sushi, Yakisoba, etc).
- **Busca Inteligente:** Filtro dinâmico por nome de prato na tela inicial.
- **Sugestões de Pratos:** Destaque automático para itens marcados como sugeridos no cardápio.
- **Interface Personalizada:** Design temático em vermelho e branco com cards estilizados.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev)
- [Expo Go](https://expo.dev)
- [React Navigation (Material Top Tabs)](https://reactnavigation.org)
- [JavaScript](https://mozilla.org)

## 📂 Estrutura de Pastas

```text
├── assets/             # Imagens dos produtos e logo
├── componentes/        
│   ├── inicio/         # Tela inicial com busca e sugestões
│   ├── categoria/      # Tela dinâmica que filtra por categoria
│   └── cardapio.js     # Base de dados (Array de objetos)
├── utils/              
│   └── screenOptions.js # Configurações visuais das abas
└── App.js              # Configuração das rotas e navegação
Use o código com cuidado.

🏁 Como Executar o Projeto
Instale as dependências:
bash
npm install
Use o código com cuidado.

Inicie o servidor do Expo:
bash
npx expo start
Use o código com cuidado.

Abra o app:
Use o Expo Go no seu celular (escaneie o QR Code).
Ou pressione a para abrir no emulador Android.
📝 Licença
Este projeto é para fins de estudo e aprendizado de desenvolvimento mobile.
