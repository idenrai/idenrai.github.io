---
title: "jQuery DataTables"
date: 2016-03-24
tags: ["Tech", "jQuery DataTables", "JQuery", "jQuery"]
tistory_url: "https://idenrai.tistory.com/62"
---

jQuery Plugin 중, [**jQuery DataTables**](https://datatables.net/)라는 게 있다.

테이블에 검색이나 페이징, 필터 등의 기능을 달아주고 총 건수 등도 표시해 준다.

API같은 건 그냥 직접 홈페이지 가서 보면 되고...

일단 사용예를 하나 적어 보았다.

```
$('#ListModal #List_table').dataTable({
"oLanguage" : {
"sProcessing" : "처리중...",
"sZeroRecords" : "데이터가 없습니다.",
"sLengthMenu" : " _MENU_ 건 표시",
"oPaginate" : {
"sFirst" : "처음",
"sNext" : "다음 페이지",
"sPrevious" : "이전 페이지",
"sLast" : "끝"
},
"sInfo" : "총_TOTAL_건 중, _START_건부터_END_건까지 표시",
"sInfoEmpty" : " 0 건 중, 0 부터 0 까지 표시",
"sInfoFiltered" : "（총 _MAX_ 건에서 추출 ）",
"sSearch" : "검색："
},
"bPaginate" : true, // 페이징
"iDisplayLength": 10, // 기본 표시행
"bLengthChange" : true, // 보여주는 건수 선택
"bFilter" : true, // 검색
"bSort" : true, // 소트
"bAutoWidth" : true,
});
Colored by Color Scripter
```

대충 항목명만 봐도 다 알만한 내용이다.

예를 들자면

bFilter는 검색창을 하나 달아 주는데, 있으면 편하긴 하지만 미관상 없애고 싶으면 그냥 false로 바꾸면 된다.

iDisplayLength라는 건 기본 표시행을 몇 줄로 할 것인지를 설정하는 것이고

bLengthChange는 행 수 변경을 해 주는 옵션이다.

bLengthChange는 디폴트로 10, 25, 50, 100을 보여주는데...

"aLengthMenu": \[10, 20, 50, "All"\]

와 같은 옵션을 통해 표시수 또한 조절 가능하다.
