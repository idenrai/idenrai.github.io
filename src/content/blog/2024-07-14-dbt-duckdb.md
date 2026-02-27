---
title: "dbt-duckdb"
date: 2024-07-14
description: "개요 dbt project 를 손쉽게 검증할 수 있도록 로컬 개발 환경을 구축하기 https://github.com/idenrai/templates/tree/main/dbt_duckdb_local 상세 아래의 순서로"
tags: ["Tech", "DB・SQL", "DBT", "duckdb", "local"]
tistory_url: "https://idenrai.tistory.com/294"
---

## 개요

dbt project 를 손쉽게 검증할 수 있도록 로컬 개발 환경을 구축하기

[https://github.com/idenrai/templates/tree/main/dbt\_duckdb\_local](https://github.com/idenrai/templates/tree/main/dbt_duckdb_local)

## 상세

아래의 순서로 기재

- dbt
- duckdb
- dbt project 를 작성하여, duckdb 와 연계

### dbt

[https://docs.getdbt.com/docs/core/pip-install](https://docs.getdbt.com/docs/core/pip-install)

기본적으로는 아래의 커맨드로 인스톨 가능

```
pip install dbt-core dbt-duckdb
```

#### dbt project 작성

`dbt init` 으로 프로젝트 작성

### duckdb

[https://duckdb.org/#quickinstall](https://duckdb.org/#quickinstall)

```
brew install duckdb
```

#### Create DB

아래의 커맨드로 간단히 DB 작성 가능

```
duckdb [DB 명].db
```

예시)

```
duckdb dbt_sample.db
```

#### DB 접속

```
duckdb dbt_sample.db
```

#### DB 동작 확인

CSV 파일을 읽어들여, 작성한 DB에 테이블을 만들어 준다.

여기에선 [일본 정부가 공개하는 GDP 데이터](https://www.esri.cao.go.jp/jp/sna/menu.html)를 살짝 가공한 `gdp_actual.csv` 를 사용하였다.

```
CREATE TABLE gdp_actual AS SELECT * FROM read_csv_auto('./gdp_actual.csv', all_varchar=True);
```

#### 테이블 작성 확인

duckdb에 접속하여, gdp\_actual 테이블이 작성되었고, 데이터가 제대로 들어갔는지 확인

```
select * from gdp_actual limit 10;
```

결과는 아래와 같다.

```
idenrai@idenrai dbt_duckdb_local % duckdb dbt_sample.db
v1.0.0 1f98600c2c
Enter ".help" for usage hints.
D CREATE TABLE gdp_actual AS SELECT * FROM read_csv_auto('./gdp_actual.csv', all_varchar=True);
D .tables
gdp_actual
D select * from gdp_actual limit 10;
┌─────────┬─────────┬────────────────────┬──────────────────┬───┬───────────┬───────────┬────────────────┬───────────┐
│   年    │   期    │ 国内総生産(支出側) │ 民間最終消費支出 │ … │ 民間需要  │ 公的需要  │ 総固定資本形成 │ 最終需要  │
│ varchar │ varchar │      varchar       │     varchar      │   │  varchar  │  varchar  │    varchar     │  varchar  │
├─────────┼─────────┼────────────────────┼──────────────────┼───┼───────────┼───────────┼────────────────┼───────────┤
│ 1994    │ 1-3     │ 446,305.8          │ 247,535.5        │ … │ 346,475.0 │ 115,941.7 │ 139,766.4      │ 442,252.2 │
│ 1994    │ 4-6     │ 443,741.1          │ 248,757.5        │ … │ 341,604.2 │ 118,659.5 │ 141,499.7      │ 445,537.0 │
│ 1994    │ 7-9     │ 448,941.7          │ 250,618.0        │ … │ 348,123.6 │ 117,728.3 │ 142,080.7      │ 448,137.7 │
│ 1994    │ 10-12   │ 447,166.0          │ 250,779.4        │ … │ 346,878.6 │ 117,252.3 │ 141,344.4      │ 447,576.3 │
│ 1995    │ 1-3     │ 452,111.3          │ 252,929.3        │ … │ 353,607.8 │ 116,207.3 │ 140,426.2      │ 449,533.3 │
│ 1995    │ 4-6     │ 456,273.3          │ 254,883.3        │ … │ 356,441.9 │ 118,225.5 │ 144,020.0      │ 454,595.2 │
│ 1995    │ 7-9     │ 461,705.6          │ 256,355.4        │ … │ 359,669.7 │ 122,463.0 │ 147,930.6      │ 459,107.5 │
│ 1995    │ 10-12   │ 462,856.4          │ 258,170.5        │ … │ 362,306.1 │ 122,953.3 │ 150,008.8      │ 461,222.7 │
│ 1996    │ 1-3     │ 466,624.0          │ 257,416.5        │ … │ 363,095.4 │ 126,278.8 │ 153,188.6      │ 464,149.9 │
│ 1996    │ 4-6     │ 472,490.5          │ 260,509.4        │ … │ 371,480.6 │ 125,196.8 │ 156,552.1      │ 469,053.1 │
├─────────┴─────────┴────────────────────┴──────────────────┴───┴───────────┴───────────┴────────────────┴───────────┤
│ 10 rows                                                                                       27 columns (8 shown) │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### dbt 와 duckdb 연결

#### profile 수정

dbt project (dbt\_local\_duckdb) 에, 위에서 만든 DB（dbt\_sample）를 연결

```
vi ~/.dbt/profiles.yml
```

해당하는 dbt project 에 아래의 내용을 입력

```
[dbt project name]:
  outputs:
   dev:
     type: duckdb
     path: [duckdb 에서 만든 DB 의 패스]
  target: dev
```

예시)

```
dbt_duckdb:
  outputs:
   dev:
     type: duckdb
     path: /Users/idenrai/project/templates/dbt_duckdb_local/dbt_sample.db
  target: dev
```

### dbt 기동

이 부분은 연계된 Github 를 참조하거나, 각자 모델을 작성 후 실행할 것

```
dbt run
```

결과

```
idenrai@idenrai dbt_duckdb % dbt run
09:28:27  Running with dbt=1.8.3
09:28:27  Registered adapter: duckdb=1.8.1
09:28:27  [WARNING]: Configuration paths exist in your dbt_project.yml file which do not apply to any resources.
There are 1 unused configuration paths:
- models.dbt_duckdb.example
09:28:27  Found 3 models, 9 data tests, 410 macros
09:28:27
09:28:27  Concurrency: 1 threads (target='dev')
09:28:27
09:28:27  1 of 3 START sql view model main.stg_gdp ....................................... [RUN]
09:28:27  1 of 3 OK created sql view model main.stg_gdp .................................. [OK in 0.05s]
09:28:27  2 of 3 START sql view model main.stg_gdp_year .................................. [RUN]
09:28:27  2 of 3 OK created sql view model main.stg_gdp_year ............................. [OK in 0.01s]
09:28:27  3 of 3 START sql view model main.gdp_total_info ................................ [RUN]
09:28:28  3 of 3 OK created sql view model main.gdp_total_info ........................... [OK in 0.01s]
09:28:28
09:28:28  Finished running 3 view models in 0 hours 0 minutes and 0.16 seconds (0.16s).
09:28:28
09:28:28  Completed successfully
09:28:28
09:28:28  Done. PASS=3 WARN=0 ERROR=0 SKIP=0 TOTAL=3
```

아래와 같이 테이블이 생긴 것을 확인

```
D .tables
gdp_actual      gdp_total_info  stg_gdp         stg_gdp_year
```

```
D select * from gdp_total_info;
┌─────────┬───────────────┬───────────────┬──────────────┐
│  year   │  quarter_gdp  │ year_sum_gdp  │ year_avg_gdp │
│ varchar │ decimal(38,1) │ decimal(38,1) │    double    │
├─────────┼───────────────┼───────────────┼──────────────┤
│ 1994    │      446305.8 │     1786154.6 │    446538.65 │
│ 1994    │      443741.1 │     1786154.6 │    446538.65 │
│ 1994    │      448941.7 │     1786154.6 │    446538.65 │
│ 1994    │      447166.0 │     1786154.6 │    446538.65 │
│ 1995    │      452111.3 │     1832946.6 │    458236.65 │
│ 1995    │      456273.3 │     1832946.6 │    458236.65 │
│ 1995    │      461705.6 │     1832946.6 │    458236.65 │
│ 1995    │      462856.4 │     1832946.6 │    458236.65 │
│ 1996    │      466624.0 │     1890717.6 │     472679.4 │
│ 1996    │      472490.5 │     1890717.6 │     472679.4 │
│ 1996    │      473139.9 │     1890717.6 │     472679.4 │
│ 1996    │      478463.2 │     1890717.6 │     472679.4 │
│ 1997    │      479681.6 │     1909896.9 │   477474.225 │
│ 1997    │      476013.9 │     1909896.9 │   477474.225 │
│ 1997    │      477000.1 │     1909896.9 │   477474.225 │
│ 1997    │      477201.3 │     1909896.9 │   477474.225 │
│ 1998    │      471367.0 │     1884729.0 │    471182.25 │
│ 1998    │      469284.2 │     1884729.0 │    471182.25 │
│ 1998    │      470140.8 │     1884729.0 │    471182.25 │
│ 1998    │      473937.0 │     1884729.0 │    471182.25 │
│  ·      │          ·    │         ·     │         ·    │
│  ·      │          ·    │         ·     │         ·    │
│  ·      │          ·    │         ·     │         ·    │
│ 2019    │      557732.0 │     2210661.6 │     552665.4 │
│ 2019    │      557026.8 │     2210661.6 │     552665.4 │
│ 2019    │      540743.9 │     2210661.6 │     552665.4 │
│ 2020    │      543793.2 │     2107831.6 │     526957.9 │
│ 2020    │      500626.7 │     2107831.6 │     526957.9 │
│ 2020    │      527320.3 │     2107831.6 │     526957.9 │
│ 2020    │      536091.4 │     2107831.6 │     526957.9 │
│ 2021    │      534340.0 │     2143690.0 │     535922.5 │
│ 2021    │      536964.5 │     2143690.0 │     535922.5 │
│ 2021    │      533521.7 │     2143690.0 │     535922.5 │
│ 2021    │      538863.8 │     2143690.0 │     535922.5 │
│ 2022    │      539164.8 │     2188253.1 │   547063.275 │
│ 2022    │      545292.3 │     2188253.1 │   547063.275 │
│ 2022    │      550893.0 │     2188253.1 │   547063.275 │
│ 2022    │      552903.0 │     2188253.1 │   547063.275 │
│ 2023    │      559270.9 │     2241114.5 │   560278.625 │
│ 2023    │      564406.4 │     2241114.5 │   560278.625 │
│ 2023    │      558676.3 │     2241114.5 │   560278.625 │
│ 2023    │      558760.9 │     2241114.5 │   560278.625 │
│ 2024    │      554727.9 │      554727.9 │     554727.9 │
├─────────┴───────────────┴───────────────┴──────────────┤
│ 121 rows (40 shown)                          4 columns │
└────────────────────────────────────────────────────────┘
```
