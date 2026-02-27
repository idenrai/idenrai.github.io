---
title: "Atom에서 Local Package Install시의 NPM Module Error"
date: 2018-06-05
tags: ["Tech", "Tool"]
tistory_url: "https://idenrai.tistory.com/158"
---

Plugin 제작 시 NPM Module을 사용한 경우,

Local에서 Install을 하면 해당 NPM Package를 찾을 수 없다는 에러가 나올 수 있다.

apm clean

apm dedupe

위의 명령으로 일단 클린을 돌려 주면 제대로 돌아갈 가능성이 있다.

출처 : [Atomのpackageで発生したCannot find moduleエラーはapmコマンドで直せるかも](https://qiita.com/KemoKemo/items/d22306916115e82dbfaf)
