---
title: "Html.Lazy를 확장시키기"
date: 2017-07-02
tags: ["Tech", "elm"]
tistory_url: "https://idenrai.tistory.com/137"
---

## Html.Lazy?

elm의 함수는 순수성이 보장되어 있기에, Input이 일정하다면 Output 또한 일정하다. 동일한 Input을 매번 넣어봐야 동일한 결과만 나오므로, 매번 함수를 돌리는 것은 비효율적이라는 결론이 나온다.

### Html.Lazy의 역할

여기서 등장하는 것이 [Html.Lazy](http://package.elm-lang.org/packages/evancz/elm-html/3.0.0/Html-Lazy). Html.Lazy를 한 문장으로 설명하자면, **「Model이 변할 때에만 View도 변한다」** 이다. 이걸 걸어주면 elm의 런타임이 Html의 함수를 보고, 이전과 동일한 변수를 가진다면 그냥 함수를 돌리지 않고 이전의 결과를 그대로 쓰게 된다. 함수를 돌려봐야 이전과 동일한 결과가 나오므로, 그냥 아예 안돌려버리면 그만큼 코스트 퍼포먼스가 좋아지는 것.

## 사용법

보통은 그냥 Import를 하고, 기존의 `view model`에 덧붙여서 `lazy view model`의 형식으로 적기만 하면 끝이다. 이런 간단한 추가만으로 퍼포먼스를 최적화할수 있다니, 정말 고마울 따름이다. 여길 참고하면 나오지만, 변수의 수에 따라 lazy, lazy2, lazy3 등으로도 사용 가능하다.

### 현재 상황

난 head라는 view에 4개의 변수를 넣고 싶고, lazy도 걸어주고 싶다. 근데 3개가 넘는 변수에 대해서는 아무것도 준비되어 있지 않다. 딱 위에 적어둔 lazy3까지가 끝이다. elm core의 [Json.Decode](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Json-Decode) 등에서도 map이 8까지밖에 없어서 난감했던 걸 생각해보면, 그래도 그 때는 참 친절한 거였구나... 하고 살짝 우울해진다.

### 해결책

lazy3이 하는 일을 동일하게 진행하는 함수를 하나 만들어 주면 된다. 일단 lazyHead라는 함수를 만들어, 이 함수로 head의 변수를 전부 보낸다. 이후 여기서 함수에 lazy를 걸고 head로 보내주는 형태가 된다. 자세한 방법은 아래의 코드를 참조.

```

view : Model -> Html Msg
view model =
   div
       [ style <| Styles.container model.size
       ]
       [ lazyHead model.name model.isEdit model.tags model.flow ]
           …
       ]

lazyHead : String -> Maybe Int -> List ( Int, String ) -> Int -> Html Msg
lazyHead a b c d =
   lazy (\( a, b, c, d ) -> head a b c d) ( a, b, c, d )

head : String -> Maybe Int -> List ( Int, String ) -> Int -> Html Msg
head name isEdit tags flow =
   div [ style <| Styles.headMain ]
       [ div []
           [ div [] <|
               case selectedFlow of
                   0 ->
                       []

                   _ ->
                       [ div [ style <| Styles.projectTitle ]
                           [ text <| Messages.projectTitle ]
                       , div [ style <| Styles.headInput ]
                           [ text name
                           ]
                       ]
           …
       ]
   ]
```
