---
title: "SubReport에서의 무한루프 문제"
date: 2015-10-20
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/36"
---

iReport에서 SubReport를 써야 하는 상황.

레포트 상단 반쪽을 그냥 냅두고 하단 반쪽에 서브레포트를 넣으려고도 해 보았으나 잘 되지 않았다.

결국 서브레포트 두개를 하나의 마스터레포트에 올려서 한 페이지로 출력하기로 하였다.

MaserReport에서 Detail밴드의 크기를 풀로 넣고

두 레포트를 순서대로 집어넣었더니 일단 움직이는 것은 성공.

다만, 정상적으로 구동하였다면 4장이 출력되어야 했을 레포트가 무슨 이유에선가 84장 출력.

Detail에 넣은 것이 문제인가 싶어 Page Header와 Column Header에 넣어 보았더니

이번에는 "Infinite loop creating new page due to column header overflow."라며 아예 돌아가질 않는다.

둘 다 **Summary필드**에 넣는 것으로, 정상적으로 4장이 출력되었다.

\* iReport SubReport의 특성

\- Footer에서는 되지 않음

\- Detail Band에서는 상황에 따라 무한루프 발생

\- Header에서는 무한루프로 인해 컴파일 불가

\- Summary를 사용하자.
