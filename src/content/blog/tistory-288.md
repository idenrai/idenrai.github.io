---
title: "Azure AI Search 인덱스 검색 & 삭제"
date: 2024-06-14
tags: ["Tech", "Azure", "search", "delete", "index", "azure"]
tistory_url: "https://idenrai.tistory.com/288"
---

## 개요

DynamoDB에서 30일 이상 경과한 데이터를 검색, 해당 데이터의 documentId를 통해 Azure AI Search Index에서 해당 데이터를 검색 및 삭제하는 스크립트

## 상세

### 준비

poetry를 사용하여 환경 구축

```
poetry init
poetry add boto3 requests
poetry install
poetry shell
```

### 코드 본문

#### 연결 정보

```python
import boto3
import requests
import json
from boto3.dynamodb.conditions import Key
from datetime import datetime, timedelta

# Dev
service_name = "search-ai-dev"
index_name = "index-document"
api_version = "2024-05-01-Preview"

# 검색용 쿼리 키
api_key = "aaaaa"

# 삭제용 기본 관리자 키
admin_key = "bbbbb"

# 여기서는 그냥 로컬 DynamoDB를 사용
dynamodb = boto3.resource('dynamodb', endpoint_url=' http://localhost:8000') 

# 테이블 정의
document_table = dynamodb.Table('Document')

# 30일 이전 데이터를 구하기 위해 지정
days_ago = 30
```

#### DynamoDB에서 id 취득

DynamoDB의 Document 테이블에서 id를 취득

```python
target_date = (datetime.now() - timedelta(days=days_ago)).strftime('%Y-%m-%d')
response = document_table.scan(
    FilterExpression=Key('updated_at').lt(target_date)
)

id_list = [item['id'] for item in response['Items']]
```

#### AI Search 인덱스 검색

DynamoDB에서 얻은 `id_list`를 이용하여 AI Search에서 해당 `document_id`를 가지는 데이터를 검색. AI Search에서 데이터를 삭제하려면 인덱스 키 (`"key": true`로 설정된 필드)를 취득해야 하는데, `document_id`는 키가 아닌 관계로, `document_id`를 가지는 데이터를 검색, 해당 데이터의 `id`필드를 가져와야 했다. 또한, `document_id`는 `"searchable": false`로 설정되어 있기 때문에, `filter`로 검색했다.

```python
# 검색용 URL
search_url = f"https://{service_name}.search.windows.net/indexes/{index_name}/docs/search?api-version={api_version}"

# 검색용 header
search_headers = {"Content-Type": "application/json", "api-key": api_key}

index_keys = []
for id in id_list:
    payload = {
        "count": True,
        "filter": f"document_id eq '{id}'",
    }
    response = requests.post(search_url, headers=search_headers, json=payload)

    if response.status_code == 200:
        documents = response.json()['value']
        for doc in documents:
            index_keys.append(doc['id'])
    else:
        print(f'Failed to search document with ID: {id}. Response: {response.text}')

print(index_keys)
```

#### AI Search 인덱스 데이터 삭제

위에서 취득한 `index_keys`를 사용하여 해당 데이터를 삭제. 삭제시 주의할 점은 아래의 2가지.

-   삭제시에는 쿼리 키가 아니라 관리자 키를 사용하여야 함
-   삭제시에는 url을 search가 아니라 index로 지정

```python
# 삭제용 URL
delete_url = f"https://{service_name}.search.windows.net/indexes/{index_name}/docs/index?api-version={api_version}"

# 삭제용 header
delete_headers = {"Content-Type": "application/json", "api-key": admin_key}

for id in index_keys:
    data = {
        "value": [
            {
                "@search.action": "delete",
                "id": id
            }
        ]
    }
    response = requests.post(delete_url, headers=delete_headers, data=json.dumps(data))

    # 응답 확인
    if response.status_code == 200:
        print(f'Successfully deleted document with ID: {id}')
    else:
        print(f'Failed to delete document with ID: {id}. Response: {response.text}')
```

이렇게 삭제할 수 있었다.
