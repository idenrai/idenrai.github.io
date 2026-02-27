---
title: "라벨의 Byte Length에 따른 요소 길이 조정"
date: 2017-01-23
tags: ["Tech", "React.js", "CSS", "javascript", "react.js"]
tistory_url: "https://idenrai.tistory.com/110"
---

material-ui를 이용해 데이터테이블을 만드는 중이었다.

이게 기본적으로 테이블 width를 100%로 잘라 버리는데,

그러다 보니 브라우저가 작아지면 그만큼 각 요소의 길이도 찌그러지더라.


처음엔 그냥 이렇게 ellipsis로 땜빵하려고 했는데,

```
tableHeaderColumn: {
fontWeight: 600,
whiteSpace: 'nowrap',
overflow: 'hidden',
textOverflow: 'ellipsis',
},
```

슬프게도 textOverFlow가 header column에 안먹히더라...

내가 개조하는 과정에서 뭔가 삽질을 한 모양이다.

여하튼 이걸 그대로 낼 수는 없으니,

적어도 column label만큼은 제대로 표시하고 싶었다.

데이터에는 ellipsis가 먹히기도 하고...

처음에는 minWidth등으로 어찌어찌 해 보려고 했는데...

뭐 하나도 먹히는게 없어서 좌절에 좌절을 거듭하다가...

render에서 label의 길이를 가지고 width를 설정하는 것에 생각이 갔다.

```
width: '{char length}ch'
```

코드는 다음과 같다.

```
...

<TableRow onCellClick={this.handleHeaderColumnClick}>
{columns.map((row, index) => {
const byteLength = row.label.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;
const style = assign({}, styles.tableHeaderColumn, { width: `${byteLength}ch` }, row.style || {});
const sortable = row.sortable;
const sorted = this.state.sort.column === row.key;
const order = sorted ? this.state.sort.order : 'asc';
return (
<DataTablesHeaderColumn
key={index}
style={style}
tooltip={row.tooltip}
sortable={sortable}
sorted={sorted}
order={order}
>
<span>{row.label}</span>
</DataTablesHeaderColumn>
);
}, this)}
</TableRow>

...
Colored by Color Scripter
```

그냥 row.label.length로 길이를 넣으면

아무래도 일본어다 보니 전각/반각 문제도 있어서 제대로 column이 표시되지 않는다.

그래서 그냥 byte길이로 width를 설정하였다.

결과는 다음과 같다.


가끔 column이 데이터보다 짧아서 데이터가 ...으로 짤리는 경우가 존재하는데...

이 경우는 그냥 config에서 column을 설정시, column width를 prop으로 보내는 것으로 하였다.

하여 assign의 우선순위는

prop으로 받아온 style > label길이 > 내부 설정 순으로 정했다.
