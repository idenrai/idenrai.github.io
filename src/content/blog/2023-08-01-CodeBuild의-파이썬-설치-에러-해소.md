---
title: "CodeBuild의 파이썬 설치 에러 해소"
date: 2023-08-01
tags: ["Tech", "Environment Setting", "pyenv", "codebuild", "skip-existing"]
tistory_url: "https://idenrai.tistory.com/275"
---

CodeBuild를 Github에 연동해서 빌드 테스트를 돌리는데, 며칠 전부터 뜬금없이 아래와 같은 에러가 나오더라.

```
[Container] 2023/08/01 00:38:40 Running command pyenv install ${PYTHON_VERSION}
pyenv: /root/.pyenv/versions/3.11.4 already exists

[Container] 2023/08/01 00:38:40 Command did not exit successfully pyenv install ${PYTHON_VERSION} exit status 1
[Container] 2023/08/01 00:38:40 Phase complete: INSTALL State: FAILED
[Container] 2023/08/01 00:38:40 Phase context status code: COMMAND_EXECUTION_ERROR Message: Error while executing command: pyenv install ${PYTHON_VERSION}. Reason: exit status 1
```

이유는 이것이었다.

[https://github.com/aws/aws-codebuild-docker-images/blob/master/al2/x86\_64/standard/5.0/Dockerfile#L278](https://github.com/aws/aws-codebuild-docker-images/blob/master/al2/x86_64/standard/5.0/Dockerfile#L278)

여기서 aws/codebuild/amazonlinux2-x86\_64-standard:5.0 이미지에서 Python 3.11.4 이 기본 인스톨 되도록 변경한 것이 원인. 이미 3.11.4가 설치되어 있는데, 다시 설치하려 하다 보니 에러가 나는 것.

커밋 이력을 보니 딱 최근이더라.

[https://github.com/aws/aws-codebuild-docker-images/commit/3228c52ba08b814ed435c4f4a514513b72b0d03b#diff-fa3852c40a1cf3a637f8f31e5d9bad175dd8d1c64b6ac69384908ba1dc6d8d4c](https://github.com/aws/aws-codebuild-docker-images/commit/3228c52ba08b814ed435c4f4a514513b72b0d03b#diff-fa3852c40a1cf3a637f8f31e5d9bad175dd8d1c64b6ac69384908ba1dc6d8d4c)

여하튼 대응을 해야 하는데. 처음엔 아래와 같이 if문으로 해결하려고 했다.

```
phases:
  install:
    commands:
    ...
      - |
        if pyenv versions | grep -q ${PYTHON_VERSION}; then
          echo "Python ${PYTHON_VERSION} is already installed.";
        else
          pyenv install ${PYTHON_VERSION};
          pyenv global ${PYTHON_VERSION};
          echo -n "python version " && python --version;
        fi
    ...
```

근데 혹시나 해서 알아보니, 이런게 있더라.

```
$ pyenv install --help
Usage: pyenv install [-f] [-kvp] ...
       pyenv install [-f] [-kvp] 
       pyenv install -l|--list
       pyenv install --version

  -l/--list          List all available versions
  -f/--force         Install even if the version appears to be installed already
  -s/--skip-existing Skip if the version appears to be installed already

  python-build options:

  -k/--keep          Keep source tree in $PYENV_BUILD_ROOT after installation
                     (defaults to $PYENV_ROOT/sources)
  -p/--patch         Apply a patch from stdin before building
  -v/--verbose       Verbose mode: print compilation status to stdout
  --version          Show version of python-build
  -g/--debug         Build a debug version
```

`pyenv install --skip-existing [파이썬 버전]`을 쓰면, 해당 파이썬 버전이 이미 설치되어 있을 경우 인스톨을 스킵할 수 있다고 한다. 그래서 아래 코드로 해결.

```
phases:
  install:
    commands:
    ...
      - pyenv install --skip-existing ${PYTHON_VERSION}
    ...
```

인스톨 이후의 처리도 문제없이 돌아간다.

```
[Container] 2023/08/01 01:18:41 Running command pyenv install --skip-existing ${PYTHON_VERSION}

[Container] 2023/08/01 01:18:42 Running command pyenv global ${PYTHON_VERSION}

[Container] 2023/08/01 01:18:42 Running command echo -n "python version " && python --version
python version Python 3.11.4
```

참조: [pyenv에서 자주 쓰는 커맨드의 사용법](https://namileriblog.com/python/pyenv-commands/)
