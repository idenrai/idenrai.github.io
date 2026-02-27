---
title: "jQuery Class제어"
date: 2015-07-29
tags: ["Tech", "JavaScript", "javascript", "addClass", "removeClass", "hasClass"]
tistory_url: "https://idenrai.tistory.com/22"
---

**1\. class 추가 - addClass**

다음은 dv라는 div에 B라는 class명을 추가한다.

```
<script>
function addCls(){
$("#dv").addClass("B") ;
}
</script>

<div id="dv" class="A">
테스트
</div>

<input type="button" value="클래스 변경" onClick="addCls();">
```

위의 경우 액션이 일어났을때의 div의 최종 클래스는 A B가 된다. 즉

형태로 추가된다.

**2\. class 추가 - removeClass** 다음은 dv라는 div에 A라는 class명을 삭제한다.

```
<script>
function delCls(){
$("#dv").removeClass("A") ;
}
</script>

<div id="dv" class="A">
테스트
</div>

<input type="button" value="클래스 삭제" onClick="delCls();">
```

removeClass 사용시 클래스명을 지정하지 않을시 해당 객체의 전체 클래스를 삭제한다 = $("#dv").removeClass() ;

**\[TIP\]class 삭제 후 다른 클래스 추가 시 $("#dv").removeClass("A").addClass("B") 으로 표현할 수 있다.**

**3\. class 존재여부 확인 - hasClass** 특정 class가 존재하는지 확인이 가능하다. hasClass 이용시 리턴되는 값은 true/false 이다.

```
<script>
function chkCls(){
if($("#dv").hasClass("A"))
alert("A 클래스 존재");
else
alert("A 클래스 존재안함");
}
</script>

<div id="dv" class="A">
테스트
</div>

<input type="button" value="클래스 체크" onClick="chkCls();">
```

출처 : **http://fruitdev.tistory.com/138**
