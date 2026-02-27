---
title: "macOS Update 후 Git커맨드를 쓰지 못하는 현상"
date: 2022-10-20
tags: ["Tech", "Environment Setting", "macos", "git", "xcode-select", "xcrun"]
tistory_url: "https://idenrai.tistory.com/266"
---

회사 맥북을 BigSur에서 Monterey로 업데이트하게 되었다.

며칠후 Git을 쓸 일이 있었는데, 아래와 같은 에러가 발생.

> xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun

xcode-select를 깔아주면 해결된다.

```
xcode-select --install
```
