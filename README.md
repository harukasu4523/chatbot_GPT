# .envファイルの準備
https://platform.openai.com/account/api-keys
からsecretkeyを作成し、.envファイルに
`VITE_REACT_APP_OPENAI_API_KEY=Your Seacretkey`
として配置

# 実行
`npm run dev`

# chatbotのキャラ設定
以下ファイルに記載

`src/config/GPTConfig.jsx`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
