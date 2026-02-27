---
title: "sync-settings : Atom Package Setting Backup"
date: 2017-05-11
tags: ["Tech", "Tool"]
tistory_url: "https://idenrai.tistory.com/129"
---

Atom으로 개발을 하다 보면, 어느샌가 package가 하나둘씩 늘어나 나중가면 기억하기도 힘들 정도가 된다.

이번에 우분투에서 개발환경 세팅을 할 일이 있어, 기존의 패키지 세팅을 백업하고자 이래저래 알아보니

**Sync Settings**

라는 Atom Package가 있더라.

원리는 Package Setting을 Github Gist에 저장해 두는 것.

실행 과정은 다음과 같다.

**1\. 백업할 Atom에 sync-settings package를 설치**

**2\. 자신의 Github에서 [Access Token 발행](https://github.com/settings/tokens/new)**

Select scopes는 gist에만 체크하도록 한다.

해당 토큰은 단 한번만 볼 수 있으므로, 어딘가에 잘 적어둘 것.

혹시 까먹게 된다면 Regenerate를 하거나 새 토큰을 만들 수 밖에 없다.

누구나 이 토큰을 통해 내 gist를 마음대로 만질 수 있으므로, 절대 남에게 보여줘선 안된다.

**3\. [새로운 Gist 생성](https://gist.github.com/)**

제목이나 내용은 마음대로 적으면 된다.

생성된 gist의 url에서 Gist id를 획득한다.

https://gist.github.com/\[유저명\]/\[Gist id\]

**4\. sync-settings에 Token과 Gist id 입력**

**5\. 재시작하여 sync-settings Backup 실행**

**6\. Package Setting을 복사할 Atom에서 sync-settings 설치 및 Token과 Gist id 입력**

**7\. 재시작하여 Restore를 실행하면 자동으로 백업된 Package Setting이 설치됨**
