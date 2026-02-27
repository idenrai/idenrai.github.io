---
title: "Windows에서의 Git 개행 코드 설정"
date: 2018-06-05
tags: ["Tech", "Git"]
tistory_url: "https://idenrai.tistory.com/157"
---

Windows Git Installer에서는 개행 코드의 자동 변환을 제공한다.

다만 되도록이면 이 자동 변환 기능을 쓰지 않는 편이 좋더라.

예전에도 LF/CRLF로 인해 eslint가 빨간줄 쭉쭉 뱉어낸 적이 있었고...

일단 이걸 쓰지 않을 기회는 처음부터 주어진다.

아래의 3개가 인스톨 시의 선택지.

1\. Checkout Windows-style, commit Unix-style line endings

2\. Checkout as-is, commit Unix-style line endings

3\. Checkout as-is, commit as-is

Windows Git Installer는 개행 코드의 자동 변환 기능이 Default로 On (1번)이 되어 있다.

이 때, 2나 3을 고르는 것을 추천한다.

다만, 윈도우에서의 인스톨이라는게 그냥 덮어놓고 확인을 누르는 경우가 많아서...

그냥 1로 해 버리고 나중에 좌절하는 경우가 생긴다.

저질러 버렸다면, 나중에라도 autoCRLF를 끄도록 하자.

git config --global core.autoCRLF false

어차피 인스톨하고 나서 username과 email도 설정해야 하니까,

그 김에 같이 이것도 설정하면 된다.

참조 : [windows環境の git で改行コードの自動変換に注意](https://qiita.com/yokoh9/items/1ec8099696ade0c1f36e)
