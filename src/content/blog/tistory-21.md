---
title: "Oracle / MSSQL String-Date 형태변환"
date: 2015-07-23
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/21"
---

_**ORACLE**_

\- VARCHAR-> DATE

TO\_DATE( String값, 'yyyymmdd')

ex) TO\_DATE( '20120704', 'yyyymmdd')

\- DATE -> VARCHAR

TO\_CHAR(DATE필드, 'yyyymmdd')  
ex) TO\_CHAR( REG\_DATE, 'yyyymmdd')

_**MSSQL**_

\- VARCHAR -> DATETIME

CONVERT( DATETIME,String값)  
ex) CONVERT( DATETIME, '20120704')

\- DATETIME -> VARCHAR

CONVERT (VARCHAR , DATETIME필드, 112)  
ex) CONVERT( VARCHAR, REG\_DATE, 112 )

출처:[DATE/VARCHAR 변환 (oracle vs mssql)](http://iris2380.egloos.com/147167)
