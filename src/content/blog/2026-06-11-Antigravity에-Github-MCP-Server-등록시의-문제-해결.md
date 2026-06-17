---
title: "Antigravity에 Github MCP Server 등록시의 문제 해결"
date: 2026-06-11
description: "Antigravity에 github-mcp-server 를 등록하려 했더니 아래와 같은 에러 발생 Error: exec: \"docker\": executable file not found in $PATH githu"
tags: ["Environment Setting", "Antigravity", "Github", "mcp"]
tistory_url: "https://idenrai.tistory.com/303"
---

Antigravity에 [github-mcp-server](https://github.com/github/github-mcp-server) 를 등록하려 했더니 아래와 같은 에러 발생

```
Error: exec: "docker": executable file not found in $PATH
```

github-mcp-server 가 로컬에서 Docker를 실행하려는데, Docker가 설치되어 있지 않거나 환경변수에 명령어가 없는 것이 문제.

해결 방법은 두가지

1.  Docker Desktop 설치

요구하는대로, Docker를 설치 및 실행하고 나면 해결됨

2.  Docker 없이 실행하기

이쪽이 오늘 포스팅하려던 해결방법. Docker를 따로 설치하자니 무거워질 것 같아서 따로 알아보니, Homebrew로 github-mcp-server 를 그냥 설치해버리는 방법이 있더라.

```
brew install github-mcp-server
```

이걸로 설치하고 나서, `mcp_config.json` 에서 아래와 같이 변경

```
{
  "mcpServers": {
    "github-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token"
      }
    }
  }
}
```
