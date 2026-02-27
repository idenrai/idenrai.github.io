---
title: "Athena, Redshift에서의 CSV 줄바꿈 미대응 문제"
date: 2022-10-20
tags: ["Tech", "AWS for Data Engineering", "CSV", "tableau", "athena", "multiline", "redshift", "Parquet", "Glue"]
tistory_url: "https://idenrai.tistory.com/267"
---

현재 아래의 동작을 검증 중이다.

1.  KMS 커스토머 관리 키 생성 및 Glue Data Catalog 암호화
2.  KMS키로 암호화한 S3 Bucket에 원본 데이터 투입
3.  Glue Jobs로 데이터 조작 및 클렌징
4.  결과물을 암호화한 다른 Bucket에 격납
5.  Glue Crawler로 결과물 긁어와서 Glue Data Catalog에 투입
6.  Data Catalog에 생성된 테이블의 데이터를 Athena로 확인
7.  데이터가 정상적으로 확인되면 Redshift 경유로 Tableau에 연결

JSON형식의 뉴스 기사를 CSV로 출력하여 크롤러로 긁어서 6까지 왔는데...

아테나가 뉴스 본문의 줄바꿈에 대응을 해주지 않고, 그냥 데이터 한줄씩 땡겨버리드라.

이게 아테나만 그런거면 그냥 무시해도 되는데, 7도 마찬가지다.

아무래도 그냥 공통적으로 그런거같으니, 일단 아테나에서 잘 돌아가면 다른데서도 잘 돌아갈 듯.

검색해보니 아래와 같은 느낌.

[https://repost.aws/questions/QUwL\_lVp85TPe-i3VP6jcU\_A/athena-not-able-to-read-multi-line-text-in-csv-fields](https://repost.aws/questions/QUwL_lVp85TPe-i3VP6jcU_A/athena-not-able-to-read-multi-line-text-in-csv-fields)

[

Athena not able to read multi-line text in CSV fields | AWS re:Post

I've this CSV content file "one","two","three","four","five","six","seven","eight","nine","ten" "one","two","three","four","five \\" quote \\" five2","six","seven","eight","nine","ten" "one","two"...

repost.aws

](https://repost.aws/questions/QUwL_lVp85TPe-i3VP6jcU_A/athena-not-able-to-read-multi-line-text-in-csv-fields)

아테나는 CSV에 그런거 안해주니까 그냥 Parquet으로 하랜다.

[https://yohei-a.hatenablog.jp/entry/20191015/1571066002](https://yohei-a.hatenablog.jp/entry/20191015/1571066002)

[

Athena で改行を含む CSV を扱いたい場合は Glue ジョブで Parquet に変換する - ablog

データの中身に改行を含む CSV を Athena でクエリすると正しく扱えなかったが、Glue ジョブで CSV を Parquet に変換すると改行を含むデータを扱うことができた。おそらく OpenCSVSerDe は改行に対応

yohei-a.hatenablog.jp

](https://yohei-a.hatenablog.jp/entry/20191015/1571066002)

마침 나도 출력 데이터의 형식은 상관없고, 그냥 Data Catalog에서만 잘 인식되면 되니까, Glue Job에서 Parquet으로 출력해버렸다.

```
S3bucket_node3 = glueContext.write_dynamic_frame.from_options(
    frame=ApplyMapping_node2,
    connection_type="s3",
    format="glueparquet",
    connection_options={
        "path": "s3://output/news/",
        "partitionKeys": [],
    },
    format_options={"compression": "snappy"},
    transformation_ctx="S3bucket_node3",
)
```

크롤러로 다시 긁어서, Athena와 Redshift, Tableau로 확인해보니 잘 돌아간다.
