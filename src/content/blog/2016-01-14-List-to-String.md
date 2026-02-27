---
title: "List to String"
date: 2016-01-14
tags: ["Tech", "Java", "PLSQL", "Oracle", "List"]
tistory_url: "https://idenrai.tistory.com/50"
---

Array를 JAVA에서 Oracle Stored Procedure로 보내는 게

현재 상황에서 생각처럼 쉽게 되지 않아서...

그냥 List를 String으로 만들어 프로시저로 보내서

프로시저에서 파싱하는 방법으로 바꾸기로 했다...

일단 List를 String으로 바꾸는 방법은 다음과 같다.

사이사이에 콤마를 넣어야 파싱이 가능하므로, 콤마도 넣었다.

```
public class JForm {
@ValidateIllegal(arg0 = @Arg(key = "明細行", resource = false, position = 0))
public List<String> notJushinList;
}
Colored by Color Scripter
```

```
String notJushinArray = "";
if(JForm.notJushinList.size() > 0){
for (String nj : JForm.notJushinList) {
notJushinArray = notJushinArray.concat(nj + ",");
}
if(notJushinArray.endsWith(",")) {
notJushinArray = notJushinArray.substring(0, notJushinArray.length() - 1);
}
}
System.out.println(notJushinArray);
Colored by Color Scripter
```

이후의 진행은 **[여기](http://idenrai.tistory.com/51)**를 참조
