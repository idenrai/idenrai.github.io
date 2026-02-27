---
title: "테이블 복사 쿼리"
date: 2016-06-28
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/72"
---

**1\. Oracle**

\- 테이블 전체 복사 : CREATE TABLE \[새 테이블명\] AS SELECT \* FROM \[복사할 테이블명\]

\- 테이블 일부 복사 : CREATE TABLE \[새 테이블명\] AS SELECT \[칼럼1\], \[칼럼2\], … FROM \[복사할 테이블명\] WHERE \[기타 조건\]

\- 테이블 구조만 복사 : CREATE TABLE \[새 테이블명\] AS SELECT \* FROM \[복사할 테이블명\] WHERE 0=1;

**2\. SQL Server**

\- 테이블 전체 복사 : SELECT \* INTO \[새 테이블명\] FROM \[복사할 테이블명\]

\- 테이블 일부 복사 : SELECT \[칼럼1\], \[칼럼2\], … INTO \[새 테이블명\] FROM \[복사할 테이블명\] WHERE \[기타 조건\]

\- 테이블 구조만 복사 : SELECT \* INTO \[새 테이블명\] FROM \[복사할 테이블명\] WHERE 1=0
