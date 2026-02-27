---
title: "Datatables 설정 도중, fnCreateRow에서의 Button추가"
date: 2016-10-13
tags: ["Tech", "jQuery DataTables", "jQuery", "fnCreateRow"]
tistory_url: "https://idenrai.tistory.com/94"
---

JQuery DataTables를 사용하는 도중,

테이블 내에 버튼을 만들어, 클릭 이벤트를 집어넣고 화면이동을 해야 했다.

보아하니 fnCreateRow에서 각 줄의 td를 비우고 append로 Button을 추가할 수 있기에,

여기에도 적어두도록 한다.

```
fnCreatedRow: function(nRow, aData, iDataIndex) {
$(nRow).attr("data-json", JSON.stringify(aData));

// add button
$(nRow).find('td').eq(5).html('').append(''+표시+'');
$(nRow).find('td').eq(6).html('').append(''+입력+'');
}
Colored by Color Scripter
```

「eq」를 사용하여 td를 지정, 해당 td의 글자를 지우고 Button을 집어넣는 방식이다.

애초에 글자를 입력하지 않으면, 글자를 지울 필요도 없지 않느냐는 생각도 들었는데...

파라메터로 데이터를 받아, 그걸 column에 직접 data로 설정, 집어넣다 보니 공란을 집어넣을 방법이 없더라...

그래서 그냥 아무거나 집어넣고 html('')로 지우는 방법을 택했다.

여기서 가장 중요한 것은,

eq를 통해 인덱스를 지정할 때엔, 보이는 td를 기준으로 인덱스를 정해야 한다는 것.

내 경우에는 위의 코드에서

```
columnDefs: [
// hide id(first column)
{
targets: [0],
visible: false,
searchable: false
},
{targets: [1], width: "150px"},
{targets: [2], width: "150px"},
{targets: [3], width: "100px"},
{targets: [4], width: "150px"},
{targets: [5], width: "150px"},
{targets: [6], width: "125px"},
{targets: [7], width: "125px"},
{targets: [8], width: "125px"}
],
Colored by Color Scripter
```

이와 같이 첫 번째 column은 visible을 false로 하여, 표시되지 않도록 하였는데...

이 column을 생각하여 button입력 td를 6,7로 잡았더니 7,8에 button이 들어가더라.

참고로, 마지막 column에 버튼을 넣고 싶다면,

eq대신 find('td:last')를 쓰면 된다.

아래와 같이, href를 설정하여 데이터를 parameter로 넘길 수도 있다.

```
fnCreatedRow: function(nRow, aData, iDataIndex) {
$(nRow).attr("data-json", JSON.stringify(aData));
// add buttons
$(nRow).find('td:last').html('').append(''+상세+'');
}
Colored by Color Scripter
```

그 후엔 뭐...

이런 식으로 router.js에서 page를 써서 잡아주면 된다.

```
page('view/detail/:id', function(ctx) {
var param = {};
param.id = ctx.params.id;
if (!param.id) return notice.warning('id not found');
if (!detail) return notice.warning('controller not found:' + 'detail');

Promise.resolve(param)
.then(detail.show)
.catch(error.show)
;
});
Colored by Color Scripter
```

href을 통해 해당 주소로 이동했을 경우,

미리 export해 둔 detail module의 show function을 발동시키는 형식이다.

이 때는, parameter로 받아온 id도 같이 param으로 넘기도록 한다.
