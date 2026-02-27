---
title: "Glue Crawler로 쌍따옴표가 포함된 CSV파일 읽기"
date: 2023-02-14
tags: ["Tech", "AWS for Data Engineering", "콤마", "쌍따옴표", "Serde", "glue"]
tistory_url: "https://idenrai.tistory.com/271"
---

Glue Crawler로 대충 아래와 같은 데이터를 읽어와야 했다.


대충 Crawler를 만들어 돌려 보니, Athena에서 이렇게 표시되더라.


쌍따옴표 안의 자릿수 콤마를 그냥 무식하게 나눠버린 것.

일단 해결책은 아래와 같다.

[https://docs.aws.amazon.com/ko\_kr/athena/latest/ug/glue-best-practices.html#schema-csv-quotes](https://docs.aws.amazon.com/ko_kr/athena/latest/ug/glue-best-practices.html#schema-csv-quotes)

[

Athena와 AWS Glue를 함께 사용하는 모범 사례 - Amazon Athena

Athena와 AWS Glue를 함께 사용하는 모범 사례 AWS Glue 데이터 카탈로그와 함께 Athena를 사용하면 AWS Glue를 사용하여 Athena에서 쿼리할 데이터베이스와 테이블(스키마)을 만들거나, Athena를 사용하여 스

docs.aws.amazon.com

](https://docs.aws.amazon.com/ko_kr/athena/latest/ug/glue-best-practices.html#schema-csv-quotes)

Glue Console에서도 간단하게 대응 가능하니, 좌절하지 말고 이것만 넣어주자.

테이블 화면에서 Actions -> Manage -> Edit table 선택


각 항목에 이하 입력

\- Serialization lib: org.apache.hadoop.hive.serde2.OpenCSVSerde

\- Serde parameters:

\- escapeChar: \\

\- quoteChar: "

\- separatorChar: ,


저장하고 바로 Athena로 돌아와 Select돌려보면 제대로 나온다.

