---
title: "HTML5 input type number에서의 maxlength 적용"
date: 2016-09-21
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/93"
---

입력란에 글자제한을 걸어달라는 요구가 있었다.

그냥 maxlength 하나만 걸면 되니 뭐 어려울 것도 없지 싶었는데...

분명 maxlength="4"가 들어가 있는데 그냥 뭐 글자가 일렬로 쑥쑥 들어간다.

가만 보니 input type이 number더라...

가뜩이나 지금 환경에서 HTML5가 안먹혀서 돌아버릴것 같은데

이 븅신같은 input number는 대체 왜 집어넣었을까...하고 후회하면서 몇가지를 시도해 보았다.

일단 HTML5 안에서 해결해 보고자 max="9999"를 넣었지만, 역시나 안먹히고...

input type을 text로 바꾸고 pattern을 넣어봤지만 역시나 안먹힌다.

결국 해결한 방법은 이것.

보통은 그냥 아래의 참고에서처럼 바로 집어넣으면 되는데,

현재 개발환경에서는 요상하게 컴포넌트 내에 바로 attr을 집어넣으면 안먹혀서

일단 renderModal을 해 놓고 나서 attr을 우겨넣고 있다.

```
function attrInfo(param) {
return new Promise(function(resolve, reject) {
$('#' + param.id + ' .code').attr('maxlength', 4);
$('#' + param.id + ' .code').attr('oninput', "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
resolve(param);
});
}
Colored by Color Scripter
```

※ 참고 : [maxlength ignored for input type=“number” in Chrome](http://stackoverflow.com/questions/18510845/maxlength-ignored-for-input-type-number-in-chrome)
