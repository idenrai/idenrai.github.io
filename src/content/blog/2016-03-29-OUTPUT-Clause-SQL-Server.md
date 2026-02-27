---
title: "OUTPUT Clause (SQL Server)"
date: 2016-03-29
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/64"
---

요즘 販売管理 관련 솔루션을 만지고 있는데,

주문서 작성 페이지를 다루는 과정에서

주문서 테이블과 주문서(상세) 테이블에 한번에 데이터를 집어넣는 동작을 넣어야 했다.

주문서 테이블과 그에 해당하는 상세 테이블을 연결지을 키가 필요한데

Update면 상관없지만, Insert의 경우 採番マスタ가 없어서 조금 애매하게 되었다.

데이터를 그냥 싸그리 모아서 두 테이블에 한번에 집어넣는게 가장 단순무식하긴 한데...

상세 테이블 입력창이 너무 많기도 하고 내가 귀찮기도 해서

그냥 테이블을 긁어서 배열로 만들어 JSON으로 넘기려던 중이었기에

이 짓을 다시 하려니 너무 승질나더라.

분명 방금 입력한 애를 뽑아올 방법이 있을거라 생각해서 살펴보니

**OUTPUT**이라는 애가 있었다!

일단 자세한 설명은 다음과 같다.

[OUTPUT Clause (Transact-SQL](https://msdn.microsoft.com/en-us/library/ms177564.aspx)[)](https://msdn.microsoft.com/en-us/library/ms177564.aspx)

잘 정리된 자료는 이곳에.

[A Beginner's Guide to the OUTPUT Clause in SQL Server](http://www.tech-recipes.com/rx/47032/a-beginners-guide-to-the-output-clause-in-sql-server/)

한때 유행하던 3줄요약으로 설명을 하자면,

1\. deleted : 수정 전의 데이터를 갖고 있는 테이블

2\. inserted : 수정 후의 데이터를 갖고 있는 테이블

3\. OUTPUT절을 통해 이 두 가지 테이블에 접근할 수 있다.

이거 덕분에

일단 주문서 테이블에 Insert를 하고

그 때 딴 키 (注文番号, 注文番号枝番) 를 OUTPUT으로 뽑아내 리턴시켜서

그 키를 가지고 상세 테이블에 데이터를 집어넣을 수 있었다.

일단 OUTPUT을 써먹은 코드는 대강 이런 느낌이다.

```
INSERT INTO INDENT (
注文番号
-- 이하생략
)
OUTPUT
INSERTED.注文番号

VALUES (
(SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SELECT CONVERT(VARCHAR, ISNULL(MAX(CONVERT(NUMERIC, [注文番号])),0)+1) FROM INDENT)
-- 이하생략
)
Colored by Color Scripter
```

이러면 마치 SELECT문을 날린 것 마냥

새로 입력된 注文番号가 나온다.
