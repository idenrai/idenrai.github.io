---
title: "props의 데이터가 파괴되는 문제"
date: 2017-02-08
tags: ["Tech", "React.js", "key", "assign", "react"]
tistory_url: "https://idenrai.tistory.com/115"
---

예전에 자작 데이터테이블에 Add Row버튼을 달아 두고,

클릭시 테이블 최하단에 줄을 추가하는 작업을 해 두었다.

추가할 줄의 내용은 다음과 같이 data에 미리 설정해두고 props로 받아서 사용하고 있었다.

```
...

additionalRow: {
name: 'AdditionalRow',
jname: '追加行',
kname: '추가행',
calories: '',
fat: '',
carbs: '',
protein: '',
sodium: '',
calcium: '',
iron: '',
},

...
```

근데 이 데이터테이블에 TextField를 만들어, 추가할 줄의 내용을 수정하려 하는 것에서 문제가 발생했다.

한 항목의 내용을 바꾸면, 행 추가를 통해 만들어진 다른 행도 똑같이 바뀌어버리는 것이다.


이유는 당연히 react의 key 문제.

데이터로 받아온 다른 줄의 경우는, 다 data.id를 row의 key로 사용하고 있지만...

나중에 추가한 줄의 경우는 딱히 데이터 id가 존재하지 않기에, 동일한 줄로 인식해버리는 것이다.

그래서 일단 넣어 본 코드가 이거였는데...

```
addRowButtonClick = (event) => {
event.preventDefault();
const rows = this.state.rows;
const additionalRow = this.props.data.additionalRow;
if (!additionalRow) return;
additionalRow.id = uuid();
rows.push(additionalRow);
this.setState({ rows });
}
Colored by Color Scripter
```

additionalRow를 props에서 받아와 여기의 id에 uuid를 집어넣으면

버튼 클릭시마다 새로이 uuid가 발급되어, 각기 다른 id가 붙여질 것이라는 생각이었다.

그런데 이상하게도 key가 동일하다며 줄이 추가되질 않더라.


새로이 지정한 additionalRow의 id에 uuid를 넣는 순간,

props의 additionalRow의 내용도 동일하게 바뀌는 것이다!

그냥 변수 지정을 하는 것은 props의 주소값만 떼오는 형식이기에 원본 props의 내용이 파괴되어버렸고,

그래서 무조건 모든 줄의 id가 나중에 지정한 uuid로 바뀌어버려서

2줄 이상의 addRow가 불가능하게 되었다.

그래서 찾아본 것이 원본 props의 데이터를 제대로 복제하는 방법이었고...

[Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Cloning_an_object) 으로 해결되었다.

```
addRowButtonClick = (event) => {
event.preventDefault();
const rows = this.state.rows;
if (!this.props.data.additionalRow) return;
const additionalRow = assign({}, this.props.data.additionalRow);
const id = uuid();
rows.push(assign(additionalRow, { id }));
this.setState({ rows });
}
Colored by Color Scripter
```

{}와 props의 additionalRow를 assign시켜서

새로이 지정된 {}에 additionalRow를 덮어씌워, 완전한 복제를 만들 수 있었다.

이후 복제품에 uuid를 바르고, 테이블 row data에 push하는 것으로 완료.

기왕 assign을 쓰는 김에, additionalRow에 id를 넣는 방법도 바꾸어 보았다.
