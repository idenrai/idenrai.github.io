---
title: "eclipse: cannot open git-upload-pack"
date: 2016-07-05
tags: ["Tech", "Eclipse"]
tistory_url: "https://idenrai.tistory.com/74"
---

선배가 이클립스에서 GIT을 쓰는데

「eclipse: cannot open git-upload-pack」이 뜬다더라.

이클립스 못써먹겠다면서 그냥 cmd에서 해결하길래

혹시나 해서 찾아보니 방법이 있었다.

1\. window → preference → Team → Git → Configuration

2\. Add entry... 선택 후, 다음 값을 입력

key : http.sslVerify

value : false

이걸로 해결되었다.
