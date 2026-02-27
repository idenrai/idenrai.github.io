---
title: "Pandas를 이용한 데이터 추출"
date: 2022-05-27
tags: ["Tech", "Python", "CSV", "pandas"]
tistory_url: "https://idenrai.tistory.com/261"
---

# Pandas

## Pandas Dataframe

-   2차원의 데이터에 대응하는 데이터 구조
-   열&행으로 데이터 추출 가능
-   1행 or 1열의 정보는 series에 대응

## Pandas read\_html

지정한 URL상의 table태그를 가져옴

pd.read\_html(url, 그외 임의의 인수)

인수

필수/임의

설명

URL

필수

읽기 대상의 URL

header

임의

헤더에 지정하는 행 지정

index\_col

임의

인덱스에 지정하는 열 지정

skiprows

임의

읽지 않는 행수

반환값

-   DataFrame 리스트

## Yahoo Finance에서 일본주 랭킹 가져오기

```python
import pandas as pd
```

```python
url = "https://info.finance.yahoo.co.jp/ranking/?kd=4"
```

```python
data = pd.read_html(url,header=0)
```

### 상위 5개 항목

```python
data[0].head()
```

.dataframe tbody tr th:only-of-type { vertical-align: middle; } <pre><code>.dataframe tbody tr th { vertical-align: top; } .dataframe thead th { text-align: right; }</code></pre><p>

順位

名称・コード・市場

取引値

発行済み株式数

時価総額(百万円)

単元株数

0

1

トヨタ自動車(株)7203東証PRM掲示板

2,08415:00

16,314,987,460株

34,000,434百万円

100

1

2

日本電信電話(株)9432東証PRM掲示板

3,99615:00

3,622,012,656株

14,473,563百万円

100

2

3

ソニーグループ(株)6758東証PRM掲示板

11,42515:00

1,261,081,781株

14,407,859百万円

100

3

4

(株)キーエンス6861東証PRM掲示板

49,05015:00

243,207,684株

11,929,337百万円

100

4

5

ＫＤＤＩ(株)9433東証PRM掲示板

4,54415:00

2,304,179,550株

10,470,192百万円

100

### 하위 5개 항목

```python
data[0].tail()
```

.dataframe tbody tr th:only-of-type { vertical-align: middle; } <pre><code>.dataframe tbody tr th { vertical-align: top; } .dataframe thead th { text-align: right; }</code></pre><p>

順位

名称・コード・市場

取引値

発行済み株式数

時価総額(百万円)

単元株数

45

46

コマツ6301東証PRM掲示板

3,18215:00

973,145,800株

3,096,550百万円

100

46

47

オリックス(株)8591東証PRM掲示板

2,42115:00

1,258,277,087株

3,046,289百万円

100

47

48

三菱電機(株)6503東証PRM掲示板

1,38115:00

2,147,201,551株

2,965,285百万円

100

48

49

ルネサスエレクトロニクス(株)6723東証PRM掲示板

1,49115:00

1,948,507,856株

2,905,225百万円

100

49

50

パナソニック　ホールディングス(株)6752東証PRM掲示板

1,179.515:00

2,453,866,297株

2,894,335百万円

100

### 매매가 수정

문자열 자르기를 통해, 가격과 시간이 붙어있는 문제 해결

이를 응용하여, 수치나 DateTime 등도 수정 가능

```python
data[0]["値"] = [i[:-5] for i in data[0]["取引値"]]
data[0]["基準時間"] = [i[-5:] for i in data[0]["取引値"]]
data[0]["名称"] = [i[:-12] for i in data[0]["名称・コード・市場"]]
data[0]["コード"] = [i[-12:][:-8] for i in data[0]["名称・コード・市場"]]
```

```python
data[0].head()
```

.dataframe tbody tr th:only-of-type { vertical-align: middle; } <pre><code>.dataframe tbody tr th { vertical-align: top; } .dataframe thead th { text-align: right; }</code></pre><p>

順位

名称・コード・市場

取引値

発行済み株式数

時価総額(百万円)

単元株数

値

基準時間

名称

コード

0

1

トヨタ自動車(株)7203東証PRM掲示板

2,08415:00

16,314,987,460株

