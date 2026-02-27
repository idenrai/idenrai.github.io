---
title: "dbt with AWS Codebuild"
date: 2024-12-18
description: ":::note info 수년전 회사 블로그에 적었던 내용을 적당히 클렌징 및 한국어로 번역해서 올림 ::: 개요 AWS Codebuild 를 이용하여, Git 상의 dbt project 를 스케줄 실행하는 방법을 간"
tags: ["AWS for Data Engineering", "codebuild", "DBT"]
tistory_url: "https://idenrai.tistory.com/299"
---

:::note info 수년전 회사 블로그에 적었던 내용을 적당히 클렌징 및 한국어로 번역해서 올림 :::

## 개요

AWS Codebuild 를 이용하여, Git 상의 dbt project 를 스케줄 실행하는 방법을 간단히 검증

## 상세

아래의 순서로 실시

1.  AWS CodeBuild 로 빌드 프로젝트를 만들어, buildspec.yml 파일 작성
2.  AWS EventBridge 로 빌드 스케줄 설정

### AWS CodeBuild 로 빌드 프로젝트를 만들어, buildspec.yml 파일 작성

#### 작업 순서

AWS CodeBuild 에서 빌드 프로젝트 작성

![](https://blog.kakaocdn.net/dn/cJ5EPx/btsLnGHzwYz/1j7Rlt4iBJRtERPQGPcZTK/img.png)

OAuth 로 Github 연결

![](https://blog.kakaocdn.net/dn/bkdmCn/btsLnmihExU/4pfKc5j6xJDAjb51YI448K/img.png)

![](https://blog.kakaocdn.net/dn/nnC6K/btsLm5HQ7au/DKR9L8eVZjefvD7o4tBUrk/img.png)

Github 에 연결이 되면, 아래와 같이 리포지토리 설정이 가능

[AWS CodeBuildでBitBucketの特定ブランチからソースを読み込む方法](https://qiita.com/takuma-jpn/items/589593a12e1c3dfd2b45)

![](https://blog.kakaocdn.net/dn/ba1o4D/btsLlIf58R5/J0RhZcrgwX1ctZgVh4VOkK/img.png)

계속해서 설정

![](https://blog.kakaocdn.net/dn/HntTa/btsLm6fGjnu/AJPRVf7JT1gp4lKV3LpTkK/img.png)

buildspec 을 둘 장소를 지정하기

`buildspec.yml` 의 내용은 아래와 같이 설정한다

```
version: 0.2
phases:
  install:
    runtime-versions:
      python: 3.9
  pre_build:
    commands:
      - aws --version
      - echo 'region - ' - $AWS_DEFAULT_REGION
      - echo 'repository - ' $REPOSITORY_URI
  build:
    commands:
      - pip install dbt-core dbt-athena-community
      - cd ./Dev/dbt_schedule_sample
      - dbt run --profiles-dir .
```

![](https://blog.kakaocdn.net/dn/bO6GeW/btsLnGOkYR9/kUQE4mrZKtYyLjwEhSLsG1/img.png)

이걸로 OK

![](https://blog.kakaocdn.net/dn/drz1d4/btsLl0OhY7y/6woEqxKydkMABWThcY2Je1/img.png)

자동으로 만들어진 IAM 롤에 대해선 아래의 권한 부여를 실시

-   Lake Formation
-   Athena

#### 결과

![](https://blog.kakaocdn.net/dn/duKGnf/btsLmqsbQR2/yUWYjbIOWewJVFMF4QUtO0/img.png)

Athena 확인

![](https://blog.kakaocdn.net/dn/efGbN0/btsLndlnV1P/K6huuYInAkdYURRgNPkmzk/img.png)

#### Try & Error

**런타임 문제**

Python Version 이 `3.9` 였던 모양으로, `buildspec.yml` 에서 `runtime-versions` 를 지정하여 해결

![](https://blog.kakaocdn.net/dn/pIksQ/btsLmkZS1Pk/5xl62BIl3fTcdzVu9cKbl0/img.png)

**경로 문제**

dbt project가 아니라는 소리를 들음 디렉토리 변경이 필요했기에, `buildspec.yml` 에서 `cd ./Dev/dbt_schedule_sample` 로 폴더 이동을 하여 해결

![](https://blog.kakaocdn.net/dn/bW0Z3t/btsLmSV7ILt/SaY2UkC4o0o9NMKE4FKLu1/img.png)

**profiles.yml 을 찾을 수 없음**

`profiles.yml` 을 찾을 수 없었다 `buildspec.yml` 에서 `--profiles-dir` 을 사용하여, dbt project 내의 `profiles.yml` 의 장소를 지정하여 해결

![](https://blog.kakaocdn.net/dn/cunFxk/btsLmnPOlFi/Gk2O2PSrlxXkDC5ftVFhL1/img.png)

### AWS EventBridge 로 빌드 스케줄 설정

#### 작업 순서

CodeBuild 에서의 dbt 실행이 검증되었으므로, 매일 갱신되는 원 데이터에 맞추어 dbt 도 일 단위 스케줄을 설정 EventBridge 에서 스케줄을 작성

![](https://blog.kakaocdn.net/dn/Txn6b/btsLmI0w2If/jXhpyvxEhcpDDCFrr4Ol80/img.png)

원 데이터를 취득하는 Lambda 가 매일 0시에 기동하므로, 이쪽은 여유를 두고 2시로 설정

![](https://blog.kakaocdn.net/dn/8TVFt/btsLmUNbWW5/B7bI79vEJ5Vc3xv4ncRAa0/img.png)

![](https://blog.kakaocdn.net/dn/Vs7zB/btsLlYCYgH3/yytlKLI1vdTXH99Iw26wK1/img.png)

타겟 설정에서 CodeBuild 를 지정

![](https://blog.kakaocdn.net/dn/JVDJl/btsLmO7eseN/0aiC2FlmikSYDsXwjR2aVK/img.png)

![](https://blog.kakaocdn.net/dn/bGr7mc/btsLlHamkNW/NprV4lLkY2yXhnjSupvhtK/img.png)

![](https://blog.kakaocdn.net/dn/k5lmS/btsLlKroQL7/VqXkt9NhIzZy02Jb7mVyH0/img.png)

#### 결과

다음날 확인해 보니 제대로 기동하였음

![](https://blog.kakaocdn.net/dn/bwo4ci/btsLlQEZWAe/VQycQK5XZ0fykuhgXfrzok/img.png)

## 결론

### 헤맸던 부분

-   `profiles.yml` 의 설정 부분에서 꽤 고통스러웠음. 다들 보통은 Docker 를 사용하고 있어서 참조할 곳도 없고...

### 좋았던 점

-   dbt 와 AWS 만 있으면 간단히 ETL 작업 가능
-   CodeBuild 의 기동 타이밍을 지정할 수 있으므로 유용하게 사용 가능할 듯
-   이번엔 스케줄 지정이 목적이었기에 이런 느낌이었지만, 실전에서 사용할 때엔 아래와 같이 `Step Function`에서 돌리는 등으로도 사용 가능

![](https://blog.kakaocdn.net/dn/KHTku/btsLmiA9Rnk/cxoZoSet2YTam27GQ8KZNK/img.png)
