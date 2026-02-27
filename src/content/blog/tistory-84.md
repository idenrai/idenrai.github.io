---
title: "jQuery에서 clear()가 안먹힐 경우"
date: 2016-08-12
tags: ["Tech", "JavaScript"]
tistory_url: "https://idenrai.tistory.com/84"
---

한번 만든 Modal을 각 행의 버튼 클릭에 따라 여러번 불러내는 작업이 있었다.

이 과정에서 상세 데이터가 있는 경우는 DataTable로 데이터를 화면 출력하고

데이터가 없는 경우에는 메시지만 출력.

그런데 해당 테이블의 수를 확인하여 1이상일 경우 데이터테이블을 없애는 과정에서

datatable.destroy만으로는 해결이 되지 않기 때문에...

언제나처럼 테이블.clear()를 사용해서 없애 보려고 했다.

그런데 **clear is not a function**이라는 에러가 뜨더라...

remove를 쓰려니 자식 테이블 잡기가 애매하고...

혹시나 해서 **table.empty()** 를 썼더니 해결되었다.
