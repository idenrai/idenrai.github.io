---
title: "Page表現"
date: 2015-10-19
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/35"
---

iReport에는 페이징이 존재하며, 당연히 그에 따라 페이지 표시 또한 가능하다.

다만 약간의 버그가 존재해서...

$V{PAGE\_COUNT}를 분명 쓰라고 만들어 놓은 것일 터인데, 전혀 먹히지 않는다.

결국 $V{PAGE\_NUMBER}로 해결해야 하는데...

그냥 함수 집어넣듯이 $V{PAGE\_NUMBER} 만을 집어넣으면 전혀 페이지 표시가 되지 않는다...

특히 1 / 20 頁 와 같은 형태로, 그것도 그룹별로 페이지를 분리해서 계산하는 것은 더더욱 답이 나오질 않는다.

**1\. 단독으로 현재 페이지 출력시**

하나의 TextField

$V{PAGE\_NUMBER} + " Page"

Evaluation Time : Now

**2\. 改頁条件이 따로 존재하지 않고, 그저 Max Column만 있는 경우**

두개의 TextField가 필요

1) $V{PAGE\_NUMBER} + " / "

Evaluation Time : Now

2) $V{PAGE\_NUMBER} + " Page"

Evaluation Time : Report

**3\. 改頁条件이 존재, 그에 따라 그룹별 페이지수 표시가 필요한 경우**

두개의 TextField가 필요

1) $V{PAGE\_NUMBER} + " / "

Evaluation Time : Page

2) $V{PAGE\_NUMBER} + " Page"

Evaluation Time : Group

Evaluation Group : 해당 그룹
