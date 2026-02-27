---
title: "get previous year in java"
date: 2016-07-05
tags: ["Tech", "Java"]
tistory_url: "https://idenrai.tistory.com/75"
---

자격 상실 후 7년 이상 지났을 경우, 해당 데이터를 삭제하는 형태의 작업을 해야 했다.

이미 SQL은 만들어져 있었기에 내가 어찌 만질 수는 없고,

그냥 자격 상실 일자가 (현재 날짜-7년)보다 오래된 경우의 데이터를 일단 뽑아내기로 했다.

parameter가 Date형식이기에, Date에서 연도 계산을 하려다가

Calendar 쪽이 더 편하게 계산할 수 있길래 그냥 이 쪽으로 선택.

```
Calendar prevYear = Calendar.getInstance();
prevYear.add(Calendar.YEAR, -7);
Date prev7year = prevYear.getTime();
```
