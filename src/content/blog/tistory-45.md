---
title: "Property의 적용"
date: 2015-12-22
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/45"
---

iReport에서는 문자가 해당 Text Field의 범위를 넘어설 경우,

기본적으로는 Text Field의 크기만큼의 문자가 출력된다.

(라고 알고 있었다.)

그러나 이렇게 문자별로 자르는 것은 어디까지나 전각(한자, 가나, 한글 등)과 숫자에 한해서이며,

영문의 경우는 단어별(띄어쓰기로 구분)로 자른다.

즉, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"와 같은 테스트 데이터가 입력되었을 경우,

해당 데이터가 들어갈 필드가 이 데이터보다 작아서 데이터 맨 뒤의 aaaa 정도가 잘린다고 칠 경우,

이 텍스트, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"는 전부! 출력되지 않는다...

데이터가 "テストですaaaaaaaaaaaaaaaaaaaaaaaaaa"와 같은 경우도 마찬가지라,

뒤의 aaaa가 잘린다 치면,

テストです까지만 출력되며, 뒤의 aaaaaaaaaaaaaaaaaaaaaaaaaa는 절대 출력되지 않는다.

이는, iReport Property의 net.sf.jasperreports.text.truncate.at.char가

기본적으로 false로 설정되어 있기 때문이다.

net.sf.jasperreports.text.truncate.at.char의 간단한 설명이다.

-   Flag that determines whether text elements are to be truncated at the last character that fits. By default, when the entire text of a text element does not fit the element's area, the text is truncated at the last word that fits the area.

즉, 얘를 True로 설정하는 것 만으로 반각 영어 또한 char단위로 끊어진다는 것이다.

프로퍼티 설정법은 다음과 같다.

1\. 페이지 설정에서 프로퍼티 항목 선택

2\. ADD (Add/modify property)

3\. net.sf.jasperreports.text.truncate.at.char 선택 (더블클릭)

4\. Property Name : net.sf.jasperreports.text.truncate.at.char

Property Value : true

5\. OK (Add/modify property창 종료)

6\. Property창에서 확인

net.sf.jasperreports.text.truncate.suffix

net.sf.jasperreports.text.truncate.suffix

text overflow일 때, 내용이 잘림을 표현하기 위한 특정 문자 설정 가능

ex) ... 등

기본적인 설정법은 동일하나,

Property Value에 원하는 문자를 넣으면 된다.

예를 들자면 ...의 경우, "..."을 넣는 것으로 OK.

참고 : [http://community.jaspersoft.com/wiki/properties-how-use-additional-properties-build-enhanced-reports](http://community.jaspersoft.com/wiki/properties-how-use-additional-properties-build-enhanced-reports)
