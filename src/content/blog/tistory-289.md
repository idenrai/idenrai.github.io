---
title: "poetry 사용법"
date: 2024-06-23
tags: ["Tech", "Python", "poetry"]
tistory_url: "https://idenrai.tistory.com/289"
---

## 개요

파이썬 패키지 관리 툴 `poetry`의 사용 방법 메모

## 상세

### poetry란

[https://python-poetry.org/docs/](https://python-poetry.org/docs/) 파이썬 패키지 관리 툴. 기존 파이썬으로 뭔가를 만들 때엔, `pyenv-virtualenv` 나 `pipenv shell` 등을 사용해서 가상환경을 구축하고 `pip` 커맨드로 패키지를 인스톨 및 `requirements.txt`를 이용해 패키지를 관리해 왔다. `poetry`는 가상환경의 구축이나 패키지 관리 파일의 생성/변경 등, 개발에 필요한 각종 기능을 다 갖추고 있어, `poetry` 커맨드만으로 이것저것 다 해결할 수 있다.

### 설치

[https://python-poetry.org/docs/#installation](https://python-poetry.org/docs/#installation)

맥의 경우는 아래로도 해결 가능

```
brew install poetry
```

```
poetry --version
```

### 초기설정

[https://python-poetry.org/docs/configuration/#virtualenvsin-project-boolean](https://python-poetry.org/docs/configuration/#virtualenvsin-project-boolean) 가상환경을 project 아래에 두도록 설정한다. `--local`옵션을 추가하는 것으로, `virtualenvs.in-project` 설정 자체를 git 관리할 수 있다고 하니 참고.

```
poetry config virtualenvs.in-project true
poetry config --local virtualenvs.in-project true
```

해제할 때에는 아래와 같다.

```
poetry config --unset virtualenvs.in-project
poetry config --unset --local virtualenvs.in-project
```

### 프로젝트 작성

프로젝트를 처음부터 만들 경우 [https://python-poetry.org/docs/cli/#new](https://python-poetry.org/docs/cli/#new)

```
poetry new <프로젝트명>
```

기존 존재하는 폴더에 `poetry`를 추가할 경우 [https://python-poetry.org/docs/cli/#init](https://python-poetry.org/docs/cli/#init)

```
poetry init
```

### 라이브러리 추가

`poetry add`를 사용하여 라이브러리 추가 가능 [https://python-poetry.org/docs/cli/#add](https://python-poetry.org/docs/cli/#add)

`boto3`와 `requests`를 추가하고 싶은 경우는 아래를 실행

```
poetry add boto3 requests
```

### 환경 구축

`poetry.lock`이 존재할 경우, `poetry install`을 이용하여 환경 구축 가능 [https://python-poetry.org/docs/cli/#install](https://python-poetry.org/docs/cli/#install)

```
poetry install
```

### 가상환경 이용

`poetry`로 만든 가상환경을 이용할 때엔 아래의 커맨드를 사용 [https://python-poetry.org/docs/cli/#shell](https://python-poetry.org/docs/cli/#shell)

```
poetry shell
```

### 기타 유용한 사용법

#### 업데이트 가능한 패키지 체크

[https://python-poetry.org/docs/cli/#show](https://python-poetry.org/docs/cli/#show)

```
poetry show --outdated
```
