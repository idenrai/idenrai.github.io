---
title: "BigDecimal Divide의 정밀도 설정 문제"
date: 2016-04-01
tags: ["Tech", "Java", "java", "BigDecimal", "divide"]
tistory_url: "https://idenrai.tistory.com/65"
---

**以前のコード**

```
new BigDecimal($F{mnKosoku}).divide(
new BigDecimal($F{nuTaxRate})
.multiply(new BigDecimal("100"))
.add(new BigDecimal("100"))
, 2, RoundingMode.HALF_UP)
.multiply(new BigDecimal($F{nuTaxRate})
.multiply(new BigDecimal("100")))
.setScale(0,
($F{stShohizeiHasushori}.equals("1") ? BigDecimal.ROUND_HALF_UP :
($F{stShohizeiHasushori}.equals("2") ? BigDecimal.ROUND_UP : BigDecimal.ROUND_DOWN))
)
Colored by Color Scripter
```

**修正したコード**

```
new BigDecimal($F{mnKosoku}).divide(
new BigDecimal($F{nuTaxRate})
.multiply(new BigDecimal("100"))
.add(new BigDecimal("100"))
, MathContext.DECIMAL32)
.multiply(new BigDecimal($F{nuTaxRate}).multiply(new BigDecimal("100")))
.setScale(0,
($F{stShohizeiHasushori}.equals("1") ? BigDecimal.ROUND_HALF_UP :
($F{stShohizeiHasushori}.equals("2") ? BigDecimal.ROUND_UP : BigDecimal.ROUND_DOWN))
)
Colored by Color Scripter
```

ここで問題となったのは、

```
new BigDecimal($F{mnKosoku}).divide(
// …
, MathContext.DECIMAL32)
```

この部分の「divide」の精密度の問題だった。

今までのコードでは精密度を小数点２桁までに設定してdivideをけたが、

これだと端数処理をする直前の小数点は2桁となる。

例として、

高速料：50000

税率　：0.08

として計算すると

元々は

(50000/((0.08\*100)+100))\*(0.08\*100)

\=(462.962962962...)\*8

\=3703.70370370370...

になるが、

これだと(50000/108)のところで小数点二桁になって

(50000/((0.08\*100)+100))\*(0.08\*100)

\=(462.96)\*8

\=3703.68

となってしまう。

切り捨てや切り上げの場合の危険性は少ないが、

四捨五入の場合は値の変更可能性は高くなる。

それで今回その小数点の桁数を

MathContext.DECIMAL32 (小数点6桁まで)

に修正。

これだと(50000/108)のところで小数点二桁になって

(50000/((0.08\*100)+100))\*(0.08\*100)

\=(462.962963)\*8

\=3703.703704

となる。

ここからの四捨五入だと、数値の変更は難しい。

**参考**

[java.math.BigDecimal의 바른 사용에 대해서-2](http://blog.naver.com/dlrudwjs/110038915693)
