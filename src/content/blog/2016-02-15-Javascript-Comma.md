---
title: "Javascript Comma"
date: 2016-02-15
tags: ["Tech", "JavaScript", "javascript", "comma", "콤마"]
tistory_url: "https://idenrai.tistory.com/54"
---

**1\. 콤마 찍기**

```
function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
Colored by Color Scripter
```

또는

```
function comma(str) {
return str.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
Colored by Color Scripter
```

**2\. 콤마풀기**

```
function uncomma(str) {
return str.toString().replace(/[^\d]+/g, '');
}
Colored by Color Scripter
```

**3\. input box에서 사용자 입력시 바로 콤마를 찍어주기**

```
function inputNumberFormat(obj) {
obj.value = comma(uncomma(obj.value));
}

//
```

**출처**

[http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript](http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)

[http://blog.munilive.com/javascript-comma-uncomma/](http://blog.munilive.com/javascript-comma-uncomma/)
