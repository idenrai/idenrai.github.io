---
title: "NPM Error : \"ERR! code EPEERINVALID\""
date: 2016-12-06
tags: ["Tech", "NPM"]
tistory_url: "https://idenrai.tistory.com/102"
---

가끔 npm install을 돌리다 보면,

ERR! code EPEERINVALID

이딴게 출력되며 인스톨이 안될 때가 있다.

도통 영문을 모르겠기도 하고

디버그 파일을 봐도 그냥 눈만 아프고

여하튼 그냥 뜨면 개빡치는 에러인데...

어제도 새로운 프로젝트를 pull해놓고 보니 뜬금없이 이게 뜨더라.

근데 내 컴퓨터랑 node나 npm 버전이 동일한 선배의 경우에는 이게 안 뜬다.

똑같은 package.json으로 npm을 돌리는데 이게 뭔 차별인지...

이거 덕분에 결국 5시 반 정시퇴근은 못하고...

조금 검색을 하다 보니 어찌어찌 해결되었다.

npm을 업데이트하고 캐시를 지우니 되긴 되더라.

해결 방법은 다음과 같다.

```
npm install npm -g
npm cache clean
```

근데 또 빡치는 건, update라곤 하지만서도

정작 update를 하라고 만들어 둔 아래의 update문으로는 해결이 안된다는 거다.

1

npm update -g

[cs](http://colorscripter.com/info#e)
