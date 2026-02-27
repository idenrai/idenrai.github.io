---
title: "MSSQL에서의 CONVERT Function 사용"
date: 2016-01-06
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/46"
---

출처 : [http://www.w3schools.com/sql/func\_convert.asp](http://www.w3schools.com/sql/func_convert.asp)

Syntax

CONVERT(_data\_type(length)_,_expression_,_style_)

Value

Description

_data\_type(length)_

Specifies the target data type (with an optional length)

_expression_

Specifies the value to be converted

_style_

Specifies the output format for the date/time (see table below)

사용예

更新日 between CONVERT(VARCHAR,DATEADD(year, -1, GetDate()),112) AND CONVERT(VARCHAR,GetDate(),112)

보통 Date형태를 Varchar로 변경하는 용도로 사용하게 되는데,

이 때 Style을 사용해 아웃풋을 조절할 수 있다.

Date의 경우

현재의 업무에서 사용하는 가장 기본적인 스타일이 12 혹은 112이다.

12 = yymmdd

112 = yyyymmdd

Time의 경우

14 or 114 = hh:mi:22:mmm (24h)

20 or 120 = yyyy-mm-dd hh:mi:ss (24h)

\# DATEADD의 경우는

[http://www.w3schools.com/sql/func\_dateadd.asp](http://www.w3schools.com/sql/func_dateadd.asp)

여기를 참고하자.
