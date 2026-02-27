---
title: "문자열에서 개인번호 검출"
date: 2016-08-02
tags: ["Tech", "JavaScript"]
tistory_url: "https://idenrai.tistory.com/82"
---

요즘 보험과 연계된 개인번호(일본판 주민번호) 입력 화면을 만드는 중인데,

이 개인번호라는 것이 일단 우리나라 주민번호처럼 일정 패턴을 가지고 있더라.

패턴 자체야 뭐 중요한 것은 아니니 넘어가고...

여하튼 어제의 업무를 잠시 설명하자면-

1\. 입력 화면에서 개인번호를 입력받아, 개인번호 형식이 맞는지를 확인한다.

2\. 올바른 패턴이라면 다음 화면으로 이동

3\. 개인번호와 그외 정보를 연관지어 확인 화면을 띄움

4\. 확인 화면상에서 업무용 메모를 입력 후, 확인 버튼을 누르면 입력 완료.

라는 것인데...

**이용자에 따라선 이 「업무용 메모」란에 개인번호를 넣어버리는 경우가 있다고 하니, 이를 방지할 필요가 있다**

는 것이 오늘의 포스팅 내용이다.

**목표**

\- 입력된 업무용 메모를 받아, 그 문자열 내에 개인번호와 동일한 패턴의 숫자가 있는지 확인

**조건**

\- 개인번호는 12자리의 숫자로 이루어져 있으며, 일정 패턴을 지닌다.

\- 12보다 짧거나 길 경우의 숫자는 무시한다.

\- 올바른 패턴의 12숫자일지라도, 중간에 줄바꿈이 들어갈 경우는 다른 문자로 친다.

```
function validateMemoValue(param) {
return new Promise(function(resolve, reject) {
// 에러메세지 초기화
$('.balloon-zone').removeClass('check-balloon').html('').fadeOut('slow');

// 업무용 메모에 입력치가 있을 경우
if (param.memo.length > 0) {
var str;
// 0-9이외의 모든 문자를 「,」로 변환 후, 「,」를 기준으로 쪼갬
// 이를 통해, 숫자로만 이루어진 문자열이 배열로 str에 들어감
str = param.memo.replace(/[^0-9]/g,",").split(",");

// 각 문자열을 for로 돌림
for (var i = 0; i < str.length; i++) {
var num = str[i];

// 12자리의 숫자라면
if (num.length==12) {

// 패턴 구하기

// 패턴과 일치할 경우 에러메세지를 출력 후 reject
if ( /*패턴과 일치할 경우*/ ) {
$('.balloon-zone').addClass('check-balloon').html(msg.get('include.personal.num')).fadeIn('slow');
reject(param);
}
}
}
}
resolve(param);
});
}
Colored by Color Scripter
```
