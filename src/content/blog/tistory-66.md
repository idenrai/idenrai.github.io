---
title: "Bootstrap Modal을 화면 가운데에 띄우기"
date: 2016-04-06
tags: ["Tech", "HTML・CSS"]
tistory_url: "https://idenrai.tistory.com/66"
---

모달 크기를 키웠더니만, 자꾸 오른쪽으로만 뻗어나가더라.

bootstrap modal horizontal align center

뭐 대충 이런 식으로 구글느님 검색 돌렸더니

아래와 같은 답이 나왔다.

출처 : [http://stackoverflow.com/questions/18257200/centering-modal-in-twitter-bootstrap](http://stackoverflow.com/questions/18257200/centering-modal-in-twitter-bootstrap)

```
$("#Modal").modal('show').css({
'margin-top': function () { //vertical centering
return -($(this).height() / 2);
},
'margin-left': function () { //Horizontal centering
return -($(this).width() / 2);
}
});
Colored by Color Scripter
```

내 경우는 버티컬은 지금이 딱 맘에 들어서,

margin-left만 사용하고 있다.
