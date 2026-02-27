---
title: "테이블에서 sticky로 컬럼 고정시의 border투명화 현상 해결"
date: 2021-04-21
tags: ["Tech", "HTML・CSS", "CSS", "Table", "position:", "borderCollapse:", "cell고정", "column고정"]
tistory_url: "https://idenrai.tistory.com/240"
---

좌측 복수 열을 고정시킨 테이블을 작성.

열 고정에는 sticky를 사용.

TD에 사용한 CSS는 다음과 같다.

border는 class로 부여, position을 sticky로 하고, 고정하고 싶은 left를 설정.

위와 같은 방법으로 1~3열을 고정으로 지정하였다.

2번째 열부터는 앞의 열의 width를 left로 설정해야 한다 (width설정 및 const화 필수)

위와 같이 설정한 경우 sticky를 설정한 셀의 border가 투명해져버려,

스크롤 이동 시 다른 셀의 내용 및 border가 비쳐 보이게 된다.

대략 이런 식으로...



분명 흰색으로 border를 설정해 놓았건만 위와 같은 식이다.

이를 해결한 방법은 다음과 같다.

Table에 borderCollapse를 separate로 지정하고,

그로 인해 border가 굵어지는 것을 방지하기 위해 borderSpacing을 0으로 지정.

결과물은 이러하다.


선이 조금 굵어졌으나, 허용 범위 내라고 생각된다.
