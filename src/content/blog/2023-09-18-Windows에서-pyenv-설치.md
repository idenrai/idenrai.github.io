---
title: "Windows에서 pyenv 설치"
date: 2023-09-18
tags: ["Tech", "Environment Setting", "windows", "pyenv", "pywnv-win"]
tistory_url: "https://idenrai.tistory.com/277"
---

# pyenv-win

개인용 맥북을 팔아먹어버려서 게임용으로 두고 있던 윈도우 노트북에 개발환경을 갖추기로 했다. pyenv를 그냥 설치할라고 보니 안되길래, 조금 알아보니 이런게 있더라.

[pyenv-win](https://github.com/pyenv-win/pyenv-win)

## pyenv-win 설치

설치 방법은 다음과 같다. (설치는 기본적으로 Windows PowerShell에서 실행)

### Install

PowerShell을 열고 이하 입력

```
pip install pyenv-win --target $HOME\.pyenv
```

### 환경변수 추가

이하 4개를 순서대로 입력하자.

```
[System.Environment]::SetEnvironmentVariable('PYENV',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
```

```
[System.Environment]::SetEnvironmentVariable('PYENV_ROOT',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
```

```
[System.Environment]::SetEnvironmentVariable('PYENV_HOME',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
```

```
[System.Environment]::SetEnvironmentVariable('path', $env:USERPROFILE + "\.pyenv\pyenv-win\bin;" + $env:USERPROFILE + "\.pyenv\pyenv-win\shims;" + [System.Environment]::GetEnvironmentVariable('path', "User"),"User")
```

다 실행했으면, PowerShell을 재기동, 혹은 그냥 cmd에서 설치 확인

```
pyenv --version
```

### 기본 사용법

이후 방법은 동일하다.

설치 가능한 파이썬 버전 리스트 확인

```
pyenv install --list
```

특정 파이썬 버전 설치 ex) 3.11.0b4

```
pyenv install 3.11.0b4
```

특정 파이썬 버전 삭제 ex) 3.11.0b4

```
pyenv uninstall 3.11.0b4
```

설치된 파이썬 버전 리스트 확인

```
pyenv versions
```

해당 파이썬 버전을 현재 디렉토리에서 기본 버전으로 설정 ex) 3.11.0b4

```
python local 3.11.0b4
```

해당 파이썬 버전을 기본 버전으로 설정 ex) 3.11.0b4

```
python global 3.11.0b4
```

### 가상 환경 설정

Windows에서는 아직 pyenv-virtualenv 가 없으니, 그냥 파이썬 가상환경을 사용한다.

```
python -m venv env
```

### 가상 환경 사용법

시작

```
env\Scripts\activate
```

종료

```
deactivate
```

---

윈도우 컴으로 뭘 좀 할랬더니 손도 꼬이고 여하튼 할게 못된다. 얼렁 맥을 새로 사던가 해야지.
