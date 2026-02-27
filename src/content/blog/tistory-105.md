---
title: "ATOM : linebreaks - CRLF to LF"
date: 2016-12-28
tags: ["Tech", "Tool", "Atom", "lf", "CRLF", "linebreaks"]
tistory_url: "https://idenrai.tistory.com/105"
---

Atom을 사용한 CRLF-LF 변환

한 3주 잘 쓰다가, 나처럼 삽질하는 사람이 있을까봐 적어 보았다.

이번 프로젝트는 eslint를 조금 빡시게 걸어놨는데,

덕분에 기존 코드를 보면 linter에 걸리는 것 투성이라 불끄기가 참 힘들었다.

뭐 한달쯤 만지다 보니 이젠 문제 없긴 한데...

걸리는 것 중에,

「줄바꿈문자가 LF여야 하는데 CRLF다」

뭐 이런 녀석이 있더라.


Git은 줄바꿈문자 자동 변환 세팅이 되어 있어서 상관없는데,

가끔 어디서 코드를 긁어와 복붙하고 보면 이런 상황이 생긴다.

처음엔 영문을 몰라서

linebreaks crlf to lf

뭐 이런 식으로 검색을 했는데...

notepad++를 써서 [이렇게](http://sqlblog.com/blogs/jamie_thomson/archive/2012/08/07/replacing-crlf-with-lf-using-notepad.aspx) 변환을 하라더라.

여하튼 노트패드를 인스톨하고 어찌어찌 바꿔 보았다.

그런데 너무 귀찮더라...

이것도 한두번이어야지, 허구헌 날 이렇게 할 순 없다고 생각하던 와중...

정답은 가까운 곳에 있음을 알게 되었다.


Atom 하단부에 낯익은 문자가 있어서 눌러보니...


그냥 되더라...
