---
title: "DB Pilot"
date: 2024-08-24
description: "개요 DuckDB 의 GUI 클라이언트를 찾던 중, 아래의 클라이언트를 발견 DB Pilot DB Browser for SQLite 대용으로 사용할 수 있을 듯 상세 설치 아래에서 다운로드 및 설치할 것 DB Pil"
tags: ["Tool", "db pilot", "duckdb", "gui client"]
tistory_url: "https://idenrai.tistory.com/296"
---

## 개요

DuckDB 의 GUI 클라이언트를 찾던 중, 아래의 클라이언트를 발견

[DB Pilot](https://www.dbpilot.io/duckdb)

[DB Browser for SQLite](https://sqlitebrowser.org/) 대용으로 사용할 수 있을 듯

## 상세

### 설치

아래에서 다운로드 및 설치할 것

[DB Pilot](https://www.dbpilot.io/duckdb)

-   현재로서는 Mac 에만 대응하는 듯
-   테이블/뷰의 열람과 SQL 쿼리 이외의 기능을 사용하기 위해서는 과금이 필요
-   좀 더 여러가지 기능을 원한다면, [DBeaver](https://dbeaver.io/) 도 DuckDB 에 대응하고 있다
    -   DuckDB 공식 도큐먼트에서도 이쪽을 제시하고 있음
    -   [DBeaver SQL IDE](https://duckdb.org/docs/guides/sql_editors/dbeaver.html)

### 간단한 사용법

![](https://blog.kakaocdn.net/dn/8nsgH/btsJfo3FhXN/FnhMkpbZWSkZimC07geWO0/img.png)

DuckDB 이외의 DB 도 제공

![](https://blog.kakaocdn.net/dn/oN6Xq/btsJdymLnFK/kflekzxG0wcMFXCPNmUfzK/img.png)

![](https://blog.kakaocdn.net/dn/bEVX0U/btsJdRl6sPw/8HkzNVNfDs5Bd4SnP5EIXk/img.png)

내 경우는 기존 DB를 설정 [https://github.com/idenrai/templates/tree/main/dbt\_duckdb\_local](https://github.com/idenrai/templates/tree/main/dbt_duckdb_local)

![](https://blog.kakaocdn.net/dn/bB2YYE/btsJd64qxhm/cJ77XLgI81pNNm8AoLZyxk/img.png)

![](https://blog.kakaocdn.net/dn/IM2qa/btsJfmY5UWk/bFiv3uhYblca56k1sbtd8K/img.png)

테이블/뷰의 열람과 SQL 쿼리의 실행이 가능

![](https://blog.kakaocdn.net/dn/VIk0d/btsJdn6v6lV/elv2ICr7gNGh5dShK1YK6k/img.png)