34,000,434百万円

100

2,084

15:00

トヨタ自動車(株)

7203

1

2

日本電信電話(株)9432東証PRM掲示板

3,99615:00

3,622,012,656株

14,473,563百万円

100

3,996

15:00

日本電信電話(株)

9432

2

3

ソニーグループ(株)6758東証PRM掲示板

11,42515:00

1,261,081,781株

14,407,859百万円

100

11,425

15:00

ソニーグループ(株)

6758

3

4

(株)キーエンス6861東証PRM掲示板

49,05015:00

243,207,684株

11,929,337百万円

100

49,050

15:00

(株)キーエンス

6861

4

5

ＫＤＤＩ(株)9433東証PRM掲示板

4,54415:00

2,304,179,550株

10,470,192百万円

100

4,544

15:00

ＫＤＤＩ(株)

9433

### 필요없는 열 삭제

```python
data[0] = data[0].drop(['名称・コード・市場', '取引値'], axis=1)
```

```python
data[0].head()
```

.dataframe tbody tr th:only-of-type { vertical-align: middle; } <pre><code>.dataframe tbody tr th { vertical-align: top; } .dataframe thead th { text-align: right; }</code></pre><p>

順位

発行済み株式数

時価総額(百万円)

単元株数

値

基準時間

名称

コード

0

1

16,314,987,460株

34,000,434百万円

100

2,084

15:00

トヨタ自動車(株)

7203

1

2

3,622,012,656株

14,473,563百万円

100

3,996

15:00

日本電信電話(株)

9432

2

3

1,261,081,781株

14,407,859百万円

100

11,425

15:00

ソニーグループ(株)

6758

3

4

243,207,684株

11,929,337百万円

100

49,050

15:00

(株)キーエンス

6861

4

5

2,304,179,550株

10,470,192百万円

100

4,544

15:00

ＫＤＤＩ(株)

9433

### 컬럼 순서 변경

필요없는 컬럼은 여기서도 삭제 가능

```python
data[0] = data[0][['順位','コード', '名称', '値', '時価総額(百万円)', '発行済み株式数','単元株数']]
```

```python
data[0].head()
```

.dataframe tbody tr th:only-of-type { vertical-align: middle; } <pre><code>.dataframe tbody tr th { vertical-align: top; } .dataframe thead th { text-align: right; }</code></pre><p>

順位

コード

名称

値

時価総額(百万円)

発行済み株式数

単元株数

0

1

7203

トヨタ自動車(株)

2,084

34,000,434百万円

16,314,987,460株

100

1

2

9432

日本電信電話(株)

3,996

14,473,563百万円

3,622,012,656株

100

2

3

6758

ソニーグループ(株)

11,425

14,407,859百万円

1,261,081,781株

100

3

4

6861

(株)キーエンス

49,050

11,929,337百万円

243,207,684株

100

4

5

9433

ＫＤＤＩ(株)

4,544

10,470,192百万円

2,304,179,550株

100

## Pandas set\_index

DataFrame에 인덱스 설정

DataFrame.set\_index(열 이름, 임의의 인수)

```python
data[0].set_index("順位", inplace=True)
```

```python
data[0].head()
```

.dataframe tbody tr th:only-of-type { vertical-align: middle; } <pre><code>.dataframe tbody tr th { vertical-align: top; } .dataframe thead th { text-align: right; }</code></pre><p>

コード

名称

値

時価総額(百万円)

発行済み株式数

単元株数

順位

1

7203

トヨタ自動車(株)

2,084

34,000,434百万円

16,314,987,460株

100

2

9432

日本電信電話(株)

3,996

14,473,563百万円

3,622,012,656株

100

3

6758

ソニーグループ(株)

11,425

14,407,859百万円

1,261,081,781株

100

4

6861

(株)キーエンス

49,050

11,929,337百万円

243,207,684株

100

5

9433

ＫＤＤＩ(株)

4,544

10,470,192百万円

2,304,179,550株

100

### Pandas to\_csv

DataFrame(Series)를 CSV파일로 출력

DataFrame(Series).to\_csv(저장할 디렉토리 + CSV파일명)

```python
data[0].to_csv("./StockRanking")
```
