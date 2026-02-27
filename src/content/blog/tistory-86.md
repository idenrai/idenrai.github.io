---
title: "DataTables의 X축 스크롤 지정과 Column길이 지정 (JavaScript & CSS)"
date: 2016-09-02
tags: ["Tech", "jQuery DataTables"]
tistory_url: "https://idenrai.tistory.com/86"
---

DataTables에서 스크롤이랑 column길이 적용시켜 놨더니

역시 길이지정은 CSS에서 하고 싶다는 소리가 나와서...

데이터테이블 적용 이후, 각 column에 CSS class를 입히게 되었다.

테이블을 따와서 바로 addClass로 class를 입혀 주어야 한다.

DataTables는 scrollHead와 scrollBody로 나뉘어져 있기 때문에 각각의 에 길이를 설정한다.

코드는 다음과 같다.

```
/**
* JavaScript (DataTables 적용 )
**/

$('.dataTables_scrollHead table thead').find('tr th').each(function(idx){
if (idx==0) $(this).addClass('func');
if (idx==1) $(this).addClass('operation');
if (idx==2) $(this).addClass('operation_detail');
if (idx==3) $(this).addClass('insurance_card_code');
if (idx==4) $(this).addClass('insurance_card_no');
if (idx==5) $(this).addClass('relationship_name');
if (idx==6) $(this).addClass('name');
if (idx==7) $(this).addClass('kana_name');
if (idx==8) $(this).addClass('create_dat');
if (idx==9) $(this).addClass('create_by_cd');
if (idx==10) $(this).addClass('create_by_nm');
});

$('.dataTables_scrollBody table thead').find('tr th').each(function(idx){
if (idx==0) $(this).addClass('func');
if (idx==1) $(this).addClass('operation');
if (idx==2) $(this).addClass('operation_detail');
if (idx==3) $(this).addClass('insurance_card_code');
if (idx==4) $(this).addClass('insurance_card_no');
if (idx==5) $(this).addClass('relationship_name');
if (idx==6) $(this).addClass('name');
if (idx==7) $(this).addClass('kana_name');
if (idx==8) $(this).addClass('create_dat');
if (idx==9) $(this).addClass('create_by_cd');
if (idx==10) $(this).addClass('create_by_nm');
});
Colored by Color Scripter
```

```
/**
* SCSS
**/

#history {
& table thead tr th {
& .func { width: 200px; }
& .operation { width: 150px; }
& .operation_detail { width: 500px; }
& .insurance_card_code { width: 200px; }
& .insurance_card_no { width: 200px; }
& .relationship_name { width: 150px; }
& .name { width: 150px; }
& .kana_name { width: 175px; }
& .create_dat { width: 175px; }
& .create_by_cd { width: 175px; }
& .create_by_nm { width: 175px; }
}
}
Colored by Color Scripter
```

근데 웃긴 건,

이렇게 설정을 하더라도 역시 DataTables에서

scrollX와 scrollXInner는 설정해 주어야 한다는 거다.

특히 scrollXInner는 DataTables에서의 길이 설정 때와 마찬가지로,

각 column의 길이 합계를 지정해 줘야 길이가 제대로 나온다.

괜히 코드만 세배로 길어진 것 같다...
