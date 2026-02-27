---
title: "new line in Text Field"
date: 2015-09-29
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/32"
---

DB에서 Data를 가지고 올 경우, 해당 Data를 줄바꿈해야 할 필요가 있다면...

받아온 Data를 iReport자체에서 줄바꾸기를 하는 것은 불가능하다.

(Replace all 등으로 어찌어찌 만지면 바꿀 수 있을지도 모르겠다)

다만, Action에서 iReport로 값을 넘길 때 (혹은 DB자체에서) 자체 줄바꿈을 할 수 있는 방법을 발견하여 여기 적는다.

1\. 일단 받아올 Data(String)에서 줄바꿈이 필요한 부분을 \>로 고친다.

2\. iReport에서 해당 Text Field의 Property를 열어, Markup을 none에서 html로 수정한다.

Static Text에서는 그냥 Alt + Enter로 해결되며,

혹시 Text Field에서 두 개의 항목을 줄바꿈으로 표현해야 하는 경우에는

$F{A} + "\\n" + $F{B}

의 형태로 줄바꿈이 가능하다.

\* 물론, spacebar의 경우도   로 바꾸어야 적용된다.

textarea의 값 치환

text = text.replace("\\r\\n", "  
"); // Enter값 치환

text = text.replace("\\u0020", " "); // Spacebar값 치환
