---
title: "elm ports"
date: 2017-05-23
tags: ["Tech", "elm"]
tistory_url: "https://idenrai.tistory.com/134"
---

@markdown

\### Ports : elm - javascript

elm에서 Bootstrap을 이용해 DataTables를 만드는 중.

Row에 놓은 Detail Button을 Click시,

1\. ShowDetailModal Message로 Modal의 State를 현재 Click한 Row의 Data로 갱신하고

2\. Bootstrap의 data-toggle로 DetailModal을 열고자 했다.

그런데 여기서 한가지 변수가 발생했다.

Button Click의 경우 Modal만 열고 끝나야 하는데, Bubble로 인해, Row Click Event가 함께 가동되는 것.

Row Click Event는 선택된 Row의 State인 Selected를 True로 만들고, Row의 색깔을 바꾼다.

이로 인해 Detail Modal Button Click시 Row의 색깔이 바뀌는 불상사가 발생.

이를 막기 위해 onClick Event를 \`Html.Events.onWithOptions\` 으로 변환하고, Option은 다음과 같이 설정하였다.

\`\`\`

viewButton : Quest -> DataTables.HtmlDetails WantedMsg

viewButton quest =

DataTables.HtmlDetails \[\]

\[ div

\[ class "btn btn-success btn-md"

, attribute "data-toggle" "modal"

, attribute "data-target" "#detailModal"

, onRowClick (ShowDetailModal quest)

\]

\[ span \[\] \[ text "detail" \]

\]

\]

noBubble : Options

noBubble =

{ stopPropagation = True

, preventDefault = True

}

onRowClick : msg -> Attribute msg

onRowClick message =

onWithOptions "click" noBubble (Json.succeed message)

\`\`\`

이를 통해 Button Click Event가 Row Click Event로 Bubble되는 현상은 막을 수 있었으나,

이제는 Bootstrap의 data-toggle이 먹히지 않아 Modal이 열리지 않게 되었다.

이 상황에서 elm을 가지고 Modal을 열려면 Modal State를 정의해 On/Off하는 방법밖에 떠오르지 않는데,

이를 이용하면 Bootstrap Modal의 동작을 기대하긴 힘들어진다.

그래서 생각해 낸 것이 ports를 이용해 javascript에서 jQuery로 Bootstrap Modal을 여는 것.

코드는 다음과 같다.

\*\*Main.elm\*\*

\- main에서 subscriptions을 사용할 것.

\`\`\`

subscriptions : Model -> Sub Msg

subscriptions model =

Sub.none

\-- MAIN

main : Program Never Model Msg

main =

Navigation.program OnLocationChange

{ init = init

, view = view

, update = update

, subscriptions = subscriptions

}

\`\`\`

\*\*index.js\*\*

\- 사용할 script를 ports에 선언

\`\`\`

// node\_modules

var $ = jQuery = require( 'jquery/dist/jquery.js' ); // <--- remove if jQuery not needed

require( 'bootstrap-sass/assets/javascripts/bootstrap.js' ); // <--- remove if Bootstrap's JS not needed

require( './styles/main.scss' );

var Elm = require( '../elm/Main' );

const app = Elm.Main.embed( document.getElementById( 'main' ) );

// Port

// Bootstrap Modal Open

app.ports.openModal.subscribe((target) => {

$(target).modal('show')

});

\`\`\`

\*\*Datatables.elm\*\*

\`\`\`

\-- ports를 사용할 module은 port module로 정의해야 함

port module Components.CustomTables.WantedTable exposing (..)

\-- port 선언

port openModal : String -> Cmd msg

\-- update에서 Cmd에 port를 가져옴

update : WantedMsg -> Wanted -> ( Wanted, Cmd WantedMsg )

update message model =

case message of

NoOp ->

( model, Cmd.none )

ShowDetailModal quest ->

({ model | modalStatus = quest }

! \[ openModal "#detailModal" \]

)

\`\`\`

이상의 작업을 통해 index.js의 ports에 target id인 "#detailModal"를 전달, modal('show')를 가동할 수 있었다.
