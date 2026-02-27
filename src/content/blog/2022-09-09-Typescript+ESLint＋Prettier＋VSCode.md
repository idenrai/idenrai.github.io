---
title: "Typescript+ESLint＋Prettier＋VSCode"
date: 2022-09-09
tags: ["Tech", "NPM", "VSCode", "typescript", "eslint", "Prettier"]
tistory_url: "https://idenrai.tistory.com/265"
---

# Typescript+ESLint＋Prettier＋VSCode 설정 메모

## Package Info

구성

```
test
├── package-lock.json
├── package.json
├── .eslintrc.js
├── .prettierrc.js
└── src
    └── index.ts
```

package.json

```
{
  "name": "insert-package-name",
  "version": "1.0.0",
  "description": "typescript+eslint+prettier Set",
  "main": "src/index.js",
  "scripts": {
    "dev": "ts-node src",
    "build": "tsc",
    "start": "tsc && node dist"
  },
  "author": "idenrai",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^16.11.12",
    "@typescript-eslint/eslint-plugin": "^5.36.2",
    "@typescript-eslint/parser": "^5.36.2",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "prettier": "^2.7.1",
    "ts-node": "^10.4.0",
    "typescript": "^4.5.3"
  }
}
```

.eslintrc.js

```
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
};
```

.prettierrc.js

```
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
};
```

index.ts

```
function main() {
    console.log('test');
}

main();
```

## VSCode

### Extensions

Marketplace에서 아래 두 가지 설치.

[ESLint](https://github.com/microsoft/vscode-eslint) [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### VSCode Settings

settings.json

```
{
    "security.workspace.trust.untrustedFiles": "open",
    "explorer.confirmDelete": false,
    "explorer.confirmDragAndDrop": false,
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode" // 포맷을 prettier로 설정
    },
    "editor.formatOnSave": true, // 저장시 prettier
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true // 저장시 eslint
    }
}
```
