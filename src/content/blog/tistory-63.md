---
title: "Tab키 이동에 따른 포커스 방지"
date: 2016-03-25
tags: ["Tech", "HTML・CSS"]
tistory_url: "https://idenrai.tistory.com/63"
---

TAB키를 통해 포커스 이동을 할 경우,

논리적으로 잘 짜여진 코드라면 tabindex를 넣지 않더라도 알아서 잘 이동하는게 정상이다.

실제로 나 또한 지금껏 tabindex를 넣지 않고도 계속 화면을 만들어 왔고...

그런데 현재 하고 있는 프로젝트에서 짜증나는 문제가 생겼다.

입력창 뿐만이 아니라, 테이블의 헤더 부분()이 포커스를 먹어버리는 것이다.

일단 **onclick="this.blur();"**을 넣어 클릭은 막았는데...

tab키가 무조건 얘를 거쳐가게 되더라.

보통 입력창의 경우는 다음과 같이 **tabindex="-1"**을 넣으면 해결이 되는데...

```
<input type="text" class="input-small" id="num" readonly="readonly" tabindex="-1" onclick="this.blur();" />
```

얘는 그것도 되지 않아서...

그냥 똑같이 **onkeydown="this.blur();"**를 넣어 해결했다.

onkeydown이 들어가기 전에 첫 <th>에는 포커스가 잡히니까

그냥 눈가림 용으로 을 넣어버렸다.

대충 이런 형식이다.

```
<table id="table" class="table table-hover table-bordered table-striped" style="background-color:white; display:none;">
<thead>
<tr>
<th style="outline:none; text-align:left; width:40px;" onclick="this.blur();" onkeydown="this.blur();">첫번째th>
<th style="text-align:left; width:70px;" onclick="this.blur();" onkeydown="this.blur();">두번째th>
...
<th style="text-align:left; width:70px;" onclick="this.blur();" onkeydown="this.blur();">마지막th>
tr>
thead>
<tbody>
tbody>
table>
Colored by Color Scripter
```

다른 방법을 발견하게 된다면 수정하겠음.
