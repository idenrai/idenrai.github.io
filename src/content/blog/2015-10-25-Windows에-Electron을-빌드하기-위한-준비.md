---
title: "Windows에 Electron을 빌드하기 위한 준비"
date: 2015-10-25
tags: ["Tech", "Electron"]
tistory_url: "https://idenrai.tistory.com/39"
---

**1\. Python 설치 및 환경변수 설정**

**1) 파이썬 설치 ([https://www.python.org/download/releases/2.7/](https://www.python.org/download/releases/2.7/))**

\- Windows x86(or x64) MSI Installer

\- 받은 파일 실행하고 순서대로 설치

**2) 환경변수 설정**

\- 내 컴퓨터 > 시스템 속성 > 고급 > 환경변수

\- Path 편집 : 마지막에 Python이 설치된 경로 추가

\- 변수값 : \~~~~~~;C:\\Python27

\- PYTHONPATH 추가

\- 변수명 : PYTHONPATH

\- 변수값 : C:\\Python27\\Lib

**3) 설치 확인**

\- cmd > python

\- 테스트 파일 실행

\- notepad > print("Hello Python!") > test.py로 저장 (문자코드는 UTF-8로 변경할 것!)

\- cmd > 해당 폴더로 이동 > python test.py

**2\. Node.js 설치 및 환경변수 설정**

**1) Node.js 설치 ([https://nodejs.org/en/#download](https://nodejs.org/en/#download)****)**

**\-** 윈도우 버전 맞춰서 쭉쭉 설치만 하면 끝.

**2) 설치 확인**

\- cmd > node

\- 해당 입력창에서 javascript용 코드 입력 후 확인


**3) 신기하니까 js파일로 한번 더 테스트 (서버에서 돌리기)**

\- app.js 작성 (Python과 동일하게, UTF-8로 인코딩)

app.js 작성

var http = require('http');

http.createServer(function(req,res){

res.writeHead(200,{'Content-Type':'text/plain'});

res.end('Hello World\\nHello node.js!');

}).listen(1337,"127.0.0.1");

console.log("Server running at http://127.0.0.1:1337/");

\- node로 app.js를 돌리고, 지정했던 IP인 127.0.0.1:1337에서 확인


**3\. Visual Studio 2013 설치 및 설정**

**1) Visual Studio 2013 설치 (****[https://www.visualstudio.com/downloads/download-visual-studio-vs](https://www.visualstudio.com/downloads/download-visual-studio-vs))**

**\-** 윈도우 버전 맞춰서 쭉쭉 설치만 하면 끝.

\- 회사 컴퓨터에 Visual Studio 2013 Professional이 있으므로 이를 사용하였고, 보통은 Community Edition을 사용하면 됨.

**4\. Git 설치 및 설정**

**1) Git 설치 (****[http://git-scm.com/download/win](http://git-scm.com/download/win))**

**\-** 윈도우 버전 맞춰서 쭉쭉 설치만 하면 끝.

\- 개인적으로, 윈도우 cmd 콘솔에서 사용하고 싶기에 콘솔 사용 선택

참고 : [https://github.com/atom/electron/blob/master/docs-translations/ko-KR/development/build-instructions-windows.md](https://github.com/atom/electron/blob/master/docs-translations/ko-KR/development/build-instructions-windows.md)

5\. Atom Editor 설치 및 Package 설정

**\# Electron을 쓰는 김에 Atom도 써 보려는 것 뿐이므로, 다른 텍스트 에디터를 사용해도 전혀 상관 없음.**

**1) atom 설치 (****[https://atom.io](https://atom.io)****)**

**\-** 윈도우 버전 맞춰서 쭉쭉 설치만 하면 끝

**2) Package 설치 (****File→Settings→Install 에서 패키지 검색****)**

\- [**linter**](https://atom.io/packages/linter) : 문법상 오류 표시

\- [**grunt-runner**](https://atom.io/packages/grunt-runner) : Atom에서 Grunt 실행 가능

\- **[minimap](https://atom.io/packages/minimap), [minimap-find-and-replace](https://atom.io/packages/minimap-find-and-replace)** : 미니맵 표시

\- [**atom-minify**](https://atom.io/packages/atom-minify) : JS, CSS 최소화 (ctrl+shift+m 또는 Minify on save설정)

