---
title: "ATOM에서 Local Package를 Install하는 방법"
date: 2018-06-05
tags: ["Tech", "Tool"]
tistory_url: "https://idenrai.tistory.com/156"
---

결론부터 말하자면,

apm link \[해당 패키지의 경로\]

난 처음에 이걸 그냥 패키지가 있는 폴더에서 바로 이름만 넣었다.

apm link \[package\_name\]

근데 이렇게 할 경우, 이게 안 잡히더라.

atom.project.getPaths()

패키지가 들어 있는 폴더를 따야 했는데, 이게 안 되어서 꽤나 당황했다.

참조 : [AtomでローカルのPackageをインストールする方法](https://qiita.com/sagaraya/items/11b4f9fbec7a4fcc4439)
