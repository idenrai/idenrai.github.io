---
title: "React.js에서의 modal의 cache삭제"
date: 2016-11-04
tags: ["Tech", "React.js", "remove"]
tistory_url: "https://idenrai.tistory.com/98"
---

cache 삭제를 위해 removeAttr()등을 사용해 보았으나,

괜히 코드가 길어지기도 하고, 자꾸 다른 곳에서도 cache가 남아...

불끄다 시간 다 가겠다 싶더라.

그냥 마음 편하게 eventBind에 modal이 닫힐 때를 추가,

해당 modal의 parent를 비워서 modal 자체를 날려버리도록 하자.

```
function eventBindModal(param) {
return new Promise(function(resolve, reject) {

$('#'+param.id).off('hidden.bs.modal').on('hidden.bs.modal', function(e) {
$('#' + param.id).parent().empty();
});

resolve(param);
});
}
Colored by Color Scripter
```
