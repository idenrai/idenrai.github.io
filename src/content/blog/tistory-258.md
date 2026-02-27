---
title: "nvm-windows로 노드 버전 관리"
date: 2022-02-22
tags: ["Tech", "NPM", "node.js", "nvm", "nvm-windows"]
tistory_url: "https://idenrai.tistory.com/258"
---

# nvm

## 개요

node.js의 버전을 쉽게 관리할 수 있게 해 주는 아주 기특한 녀석.

그동안 아무 생각 없이 그냥 써 왔는데, 간만에 컴퓨터 새로 세팅하려니 이름이고 뭐고 다 까먹어서...

다시 설치하는 김에 블로그에도 남겨두도록 한다.

## nvm-windows

nvm을 windows에서도 사용할 수 있게 해 준다.

상세 정보는 [여기](https://github.com/coreybutler/nvm-windows)에서.

### 설치 방법

#### 다운로드

[여기](https://github.com/coreybutler/nvm-windows/releases)에서 대강 최신 버전의 nvm-setup.zip을 다운로드 받도록 하자.

#### 설치

압축을 풀고, nvm-setup.exe을 관리자 실행.

#### 설치 확인

이하를 통해 확인 가능

```
nvm -v
```

#### node.js 설치

##### 설치 가능한 node.js 버전 확인

이하 명령어 실행

```
nvm list available
```

대강 아래와 같이 사용 가능한 버전이 나온다.


##### node.js 설치

원하는 버전의 node.js를 설치하자. 이하 명령어 실행.

```
nvm install [버전]
```

나는 그냥 최신으로 일단 설치했다.

```
nvm install latest
```

##### 설치된 버전 확인

이하 명령어를 통해 확인 가능

```
nvm list
```

##### node.js 사용 선택

이하 명령어를 통해 선택 가능

```
nvm use [버전]
```

내 경우에는 아래와 같다.

```
nvm use 17.5.0
```

##### node.js 버전 확인

이하를 통해 node.js와 npm의 버전 확인

```
node -v
npm -v
```

#### 트러블 발생시

##### Access is denied

`nvm use [버전]`을 사용 시, 아래와 같은 에러가 발생할 수 있다.


cmd를 종료 후, 관리자 실행하여 다시 시도하면 해결된다.


##### 문자가 깨지는 경우

이번에 설치할 때에는 나오지 않았는데, 문자가 깨져서 나오는 경우가 있다.

아래의 명령어로 cmd의 문자 코드를 바꿔 주면 해결.

```
chcp 65001
```
