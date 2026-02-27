---
title: "JsonparseException Illegal unquoted character ((CTRL-CHAR, code 10)"
date: 2016-09-05
tags: ["Tech", "Java"]
tistory_url: "https://idenrai.tistory.com/87"
---

Oracle에 select문을 날려 데이터를 받아오는 과정에서

19:19:58.081 \[http-nio-8080-exec-4\] ERROR o.a.c.c.C.\[.\[.\[.\[dispatcherServlet\] - Servlet.service() for servlet \[dispatcherServlet\] in context with path \[\] threw exception org.codehaus.jackson.JsonParseException: Illegal unquoted character ((CTRL-CHAR, code 0)): has to be escaped using backslash to be included in string value at \[Source: java.io.StringReader@176e1d0; line: 8542, column: 270\]

이딴 븅신같은 에러가 자꾸 나더라.

```
ResponseEntity<String> response = restTemplate.exchange(
builder.build().encode("UTF-8").toUriString(),
HttpMethod.GET,
new HttpEntity<Object>(headers),
String.class
);
JsonNode mpK2Info = new ObjectMapper().readTree(response.getBody());
```

일단 에러가 나는 곳은 위의 7번째 줄이고...

이클립스에서 디버거 찍어보니, response.getBody()까지는 평범하게 데이터를 뱉어내더라.

ObjectMapper를 써서 response를 JsonNode에 넣는 부분에서 에러가 난다는 것은 알았다.

SQL도 평범하게 잘 날리고 있고, 특정 조건에서만 나오는 것을 보니 백방 데이터 문제인 것 같고,

마침 지금 만지고 있는 것이 본방 데이터다 보니

고객측에서 뭔가 요상한 프로그램을 써서 이름 등의 개인정보에 다 마스크를 씌워 놓은 상태다.

일단 성명 혹은 가타카나성명 쪽에 븅신같은 데이터가 있다는 전제 하에,

조금씩 검색범위를 좁혀가며 에러가 나는 부분을 찾아냈다.

수십만건을 1건으로 좁히는 작업이 의외로 재미있더라...

문제가 되는 데이터를 발견해놓고 보니 골때리는게...

이 데이터가 오라클에서 SQL로 뽑아보면 가타카나 이름이 「ﾃｽﾄﾞ」로 나오는데,

이클립스 디버거에서는 「ﾃｽﾄﾞ□ﾐﾎﾝﾀ」로 나오더라.

실제로는 □이 아니라 뭔가 다른 문자인데,

이름을 텍스트에디터 등에서 복붙하려 했더니 □이후의 문자가 짤려서 표현이 안된다.

무슨 볼드모트도 아니고...

여튼 임마만 좀 걸러내면 될 것 같아서 replace를 써서 걸러내 보았다.

```
replaceAll("[\\x00-\\x09\\x11\\x12\\x14-\\x1F\\x7F]", "")
```

이걸 써 보니 일단 에러가 안나길래, 문제가 되는 문자가 이 안에 있다는 것은 알았고...

원인을 좀 제대로 알고 싶기에 하나씩 리플레이스를 하다 보니 첫방에 바로 뜨더라.

범인은 「\\x00」였다.

좀 검색해보니 이게 NULL코드인데...

**[여기](http://ohgyun.com/421)**를 보니 BSON에서는 String의 종료문자로 쓰인다고 한다.

아마 이 건에서도 비슷한 느낌으로 얘를 종료문자로 인식해서 이름이 「ﾃｽﾄﾞ」에서 끊겨버린 것 같다.

실제로 replace로 「\\x00」를 걸러내 보니 「ﾃｽﾄﾞﾐﾎﾝﾀ」가 제대로 표시되더라.

데이터를 바꿀 수는 없기도 하고...

일단 이게 마스크로 변환시킨 데이터라 실제 사용시엔 뜰 일이 없을테니...

그냥 Java쪽에서 replace로 걸러내는 것으로 마무리지었다.

```
JsonNode mpA2Info = new ObjectMapper().readTree(response.getBody().replaceAll("[\\x00]", ""));
```

제발 마스크 씌울 때는 좀 제대로 된 툴을 써 줬으면 좋겠다...
