---
title: "Remove an element from a list inside a loop"
date: 2016-07-07
tags: ["Tech", "Java"]
tistory_url: "https://idenrai.tistory.com/77"
---

A2와 A2MN이라는 두 개의 DB에서 각각 List\>형식으로 데이터를 받아 와,

A2에 존재하지 않는 데이터가 A2MN에 존재한다면 해당 데이터를 전부 삭제하는 기능을 만들어야 했다.

그래서 생각해 낸 것이

1\. A2와 A2MN으로 이중 루프를 돌리고, 키가 일치할 경우 A2MN리스트에서 해당 데이터를 삭제

2\. 루프가 끝나면, A2MN의 사이즈를 체크

3\. 사이즈가 0보다 클 경우, 다시 루프를 돌려서 루프 안에서 각 데이터를 하나씩 삭제하며 삭제 로그 기록

이었는데...

이런 느낌으로 적어 봤더니

```
for (Map<String, Object> a2 : a2mp) {
for (Map<String, Object> a2mn : a2mnmp) {
if (a2.get("join_no").toString().equals(a2mn.get("join_no").toString())
&& a2.get("maintain_no").toString().equals(a2mn.get("maintain_no").toString())) {
a2mnmp.remove(a2mn);
}
}
}
Colored by Color Scripter
```

1에서 에러가 나는 것이었다.

ConcurrentModificationException이 뜨길래 알아보니,

원본인 a2mn이 돌고 있는 와중에 원본 내용을 변경(삭제)시켰기 때문에 에러가 뜬 것이었다.

개인적으로 For-Each를 너무나 좋아하지만, 이번엔 포기할 수 밖에 없었다...

```
// A2DB에서、적용 데이터 획득
List<Map<String, Object>> a2mp = new ArrayList<Map<String, Object>> ();
TekiyouForm a2param = new TekiyouForm();
a2param.include_sousitu = "1";
a2mp = a2service.getSelectTekiyouInfo(a2param);

// A2MNDB에서 데이터 전건 획득
List<Map<String, Object>> a2mnmp = new ArrayList<Map<String, Object>> ();
String tbl = "individual_info";
a2mnmp = service.dynamicSelectAll(tbl);
Iterator<Map<String, Object>> a2mnIter = a2mnmp.iterator();

// A2DB와 A2MNDB을 비교,「join_no」와「maintain_no」가 일치하는 데이터를 리스트에서 없앰
while (a2mnIter.hasNext()) {
Map<String, Object> a2mn = a2mnIter.next();

for (Map<String, Object> a2 : a2mp) {
if (a2.get("join_no").toString().equals(a2mn.get("join_no").toString())
&& a2.get("maintain_no").toString().equals(a2mn.get("maintain_no").toString())) {
a2mnIter.remove();
}// END if
}// END for
}// END while

// A2MN리스트가 남아 있을 경우
if (a2mnmp.size() > 0) {
for (Map<String, Object> a2mn : a2mnmp) {
/**
* 데이터 삭제 작업 및 삭제 로그 입력
*/
}// END for
}// END if
Colored by Color Scripter
```

Iterator의 next()를 remove() 전에 호출해 두고 삭제를 돌려서

ConcurrentModificationException를 피할 수 있었다.
