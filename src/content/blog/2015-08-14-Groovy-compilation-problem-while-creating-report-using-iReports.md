---
title: "Groovy compilation problem while creating report using iReports"
date: 2015-08-14
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/26"
---

java.lang.NoClassDefFoundError: org/codehaus/groovy/control/CompilationFailedException

iReport는 문서의 기본 언어 설정이 Groovy로 되어 있는데,

이 때문에 위의 익셉션이 발생한다.

이를 해당 언어(아래의 경우는 자바)로 바꿔 주면 해결

