---
title: "iReport에서의 BigDecimal 계산"
date: 2015-10-15
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/34"
---

Sum으로 고속과세총계를 구한 상태에서, 고속도로 비용의 税抜총계를 구하는 방법

(이 때, 고속과세총계를 정의한 Value는, 지금 정의할 Value보다 jrxml상 위에 위치해야 함!)

$V{mnKosokuKazeiSokei}
.divide(
    new BigDecimal(Double.valueOf($F{nuZeiritsu}))
    .multiply(new BigDecimal("100"))
    .add(new BigDecimal("100"))
, 2, RoundingMode.HALF\_UP)
.multiply(new BigDecimal("100"))
.setScale(
    1,
        ($F{stShohizeiHasuShori}.equals("1") ? BigDecimal.ROUND\_HALF\_UP :
        ($F{stShohizeiHasuShori}.equals("2") ? BigDecimal.ROUND\_UP : BigDecimal.ROUND\_DOWN))
)

마지막 諸費税端数処理区分 처리

1 : 반올림

2 : 올림

3 : 내림
