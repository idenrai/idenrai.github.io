---
title: "Mac에서 Pyenv 설치"
date: 2023-07-29
tags: ["Tech", "Environment Setting", "pyenv"]
tistory_url: "https://idenrai.tistory.com/273"
---

# pyenv

[https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)

## pyenv 설치

### brew로 설치

virtualenv도 같이 깔아주자

```
brew install pyenv pyenv-virtualenv
```

### 환경변수 추가

난 zsh를 사용하므로 이하를 1줄씩 추가

```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc
echo 'export PYENV_VIRTUALENV_DISABLE_PROMPT=1' >> ~/.zshrc
```

bash의 경우는 `~/.zshrc`만 `~/.bash_profile`로 바꿔주면 된다.

```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
echo 'export PYENV_VIRTUALENV_DISABLE_PROMPT=1' >> ~/.bash_profile
```

설정 저장 및 재실행

```
source ~/.zshrc
exec $SHELL
```

설치되었는지 확인

```
pyenv --version
```

## 기본 사용법

설치 가능한 파이썬 버전 리스트 확인

```
pyenv install --list
```

특정 파이썬 버전 설치 ex) 3.11.4

```
pyenv install 3.11.4
```

특정 파이썬 버전 삭제 ex) 3.11.4

```
pyenv uninstall 3.11.4
```

설치된 파이썬 버전 리스트 확인

```
pyenv versions
```

해당 파이썬 버전을 기본 버전으로 설정 ex) 3.11.4

```
pyenv global 3.11.4
```

## 가상환경 설정 (pyenv-virtualenv)

가상 환경의 버전과 이름을 입력

```
pyenv virtualenv [version] [name]
```

ex) 3.11.4, venv

```
pyenv virtualenv 3.11.4 venv
```

## 가상환경 사용법

가상환경 이름은 venv로 가정

시작

```
pyenv activate venv
```

종료

```
pyenv deactivate
```

리스트 확인

```
pyenv virtualenvs
```

가상환경 삭제

```
pyenv uninstall venv
```
