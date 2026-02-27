---
title: "String을 받아와 포맷 변환"
date: 2015-09-10
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/30"
---

**1\. 수량 포맷 변환**

new DecimalFormat("#,###.00").format(

new BigDecimal(

Double.valueOf(

$F{noSuryo}

)

)

) + " " + $F{cdSuryoTani}

String을 Double 변환

Double을 BigDecimal로 변환

DecimalFormat으로 포맷변환

**2\. 날짜, 시간 포맷 변환**

new SimpleDateFormat("YYYY年MM月dd日").format(

new SimpleDateFormat("yyyyMMdd").parse(

$F{dtTsumi}

)

) + " 出荷"

날짜 형태의 String을 SimpleDateFormat으로 parse하여 Date 포맷으로 변환

Date를 SimpleDateFormat으로 다시 String변환

이 때, 처음 투입되는 String은 반드시 parse할 DateFormat과 동일해야 함.

당일 날짜 포맷은

new SimpleDateFormat("YYYY年MM月dd日").format(

new java.util.Date()

)

이걸로 해결.
