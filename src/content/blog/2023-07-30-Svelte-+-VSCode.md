---
title: "Svelte + VSCode"
date: 2023-07-30
tags: ["Tech", "Environment Setting", "Prettier", "Svelte"]
tistory_url: "https://idenrai.tistory.com/274"
---

# VSCode에서의 Svelte 자동 Formatting 설정

## Extention

[Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

`.vscode/extentions.json` 에 `recommendation` 설정을 해 두자.

```json
{
  "recommendations": [
    "svelte.svelte-vscode",
    "DavidAnson.vscode-markdownlint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

## 자동 Formatting 설정

이하를 VS Code Settings(Cmd + ,)에 추가하기만 하면 끝. `.vscode/settings.json` 에도 넣어두자.

```json
{
  "editor.formatOnSave": true,
  "[svelte]": {"editor.defaultFormatter": "svelte.svelte-vscode"}
}
```

## Prettier

좀 더 커스터마이즈 하고 싶은 경우, `.prettierrc`를 추가. 내 경우는 아래와 같이 설정했다.

```json
{
    "semi": false,
    "singleQuote": true,
    "printWidth": 120
}
```
