---
title: "Javascript에서 페이지 내의 테이블 객체 다루기"
date: 2015-06-24
tags: ["Tech", "JavaScript", "javascript", "테이블"]
tistory_url: "https://idenrai.tistory.com/13"
---

ID등 지정 전혀 없이 그냥 생 HTML로 집어넣은 화면상의 테이블에서

각 내의 input type text의 값을 뽑아내어...

배열로 만들어 DB에 넣는 작업.

```
/*
* 画面上のテーブルを読み込む
* */
function readThisTable(){
// テーブル一行のオブジェクト
var rows = $('#kubunCodeMaster_table tr._detail');
// テーブル全体のデータを入れるList
var allData = new Array();

// テーブルのすべてのデータをallDataに入れる作業
if (rows && rows.length > 0) {
$(rows).each(function (idx) {
if (idx >= 0) { // idx : の数
var oneData = new Array(); // 一行のデータを入れるList
var startIdx = 0;

// tr 一行の中のテキストﾌｨｰﾙﾄﾞの数
var endIdx = $('#kubunCodeMaster_table').children('tbody').children('tr:first')
.children('td').children('input[type="text"].detailText').length;

// テーブルのすべてのテキストフィールドのデータを一行ずつ読み込む
for (var i = startIdx ; i < endIdx ; i++) {
var d = $(rows[idx]).find('td').eq(i).children('input[type="text"]').val();
oneData.push(d);
}
allData.push(oneData);
}
});
}
// 読み込んだテーブルデータをReturn
return allData;
}

Colored by Color Scripter
```

일단 테이블에서 tr로 for-each를 돌리고,

한 줄에 있는 text의 개수를 뽑아낸 후

이 줄당 text의 개수를 엔드 인덱스로 하여

2중 포문을 돌리며 각 text의 값을 뽑아내 배열에 넣었다.

비슷한 느낌으로, 이런 것도 가능하다.

1

2

3

4

5

6

7

8

9

var rows \= $('#detailList tr');

if (rows && rows.length \> 0 && param.result.length \> 0) {

$(rows).each(function (idx) {

var data \= $(rows\[idx\]).data('json');

if (data.status\=\=basic.i18n.get('status.eligibleUsers.noanswer')) {

$(rows\[idx\]).find('td').children('button.progress').attr("disabled","disabled");

}

});

}

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

DataTables로 일단 Button을 만들어 두고,

TD에 data-json이라는 이름으로 해당 json데이터를 다 넣어둔 뒤

이후 eventbind function쯤에서 테이블을 한번 읽어서 status가 미응답인 경우, 해당 버튼을 disabled로 변경.
