---
title: "jupyter notebook 사용하기"
date: 2022-05-13
tags: ["Tech", "Tool", "설치", "Jupyter"]
tistory_url: "https://idenrai.tistory.com/259"
---

# jupyter notebook 사용하기

## Python 설치

맥북이면 Homebrew로 설치하면 되고, 윈도우면 홈페이지에서 다운로드할 것. 인스톨시에는 "Path에 추가"를 반드시 체크해주자.

## jupyter설치

이하 커맨드 사용

```
$ pip install --upgrade pip
$ pip install jupyter
```

MacOS의 경우는 pip 대신 pip3으로.

윈도우의 경우, 혹시 이하와 같은 에러가 나올 수 있다.

```
ERROR: Could not install packages due to an OSError: [WinError 5] 액세스가 거부되었습니다: 'C:\\Users\\geniu\\AppData\\Local\\Programs\\Python\\Python310\\~cripts\\pip.exe'
Consider using the `--user` option or check the permissions.
```

에러메시지에도 친절히 적어준 것처럼, user를 붙여주자.

```
$ pip install --upgrade pip --user
```

## Jupyter Notebook 실행

기동을 원하는 위치에서 이하 커맨드 입력

```
$ jupyter notebook
```

그럼 알아서 실행된다.


테스트삼아 대충 이런거 하나 만들어서 저장해 두고...


폴더 열어보면 이래 저장되는 것을 확인할 수 있다.

