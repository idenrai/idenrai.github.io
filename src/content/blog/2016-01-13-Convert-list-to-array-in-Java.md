---
title: "Convert list to array in Java"
date: 2016-01-13
tags: ["Tech", "Java", "java", "toArray"]
tistory_url: "https://idenrai.tistory.com/48"
---

Javascript ⇒ JAVA ⇒ Oracle Stored Procedure

위의 흐름대로 배열을 전송하던 중,

Javascript의 배열을 JAVA에서 List로 받고 보니...

해당 배열을 프로시저로 보내는 과정에서

String Array로 바꾸어야 하더라.

다른 방법도 있었겠지만, 일단 내가 찾아본 바로는

JAVA에서 프로시저로 리스트를 넘기는 방법이

[이런 방법](http://viralpatel.net/blogs/java-passing-array-to-oracle-stored-procedure/) 뿐이었다.

하여, List을 String\[\] 로 바꾸려고 해 보니,

toArray()를 써서 간단하게 바꿀 수 있었다.

사용 예시는 다음과 같다.

List strList \= new ArrayList();

일 때,

// List의 사이즈만큼 Array의 크기 지정 후 toArray()

String\[\] strArray \= strList.toArray(new String\[strList.size()\]);

또는

// Array의 크기가 List보다 작을 경우, 자동으로 크기가 변환되는 것을 이용한

String\[\] strArray \= strList.toArray(new String\[0\]);
