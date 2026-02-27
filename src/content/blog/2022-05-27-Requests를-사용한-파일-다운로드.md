---
title: "Requests를 사용한 파일 다운로드"
date: 2022-05-27
tags: ["Tech", "Python", "Requests", "scraping"]
tistory_url: "https://idenrai.tistory.com/260"
---

# Requests

requests 라이브러리는 http통신에 유용하게 사용 가능. 여기서는 NHK에서 제공하는 CSV데이터를 다운로드 받는 용도로 사용해 보자.

```python
import requests
import os
```

### NHK 일본 국내 코로나 감염자수 데이터

```python
url = "https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_domestic_daily_data.csv"
```

### 파일을 다운로드할 장소

```python
dir = "./"
```

### 파일 다운로드

#### open함수

open(파일명, 모드 옵션, 문자 인코딩)

##### 모드

-   ‘w’ : 쓰기 모드 - 설정한 파일명의 파일이 이미 존재하는 경우 덮어씀
-   ‘r’ : 읽기 모드
-   ‘x’ : 새로 쓰기 모드 - 설정한 파일명의 파일이 이미 존재하는 경우 에러.
-   ‘a’ : 쓰기 모드 - 설정한 파일명의 파일이 이미 존재하는 경우, 기존 파일의 맨 끝에 추가해서 씀.
-   ‘b’ : 바이너리 모드

```python
def download(url, dir):
    # DL Request
    res = requests.get(url)

    # Response Error Check
    try:
        status = res.raise_for_status()
    except Exception as e:
        print("Error:{}".format(e))

    # No Error :)
    if status == None:
        print("DL Start")

        # open()함수에 wb를 사용, 바이너리 쓰기 모드로 파일 생성
        file = open(os.path.join(dir, os.path.basename(url)), "wb")

        # respoonse의 각 chunk를 write()함수를 이용해 위에서 만든 파일에 쓰기
        for chunk in res.iter_content(chunk_size=100000):
            file.write(chunk)

        # 파일 닫기
        file.close()
        print("DL Complete")
```

### 다운로드

```python
download(url, dir)
```
