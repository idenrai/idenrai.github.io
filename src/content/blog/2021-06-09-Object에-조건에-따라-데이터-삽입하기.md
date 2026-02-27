---
title: "Object에 조건에 따라 데이터 삽입하기"
date: 2021-06-09
tags: ["Tech", "JavaScript", "조건", "javascript", "Object", "typescript", "object.assign()"]
tistory_url: "https://idenrai.tistory.com/244"
---

MongoDB에 넣을 쿼리를 만드는 중이었다. Curl로 날린 파라메터를 받아서 쿼리 오브젝트에 집어넣는데...

오브젝트에 멤버를 넣어버리면 그걸 그대로 검색조건으로 박아버리니까, 값이 없는 경우도 다 조건이 되어버린다.

이걸 해결하려면 애초에 내용이 없는 데이터는 쿼리에 넣어선 안된다.

일단 그냥 자바스크립트면 심플하게 아래의 방법을 쓸 수 있다.

```
const obj = {
  ...(input.name && input.name !== '') && {name: input.name},
  ...(input.hobby && input.hobby.length > 0) && {hobby: input.hobby},
}
```

근데 타입스크립트면 위 방법이 에러가 나더라.

뭐 어찌어찌 하면 된다곤 하는데, 타입가지고 시간끄는건 질색이라, 그냥 Object.assign()을 사용하기로 했다.

```
const query = Object.assign(
  { code : inputData.code },
  inputData.name === "" ? {} : { name: inputData.name },
  inputData.hobby.length === 0 ? {} : { hobby: inputData.hobby }
);
```

이걸로 해결.
