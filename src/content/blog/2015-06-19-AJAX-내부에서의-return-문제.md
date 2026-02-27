---
title: "AJAX 내부에서의 return 문제"
date: 2015-06-19
tags: ["Tech", "JavaScript", "AJAX", "async"]
tistory_url: "https://idenrai.tistory.com/11"
---

코드 관리 테이블 마스터 작성 중,

DB와 연계하여, 입력된 코드의 중복 검사를 할 필요가 있었음.

var chkBCOverlap = false;

를 선언 후,

중복 체크를 해 가며 최종적으로는

chkBCOverlap = true;

로 바꾸고

return chkBCOverlap;

를 하고 싶었으나...

Ajax로 데이터를 받아온 이후,

```
success: function(data){
if(조건){
chkBCOverlap = true;
}
}
```

와 같은 형태로 선언을 했더니

이 이후로 진행이 되지 않는 문제가 발생하였다.

일단 JSON이 비동기식이기 때문에,

Ajax단에서의 return이 움직이기 전에,

이미 그 아래의 코드가 별도로 진행되어 버린 것이다.

이를 해결하기 위해서

**ajax단을 따로 분리하여 function을 만들어,**

**거기서 return을 하는 방향으로 변경.**

이래 해봐야 ajax의 비동기식 방식은 변하지 않는다!

그래서 더 알아보니...

그냥 Ajax내부에, 동기식-비동기식 조절 가능한 방법이 있었다.

```
$.ajax({
url: '~~~',
type: 'POST',
data: {
A: A
},
async: false,
dataType: 'json',
beforeSend: function(XMLHttpRequest) {
},
success: function(data){
// 内容
}
});
Colored by Color Scripter
```

**동기화 : async를 false로**

**비동기화 : default**

이걸로 해결되었다...

AJAX 본문

**asyncBoolean**

**Default:** true

[](http://docs.jquery.com/Types#Boolean)

By default, all requests are sent asynchronous (i.e. this is set to true by default). If you need synchronous requests, set this option to false. Cross-domain requests and `dataType: "jsonp"` requests do not support synchronous operation. Note that synchronous requests may temporarily lock the browser, disabling any actions while the request is active.
