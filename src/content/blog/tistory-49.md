---
title: "테이블 클릭 이벤트"
date: 2016-01-13
tags: ["Tech", "JavaScript", "javascript", "table"]
tistory_url: "https://idenrai.tistory.com/49"
---

```
// TDクリックイベント
$(document).on("click", "#List #List_table tr.clOK", function(event) {
if ($(this).hasClass("success")) {
$(this).removeClass("success");
$('#List #hide_projectCode').html("");
$('#List #hide_meisaiNum').html("");
/*
$('#Index ul li.clickFlg').attr({
'style' : 'display:none;'
});
*/
$('#Index ul li.clickFlg a.btn').addClass("disabled");
} else {
// 先にクリックした行の色を消す。
if ($("#List #List_table tr.clOK").hasClass("success")) {
$("#List #List_table tr.clOK").removeClass("success");
}
// 今クリックした行に色を入れて、明細番号もHiddenに入れる
$(this).addClass("success");
var projectCD;
var meisaiNum;
if ($(event.target).is('tr.clOK')) {
projectCD = $(this).find("td.pjCDTd span.pjCDSpan").html();
meisaiNum = $(this).find("td.pjCDTd span.msNoSpan").html();
} else {
projectCD= $(this).closest('tr').find("td.pjCDTd span.pjCDSpan").html();
meisaiNum = $(this).find("td.pjCDTd span.msNoSpan").html();
}
$('#List #hide_projectCode').html(projectCD);
$('#List #hide_meisaiNum').html(meisaiNum);
/*
$('#Index ul li.clickFlg').attr({
'style' : 'display:"";'
});
*/
$('#Index ul li.clickFlg a.btn').removeClass("disabled");
}
});

tr에 onclick="$.fn_toggle()"을 걸고...

$.fn_toggle = function() {
var objTr = $(event.srcElement).closest("tr");
$(objTr).toggleClass("selected"); //.selected라는 background-color 지정 class 세팅
$(objTr).siblings().removeClass("selected"); //클릭된 tr을 제외한 나머지 tr에서 class 제거
};
$.fn_getSelectedCount = function() {
alert( $(".selected").length ); //return selected count
};
Colored by Color Scripter
```
