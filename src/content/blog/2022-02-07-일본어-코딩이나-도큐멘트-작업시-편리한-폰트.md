---
title: "일본어 코딩이나 도큐멘트 작업시 편리한 폰트"
date: 2022-02-07
tags: ["Tech", "Tool", "폰트", "전각", "반각", "일본어", "Ricty"]
tistory_url: "https://idenrai.tistory.com/254"
---

일단 링크는 아래 참조.

**[Ricty Diminished](https://github.com/edihbrandon/RictyDiminished/)**

뭐 이래저래 장점이 있지만, 일단 가장 중요한 것은...

일본어와 영어를 병기할 때, 전각&반각의 존재로 인해 줄 맞추기가 쉽지 않다.

근데 이 폰트는 전각 : 반각 = 2 : 1 로 비율을 딱 맞춰놓아서 코드의 오와 열이 잘 맞는다.

폰트 설치 방법은 아래와 같다.

위 링크에서 코드를 ZIP으로 다운로드한다.


다운받은 폰트의 압축을 풀고,

제어판 > 데스크탑의 커스터마이즈 > 폰트

이 위치에서 다운받은 폰트를 드래그&드롭하면 끝.


이걸로 일단 컴퓨터엔 적용완료.

다음은 VSCode에 폰트를 설정해 보자.

VS Code에서 파일 > 유저 설정 > 설정 (Ctrl + ,)

settings.json에서 아래와 같이 에디터의 폰트를 적용해 주고, 한번 껐다 켜주자.

```
{
  ...,
  "editor.fontFamily": "Ricty Diminished",
  "editor.renderWhitespace": "all",
  "editor.fontSize": 14,
  ...
}
```

테스트를 해 보았다.


보다시피 줄이 아주 시원하게 잘 맞는다.

그간 줄맞추기 꽤 스트레스 받았는데, 앞으론 이거만 잘 쓰면 되겠다.
