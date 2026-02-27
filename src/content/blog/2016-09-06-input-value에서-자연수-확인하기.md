---
title: "input value에서 자연수 확인하기"
date: 2016-09-06
tags: ["Tech", "JavaScript"]
tistory_url: "https://idenrai.tistory.com/88"
---

자연수만 받아야 하는 항목이 있는데...

HTML5를 쓰고 있으니, 아래 설정만으로 될 것이라 생각했다.

```
<input type="number" className="form-control" step="1" min="1" id="limit" placeholder="最大件数" />
```

근데 그냥 깔끔하게 안되더라.

크롬에서는 input type number만 먹히고

IE와 파이어폭스에서는 아예 뭐 되는게 없더라.

프레임워크랑 겹쳐서 그래 된건지 뭔지 영문은 모르겠는데

여하튼 그냥 안된다...

리더랑 상담한 끝에 그냥 값 다 받고 Validate에서 에러메세지 띄우는 쪽으로 해결봤다.

onChange같은거 쓰기 싫다고 하길래...

```
if (param.formValue.limit!=null && param.formValue.limit!=undefined && param.formValue.limit!=""){
var limitValue = !isNaN(param.formValue.limit) && (function(x) { return (x | 0) === x; })(parseFloat(param.formValue.limit));
if (!(limitValue) || param.formValue.limit <= 0) {
$('.balloon-zone-limit').addClass('check-balloon').html(i18n.get('App.Validate.limit.belowZero')).fadeIn('slow');
is_error = true;
}else{
$('.balloon-zone-limit').removeClass('check-balloon').html('').fadeOut('slow');
};
} else {
$('.balloon-zone-limit').addClass('check-balloon').html(i18n.get('App.Validate.limit.empty')).fadeIn('slow');
is_error = true;
};
Colored by Color Scripter
```

**참고**

[How to check if a variable is an integer in JavaScript?](http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript)
