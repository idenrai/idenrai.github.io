---
title: "Float column footer"
date: 2016-01-27
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/53"
---

레포트의 매 페이지마다

Detail 부분이 끝나는 지점에서 무조건 선을 하나 출력하고 싶어서

이것저것 시도를 해 보았다.

Group Footer를 쓸 경우에는 해당 그룹이 한 페이지를 넘어가는 경우가 존재하므로 안되고,

Page Footer를 쓰면 되려나 싶었으나 선이 무조건 맨 아래로 내려가 버렸다.


Column Footer도 이와 마찬가지였으나,

Report Property에서 이를 조절 가능한 옵션을 발견했다.

바로 Float column footer 옵션!


Float column footer 옵션은

Column Footer 밴드를 강제적으로 마지막 디테일 밴드의 다음에 출력시키는 옵션이다.

이를 통해 다음과 같이 디테일이 끝나는 시점에서 선을 넣을 수 있었다.


디테일이 끝나는 부분에서 매 페이지 출력해야 하는 무언가가 있을 경우,

이와 같이 사용 가능하다.
