---
title: "Requests & BeautifulSoup 기본기"
date: 2022-06-03
tags: ["Tech", "Python", "Beautifulsoup", "Requests", "scraping"]
tistory_url: "https://idenrai.tistory.com/262"
---

# Requests&BeautifulSoup

## Requests

### Requests get() method

```
import requests
```

```
response = requests.get("https://www.naver.com/")
```

```
response.status_code
```

```
200
```

Response 출력

```
response.text
```

Response를 바이너리 데이터로 출력

```
response.content
```

Response의 인코딩 확인

```
response.encoding
```

```
'UTF-8'
```

Response의 Header확인

```
response.headers
```

```
{'Server': 'NWS', 'Content-Type': 'text/html; charset=UTF-8', 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'P3P': 'CP="CAO DSP CURa ADMa TAIa PSAa OUR LAW STP PHY ONL UNI PUR FIN COM NAV INT DEM STA PRE"', 'X-Frame-Options': 'DENY', 'X-XSS-Protection': '1; mode=block', 'Strict-Transport-Security': 'max-age=63072000; includeSubdomains', 'Referrer-Policy': 'unsafe-url', 'Content-Encoding': 'gzip', 'Content-Length': '37474', 'Date': 'Fri, 03 Jun 2022 08:27:30 GMT', 'Connection': 'keep-alive', 'Vary': 'Accept-Encoding'}
```

Key와 Value나누기

```
for key, val in response.headers.items():
    print(key, " : ", val)
```

```
Server  :  NWS
Content-Type  :  text/html; charset=UTF-8
Cache-Control  :  no-cache, no-store, must-revalidate
Pragma  :  no-cache
P3P  :  CP="CAO DSP CURa ADMa TAIa PSAa OUR LAW STP PHY ONL UNI PUR FIN COM NAV INT DEM STA PRE"
X-Frame-Options  :  DENY
X-XSS-Protection  :  1; mode=block
Strict-Transport-Security  :  max-age=63072000; includeSubdomains
Referrer-Policy  :  unsafe-url
Content-Encoding  :  gzip
Content-Length  :  37474
Date  :  Fri, 03 Jun 2022 08:27:30 GMT
Connection  :  keep-alive
Vary  :  Accept-Encoding
```

Cookie 속성 확인

```
response.cookies
```

### Google에 검색어를 Parameter로 넘겨 검색결과 받아오기

```
param = {"q": "python requests"}
```

```
response = requests.get("https://www.google.com/search", params=param)
```

```
response.text
```

## BeautifulSoup

BeautifulSoup(해석 대상의 HTML/XML, 이용할 Parser)

### Beautiful Soup의 정보 추출 방법

-   HTML계층을 이동시켜, HTML태그에 해당가는 부분을 검색
-   find, find\_all 등의 메소드를 통해, HTML태그에 해당하는 부분 검색
-   select 메소드를 통해 CSS셀렉터 특정 등

### Parser

-   "html.parser" Python HTML Parser : 추가 라이브러리 필요없음
-   "lxml" lxml HTML Parser : HTML 고속처리 가능
-   "xml" lxml XML Parser : XML 고속처리 가능
-   "html5lib" html5lib : HTML5 처리 가능

lxml 설치 `pip install lxml`

```
from bs4 import BeautifulSoup
```

```
response = requests.get("http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788901259307")
```

```
html = response.text
```

### Python HTML Parser

```
soup = BeautifulSoup(html, "html.parser")
```

```
print(soup)
```

title 태그 지정

```
print(soup.html.head.title)
```

```
운명을 바꾸는 부동산 투자 수업: 기초편 | 정태익 | 리더스북 - 교보문고
```

아래와 같이 html.head부분을 떼고 간략하게도 가능.

```
print(soup.title)
```

```
운명을 바꾸는 부동산 투자 수업: 기초편 | 정태익 | 리더스북 - 교보문고
```

태그 안의 텍스트만 표시

```
print(soup.title.string)
```

```
운명을 바꾸는 부동산 투자 수업: 기초편 | 정태익 | 리더스북 - 교보문고
```

태그만 표시

```
print(soup.title.name)
```

```
title
```

bs4의 tag object

```
print(type(soup.title))
```

### find(), find\_all()

-   find(검색할 HTML태그) : 최초의 1요소
-   find\_all(검색할 HTML태그) : 모든 요소

```
print(soup.find_all("ul"))
```

```
for tag in soup.find_all("ul"):
    print(tag.prettify())
```

### select()

soup.select("CSS셀렉터") : 습득한 요소를 리스트로 표시

책 가격표시 셀렉터를 넣어서 아래와 같이 원하는 부분을 출력 가능하다.

```
price = soup.select("#container > div:nth-child(4) > form > div.box_detail_order > div.box_detail_price > ul > li:nth-child(1) > span.sell_price")

print(price[0])
```

```
15,120원
```

```
price[0].attrs["title"]
```

```
'판매가'
```

```
price[0].contents[0].string
```

```
'15,120'
```
