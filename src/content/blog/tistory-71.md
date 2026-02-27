---
title: "자바스크립트에서의 소수점 제어"
date: 2016-06-23
tags: ["Tech", "JavaScript"]
tistory_url: "https://idenrai.tistory.com/71"
---

**1\. toFixed()**

원하는 소수점 길이만큼 반올림해서 리턴

```
var num = 123.456789;

num.toFixed(0); // 123
num.toFixed(5); // 123.45679
```

**2\. Math**

소수점 부분을 처리하고 정수만을 획득

**Math.ceil()** : 올림

**Math.floor()** : 버림

**Math.round()** : 반올림

```
var num = 0.5;

Math.ceil(num); // 1
Math.floor(num); // 0
Math.round(num); // 1
```
