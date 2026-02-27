---
title: "Oracle BLOB타입 Image 출력"
date: 2015-09-24
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/31"
---

**Oracle (DB)**

(BLOB)

**JAVA (Form)**

**Entity**

public byte\[\] ifKaishaLogo;

**Getter**

public byte\[\] getIfKaishaLogo() {

return ifKaishaLogo;

}

**iReport**

**Field**

**\- Field Class**

ifKaishaLogo

**\- Field Class**

java.lang.Object

**Image Property**

**\- Image Expression**

net.sf.jasperreports.engine.util.JRImageLoader.loadImage((byte\[\]) $F{ifKaishaLogo})

**\- Expression Class**

java.awt.Image

**※** **java.awt.Image**로 설정 및 컴파일 후 다시 jrxml파일을 열어보면 **java.lang.String**이 되어 있다.

이점 유의하여 매번 확인하고 다시 수정할 것.
