---
title: "DB별 결과 건수 제한"
date: 2016-07-06
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/76"
---

Oracle과 postgreSQL을 동시에 사용하는 시스템을 다루던 중,

언제나처럼 LIMIT를 써서 건수 제한을 걸었더니 에러가 뜨더라.

그래서 검색해 보니 ORACLE에는 LIMIT가 없었다...

알아본 김에 적어두었음.

```
ORACLE : SELECT * FROM TABLE WHERE ROWNUM <= 100000;
SQLServer : SELECT TOP 100000 * FROM TABLE;
postgreSQL : SELECT * FROM TABLE LIMIT 100000;
MySQL : SELECT * FROM TABLE LIMIT 100000;
```
