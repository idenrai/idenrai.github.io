---
title: "Using encoded image in background-image"
date: 2016-12-05
tags: ["Tech", "HTML・CSS"]
tistory_url: "https://idenrai.tistory.com/100"
---

**1\. 이미지를 Base64로 인코딩**

이미지를 Base64로 변환해 주는 사이트는 검색만 하면 다 나오긴 하는데...

몇군데 찾아보니, [여기](https://www.base64-image.de/)가 가장 깔끔한 것 같다.

(1MB이상의 파일은 인코딩 불가)

**2\. 인코딩한 이미지를 CSS에 집어넣기**

그냥 아래와 같이 때려넣으면 된다.

```
.target {
background-image: url('data:image/png;base64, 인코딩한 이미지 소스');
}
Colored by Color Scripter
```

실제 적용된 코드는 다음과 같다.

```
.dropdown-content {
position: static;
height: auto;
width: 280px;
background-image: url('data:image/png;base64,iVBORA...lR6BEIN') !important;
background-repeat: no-repeat !important;
background-position: right 10px bottom 10px;
background-size: 30% !important;
}
Colored by Color Scripter
```

그간 image파일을 그냥 폴더에 때려넣고 경로를 지정해 왔는데...

이번에 제작한 컴포넌트의 경우는 어차피 CSS를 세트로 작성해야 해서

그냥 CSS에 background-image를 인코딩해서 집어넣는게 낫다는 결론이 나왔다.

새로운 이미지 추가 시 인코딩하기 귀찮을 것 같아서 조금 꺼려지긴 했는데...

막상 해보니 금방 되기도 하길래, 앞으론 별 일 없으면 그냥 이 방법을 쓰게 될 것 같다.
