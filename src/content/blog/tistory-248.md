---
title: "Cognito의 UserId 취득하기"
date: 2021-07-02
tags: ["Tech", "JavaScript", "Username", "Authorization", "decode", "Cognito"]
tistory_url: "https://idenrai.tistory.com/248"
---

API개발중, 유저ID를 코그니토에서 가져오기로 했다.

일단 디코드용 코드를 대충 이런 느낌으로 만든다.

[이쪽](https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library)을 참조했다.

```
export default function (event: any): object {
  const token = event?.headers["Authorization"];
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

const atob = (base64: string) => {
  var buffer = Buffer.from(base64, 'base64');
  var utf8 = buffer.toString('utf8');
  return utf8;
};
```

왠지 atob를 쓸 수가 없어서, 그냥 만들어버렸다.

사용은 이런 느낌으로.

```
import parseAuth from '../common/AuthDecode';
...
const authInfo: any = parseAuth(event);
const userId = authInfo["cognito:username"];
```

여하튼 이걸로 해결.

**2021/09/09 추가**

위의 소스코드를 사용시, 유저에 따라선 아래와 같은 오류가 나더라.

```
VM1179:1 Uncaught URIError: URI malformed
    at decodeURIComponent ()
```

이런 경우 한번 세탁을 돌려 줄 필요가 있다.

수정한 코드는 아래와 같다.

```
export default function (event: any): object {
  const token = event?.headers["Authorization"];
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodeData = atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('');
  const utf8uri = new RegExp(
    "%[0-7][0-9A-F]|" +
    "%C[2-9A-F]%[89AB][0-9A-F]|%D[0-9A-F]%[89AB][0-9A-F]|" +
    "%E[0-F](?:%[89AB][0-9A-F]){2}|" +
    "%F[0-7](?:%[89AB][0-9A-F]){3}|" +
    "%F[89AB](?:%[89AB][0-9A-F]){4}|" +
    "%F[CD](?:%[89AB][0-9A-F]){5}", "ig"
  );
  const jsonPayload = decodeData.replace(utf8uri, function (target) { return decodeURIComponent(target); });
  return JSON.parse(jsonPayload);
}

const atob = (base64: string) => {
  var buffer = Buffer.from(base64, 'base64');
  var utf8 = buffer.toString('utf8'); // Not "ascii"
  return utf8;
};
```

**2021/09/13 추가**

디코드를 위의 방법으로 할 경우, 일본어가 깨지더라.

또 수정했다.

```
export default function (event: any): object {
  const token = event?.headers["Authorization"];
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodeData = decodeURIComponent(atob(base64));
  const utf8uri = new RegExp(
    "%[0-7][0-9A-F]|" +
    "%C[2-9A-F]%[89AB][0-9A-F]|%D[0-9A-F]%[89AB][0-9A-F]|" +
    "%E[0-F](?:%[89AB][0-9A-F]){2}|" +
    "%F[0-7](?:%[89AB][0-9A-F]){3}|" +
    "%F[89AB](?:%[89AB][0-9A-F]){4}|" +
    "%F[CD](?:%[89AB][0-9A-F]){5}", "ig"
  );
  const jsonPayload = decodeData.replace(utf8uri, function (target) { return decodeURIComponent(target); });
  return JSON.parse(jsonPayload);
}

const atob = (base64: string) => {
  var buffer = Buffer.from(base64, 'base64');
  var utf8 = buffer.toString('utf8'); // Not "ascii"
  return utf8;
};
```
