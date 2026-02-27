---
title: "Comma Separated String을 배열로 변환"
date: 2020-03-17
tags: ["Tech", "JavaScript", "javascript", "문자열을"]
tistory_url: "https://idenrai.tistory.com/225"
---

의외로 쓸 일이 많아서 메모해 둔다.

Javascript에서 Comma로 나눠진 문자열을 배열로 만들어야 했다. Comma만 분리하는 거라면 Split을 쓰면 간단하다만... 이 문자열을 입력하는 것이 사람인지라, Comma와 문자 사이에 Space가 들어갈 가능성이 있다. 이 경우 분리 후에도 문자열에 Space가 남아버리므로, Space도 같이 지워줘야 한다.

```
const trimAndSplit = function (target) {
  return target.replace(/\s+/g, "").split(",");
}
```

이 함수의 효과는 다음과 같다. 아래의 문자열을 위의 함수에 보내면... `"aaa, bbb, ccc, ddd"`

아래와 같이, 문자열 배열이 반환된다. `["aaa", "bbb", "ccc", "ddd"]`
