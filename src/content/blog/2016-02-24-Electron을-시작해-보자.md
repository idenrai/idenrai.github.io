---
title: "Electron을 시작해 보자"
date: 2016-02-24
tags: ["Tech", "Electron"]
tistory_url: "https://idenrai.tistory.com/59"
---

컴퓨터에 Electron을 빌드하기 위해 각종 삽질을 해 보았으나

내가 이상한 건지, 내 컴퓨터가 이상한 건지... [이 방법](https://github.com/atom/electron/blob/master/docs-translations/ko-KR/development/build-instructions-windows.md)대로는 빌드에서 꼭 에러가 나더라.

그래서 한동안 손 놓고 그냥 놀았는데,

갑자기 생각이 나서 구글에 일렉트론 빌드 하고 검색해 보니 이 블로그가 뜨는 것이 아닌가...

다른 분들에게도 이 삽질을 시키는 것이 죄송스러워, 다른 방법을 알아보게 되었다.

(기존 빌드 관련 내용은 삭제하였다)

참조 : [http://qiita.com/nyanchu/items/15d514d9b9f87e5c0a29](http://qiita.com/nyanchu/items/15d514d9b9f87e5c0a29)

Electron을 하기로 생각하자마자 찾아낸 포스트였으나,

까맣게 잊고 있다가 이제서야 실행해 본다.

**1\. Electron Install**

node.js를 설치했다면, npm을 사용할 수 있을 것이다.

그냥 커맨드창에서 이렇게 electron prebuilt를 받아올 수 있다.


글로벌로 설치하니까, 인제 아무데서나 프로젝트를 만들고 electron 프로젝트명/ 으로 실행할 수 있다.

(글로벌 대신 로컬에 설치해도 상관은 없다.)

**2\. 프로젝트 생성**

프로젝트 생성 및 npm init를 통해 package.json을 만든다.

npm init에서 뭘 적어야 할 지 모르겠으면, 그냥 엔터만 누르면 된다.


**3\. Hello, Electron!**

일단 준비가 끝났으니, 언제나처럼 Hello World 비스무리한 것을 출력해 보자.

init에서 main을 main.js로 설정했으니, main.js부터 내용을 채워 보자.

**main.js**

```
/**
* main.js
*/

// 어플리케이션 기반을 컨트롤하는 모듈
var app = require('app');

// 브라우저 창을 만드는 모듈
var BrowserWindow = require('browser-window');

// 윈도우 객체를 전역에 유지
var mainWindow = null;

// 모든 창이 닫히면 호출됨 (어플리케이션 종료)
app.on('window-all-closed', function() {
if (process.platform != 'darwin') {
app.quit();
}
});

// Electron초기화 완료 후, 브라우저 창을 열 준비가 되었을 때 실행
app.on('ready', function() {
// 새로운 브라우저 창 생성
mainWindow = new BrowserWindow({width: 800, height: 600});

// 현재 위치에서 index.html 로드
mainWindow.loadUrl('file://' + __dirname + '/index.html');

// 창이 닫히면 호출됨 (어플리케이션 종료)
mainWindow.on('closed', function() {
// 윈도우 객체의 참조 삭제
mainWindow = null;
});
});
Colored by Color Scripter
```

main.js가 index.html을 부르게 하였으니, 이번엔 index.html 내용을 적는다.

Hello~~~는 여기에서 출력한다.

**index.html**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Sampletitle>
head>
<body>
<p>Hello, Electron!p>
body>
html>
```

이걸로 준비는 끝이다.

실행해 보도록 하자.


**4\. asar을 이용한 아카이브화**

asar을 이용해, 지금의 프로젝트를 아카이브화 해 보자.

asar아카이브는 tar과 비슷한 포맷으로, 모든 리소스를 하나로 만들어 준다.

그리고 electron은 압축 해제 없이 임의로 모든 파일을 읽어들일 수 있다.

1\. 일단 asar유틸리티를 설치하고

(asar도 npm으로 그냥 긁어오면 된다. 이미 한번 받았는데 다시 받는지라, 표시 화면 자체는 다를 수 있다. )

2\. asar pack 커맨드로 패키징하면 된다.


**5\. 배포하기**

이번엔 프로젝트를 누구나 실행할 수 있도록 패키지화 해 보자.

패키징에는 여러 방법이 있지만, 여기에서는 [electron-packager](https://github.com/electron-userland/electron-packager)를 사용한다.

이 또한 npm으로 그낭 받아오면 된다.


받아왔으니 돌려 봐야지.


위와 같이, electron-win32-ia32와 electron-win32-x64폴더가 생성되었다.

잠시 적은 내용을 설명하자면,

platform ･･･ all, linux, win32, darwin 중 선택

arch ･･･ all, ia32, x64 중 선택

version ･･･ Electron의 버전을 지정. 현재 버전은 0.36.8

all을 선택하였기에 폴더가 두 개 생긴 것.

현재 사용중인 컴퓨터가 윈도우 32비트이므로, 사실은

```
electron-packager ./electron electron --platform=win32 --arch=ia32 --version=0.36.8
```

이제 마지막으로 실행해 보도록 하자.

그냥 폴더에 들어가서, 프로젝트명.exe파일을 실행하면 된다.

