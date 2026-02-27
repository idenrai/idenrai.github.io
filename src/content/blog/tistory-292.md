---
title: "DynamoDB Local"
date: 2024-07-06
description: "DynamoDB 를 로컬 환경에서 구동하기 https://hub.docker.com/r/amazon/dynamodb-local https://hub.docker.com/r/aaronshaf/dynamodb-admin"
tags: ["AWS for Data Engineering", "Docker", "dynamoDB", "local"]
tistory_url: "https://idenrai.tistory.com/292"
---

DynamoDB 를 로컬 환경에서 구동하기

[https://hub.docker.com/r/amazon/dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local)

[https://hub.docker.com/r/aaronshaf/dynamodb-admin](https://hub.docker.com/r/aaronshaf/dynamodb-admin)

## 준비물

### Docker

Docker Desktop 설치

[https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install/)

### AWS

AWS-CLI 설치

[https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

#### boto3

```shell
pip install boto3
```

[https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html)

#### Configure

원활한 이용을 위해 AWS Credentials 설정이 필요

```shell
aws configure
```

아래와 같이 설정

```text
$ aws configure
AWS Access Key ID [None]: dummy
AWS Secret Access Key [None]: dummy
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

수동 설정의 경우는 아래와 같음

```shell
touch ~/.aws/credentials
vi ~/.aws/credentials
```

```text
[default]
aws_access_key_id = dummy
aws_secret_access_key = dummy
```

```shell
touch ~/.aws/config
vi ~/.aws/config
```

```test
[default]
region = ap-northeast-1
output = json
```

## Code

docker-compose.yml

```yml
version: "3.8"
services:
  dynamodb-local:
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal

  dynamodb-admin:
    container_name: dynamodb-admin
    image: aaronshaf/dynamodb-admin:latest
    environment:
      DYNAMO_ENDPOINT: dynamodb-local:8000
    ports:
      - "8001:8001"
    depends_on:
      - dynamodb-local
```

## Run

```shell
docker-compose up
```

### Test

```shell
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

아래와 같이 출력되면 OK

```text
$ aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": []
}
```

### GUI

8000 에서 DynamoDB 를, 8001 에서 GUI 를 기동하므로, GUI 에서도 확인 가능

[http://localhost:8001/](http://localhost:8001/)

## Github

위의 내용을 그대로 실시해 보았음

[https://github.com/idenrai/templates/tree/main/dynamodb\_local](https://github.com/idenrai/templates/tree/main/dynamodb_local)
