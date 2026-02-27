---
title: "elm Native"
date: 2017-05-26
tags: ["Tech", "elm"]
tistory_url: "https://idenrai.tistory.com/135"
---

@markdown

\## elm Native

\#### elm Ports의 단점

이전에 elm Ports를 통해 jQuery로 Bootstrap Modal을 열어 보았다.

Ports는 코드도 간단하고 편하고 이래저래 쓸만했다.

단 한가지, 날 찝찝하게 만드는 것이 있다면...

Ports를 사용하는 모듈은 port module로 선언해야 한다는 것.

port module을 사용하는 패키지는 Elm Package로 공개할 수 없다.

Port의 사용으로 인해 JS를 인스톨할 필요가 생기기 때문이란다.

내가 Elm Package를 만들어 배포할 일은 없으니 사실 Ports를 쓰건 말건 별 상관도 없지만서도, 우리 팀의 미학에도 어긋나기에 슬프지만 Ports를 사용하는 것은 그만두기로 했다.

\#### elm Native

그래서 모듈을 모듈이라 쓸 수 있는 Native로 이동하기로 결정.

일단 사용할 Javascript code는 다음과 같다.

\*\*TableTool.js\*\*

\`\`\`javascript

var \_demo$elm\_webpack$Native\_TableTool = function() {

var openModal = function(target){

$(target).modal('show');

return true;

};

return {

openModal : openModal

};

}();

\`\`\`

Native는 Native 나름대로 짜증나는 룰이 두가지 존재한다.

1\. Javascript 코드를 놓을 위치

Native로 사용할 js는 \`elm-package.json\`에서 설정한 \`source-directories\`의 바로 아래에 \`Native\`라는 폴더를 만들고, 그 안에 다 넣어야 한다.

2\. function명

위의 코드를 보면, \`\_demo$elm\_webpack$Native\_TableTool\`이라는 요상한 이름으로 선언을 하고 있다.

이는 \`elm-package.json\`에서 설정한 \`repository\`를 따라간다.

\`repository": "https://github.com/demo/elm-webpack.git,\`

\`\_유저명$프로젝트명$Native\_함수명\`

대략 이런 느낌이다.

이것으로 이미 Native 자체의 설정은 끝났고,

이를 Module에서 사용하기만 하면 된다.

\*\*Datatables.elm\*\*

module Components.CustomTables.WantedTable exposing (..)

\-- 선언해 둔 TableTool을 import

import Native.TableTool

\-- Native를 사용할 함수를 설정

openModal : String -> bool

openModal target =

Native.TableTool.openModal target

\-- update에서 Cmd에 port를 가져옴

update : WantedMsg -> Wanted -> ( Wanted, Cmd WantedMsg )

update message model =

case message of

NoOp ->

( model, Cmd.none )

ShowDetailModal quest ->

( { model | modalStatus = quest }

, openModal "#detailModal"

)

이상의 작업을 통해, ShowDetailModal Message가 날아왔을 때 Native.TableTool의 openModal을 가동할 수 있었다.
