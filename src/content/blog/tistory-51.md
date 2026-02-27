---
title: "How to parse comma delimited string in PL/SQL"
date: 2016-01-14
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/51"
---

[List를 콤마로 구분한 String으로 만들어](http://idenrai.tistory.com/50),

이를 VARCHAR2 Parameter로 Oracle Stored Procedure로 전송하였다.

이제는 이를 Procedure내에서 파싱할 차례.

i\_cdDataList라는 이름으로 해당 String을 받아왔다.

이를 커서에 넣어서 LOOP로 돌리기로 하였고,

결론적으론 CD\_DATA라는 이름으로 데이터를 뽑아낼 수 있다.

```
-- データリスト
CURSOR CUR_CD_DATA_LIST IS
SELECT
CD_DATA -- データ
FROM (
SELECT
TRIM (REGEXP_SUBSTR (CD_DATA_LIST, '[^,]+', 1, LEVEL)) AS CD_DATA
FROM (
SELECT
i_cdDataList AS CD_DATA_LIST -- データリスト
FROM
DUAL
)
CONNECT BY
LEVEL <= regexp_count (CD_DATA_LIST, ',', 1) + 1
)
WHERE
CD_DATA IS NOT NULL
;

REC_CD_DATA_LIST CUR_CD_DATA_LIST%ROWTYPE;

Colored by Color Scripter
```

당장 프로시저를 돌려서 확인할 수는 없는 노릇이라

일단 SELECT문만 떼서 돌려 보았다.

테스트 데이터는

'aaaaaaaaa,bbbbbbbbbbbbbbb,cccccccccc,ddddddddddddd,eeeeeeeee'

이다.


실제 커서를 돌릴 때의 코드는 다음과 같다.

```
PROCEDURE CHK_CD_DATA_LIST
-- データが一致するか確認
-- 入ってなかったら対象外フラグを"1"にする
```

간단히 내용을 설명하자면,

커서를 돌리기 전, 프로시저의 다른 부분에서 SELECT문을 돌려 g\_ifData에 값을 받아온다.

g\_ifData와, 커서를 돌려 나온 g\_cdData를 비교하여,

일치하지 않을 경우 대상외플래그(g\_fgNoData)를 세운다.

String으로 보내는게 맘에 들지 않을 경우, [이런 방법](http://viralpatel.net/blogs/java-passing-array-to-oracle-stored-procedure/)도 있다.
