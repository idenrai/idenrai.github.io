---
title: "Modal에서 출력한 DataTable의 Header 사이즈가 맞지 않을 경우"
date: 2016-08-12
tags: ["Tech", "jQuery DataTables"]
tistory_url: "https://idenrai.tistory.com/83"
---

Modal에서 데이터테이블을 뽑아놓고 보니

데이터는 그대로 잘 나오는데, 테이블 헤더의 사이즈가 맞지 않더라.

한번 헤더를 클릭해서 정렬시키고 나면 사이즈가 조절되긴 하는데...

역시 열었을 때 바로 맞춰지지 않으면 의미가 없다.

DataTable옵션에서 자체 해결은 힘든 것 같고...

나중에 CSS를 조절하는 방법 등 여러가지가 나오긴 했는데

결국 난 이 방법으로 해결했다.

```
// when modal shown, trigger resize for datatables adjust width
$('#modal').off('shown.bs.modal').on('shown.bs.modal', function(e) {
$(window).trigger('resize');
});
Colored by Color Scripter
```

일단 데이터테이블은 그대로 뽑아 놓고,

그 다음 펑션에 이 코드를 집어넣어 해결.
