---
title: "Azure AI Search Index 전 데이터 취득"
date: 2024-06-06
tags: ["Tech", "Azure", "search", "index", "JQ"]
tistory_url: "https://idenrai.tistory.com/286"
---

## 개요

Azure AI Search의 인덱스에 들어 있는 모든 데이터를 JSON으로 취득

## 상세 내용

[REST API 버전(Azure AI Search)](https://learn.microsoft.com/ko-kr/rest/api/searchservice/search-service-api-versions)

### 파이썬 스크립트

```python
import requests
import json

# Azure Search 설정
service_name = ""
api_key = ""
index_name = ""
api_version = "2024-05-01-Preview" # Azure Search 콘솔에서 검색할 때 쓰는 api version 을 지정
file_name = "output.json"

# Search API URL
api_url = f"https://{service_name}.search.windows.net/indexes/{index_name}/docs/search?api-version={api_version}"

# 헤더에 api_key를 설정
headers = {"Content-Type": "application/json", "api-key": api_key}

# 검색 쿼리 설정
# 검색 가능한 건수는 최대 1,000건
# 내 경우는 데이터가 1,800건 정도 되므로, payload2에서 skip을 사용하여 1,001번째 건수부터 최대 1,000건 취득
# 총 건수가 2천건 이상인 경우는 skip을 2,000으로 설정하여, payload3을 만드는 식으로 늘려가면 됨
payload1 = {
    "search": "*",
    "select": "id,metadata,title,content,keyword",
    "top": 1000,
}

payload2 = {
    "search": "*",
    "select": "id,metadata,title,content,keyword",
    "top": 1000,
    "skip": 1000
}

# API 리퀘스트 송신
response1 = requests.post(api_url, headers=headers, json=payload1)
response1.raise_for_status()  # 에러가 있을 경우, 예외처리

response2 = requests.post(api_url, headers=headers, json=payload2)
response2.raise_for_status()

# response에서 도큐먼트 값만을 취득
documents1 = response1.json()
value_data1 = documents1['value']

documents2 = response2.json()
value_data2 = documents2['value']

# 데이터 합치기
value_data = value_data1 + value_data2

# 파일 출력
with open(file_name, 'w') as f:
    json.dump(value_data, f)

print(f"{file_name} Created.")
```

### 포매팅, 소트

작성된 JSON을 포매팅 및 id 로 정렬하려면 아래를 실시

#### JSON 포매팅

`cat output.json | python -m json.tool > output_formatted.json`

#### ID로 정렬

ID 정렬은 [jq](https://jqlang.github.io/jq/) 를 사용한다.

`cat output_formatted.json | jq 'sort_by(.id)' > output_sorted.json`

간단한 이용방법은 아래를 참조

[jqでsortする](https://qiita.com/yoza/items/c4c732779a5a10fd3b4c)
