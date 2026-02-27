---
title: "태그 내 요소의 세로정렬+줄바꿈"
date: 2016-11-30
tags: ["Tech", "HTML・CSS"]
tistory_url: "https://idenrai.tistory.com/99"
---

메가드롭다운 관련 부품을 작성 중,

정해진 드롭다운 height 내에서 ↓↗↓↗방향으로 요소를 정렬해야만 했다.

평소였으면 그냥 Bootstrap Grid를 사용했을 텐데

이번엔 UL과 LI로 해결을 보려다 보니 좀 애매하게 되었다.

float: left로는

→↙

→↙ 방향으로 움직이다 보니 width를 정의해야 했고,

각 요소간 빈칸이 제대로 좁혀지질 않았다.

일단 내가 생각한 메가드롭다운은

내용이 넘칠 경우 횡스크롤을 달고 싶었기에 이건 각하.

UL태그에 다음과 같은 CSS를 투입하여 해결하였다.

```
ul {
display: flex;
align-content: flex-start;
flex-direction: column;
flex-wrap: wrap;
overflow: auto;
}
```
