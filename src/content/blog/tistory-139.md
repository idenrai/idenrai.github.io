---
title: "Windows의 hosts에 접근하기"
date: 2017-08-17
tags: ["Tech", "Environment Setting"]
tistory_url: "https://idenrai.tistory.com/139"
---

보통 hosts에는 이하의 경로대로 접근,

관리자 모드로 파일을 열어서 허용 IP를 갱신하곤 하는데...

```
C:\Windows\System32\drivers\etc\hosts
```

가끔 host를 갱신하고 보면, 저장이 되질 않는 거지같은 현상이 발생한다.

이럴땐 그냥 Windows + R을 눌러 주고 아래의 코드를 실행해 주자.

```
powershell -NoProfile -ExecutionPolicy unrestricted -Command "start notepad C:\Windows\System32\drivers\etc\hosts -verb runas"
```

잘 열리고 잘 저장된다.
