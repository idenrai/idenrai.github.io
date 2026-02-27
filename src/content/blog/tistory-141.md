---
title: "assign으로 json data에 html태그 집어넣기"
date: 2017-11-10
tags: ["Tech", "React.js", "assign"]
tistory_url: "https://idenrai.tistory.com/141"
---

```
const sampleData = {
...
, rows: [
{
id: '1',
name: 'Frozen yogurt',
jname: 'フローズンヨーグルト',
},
{
id: '2',
name: 'Ice cream sandwich',
jname: 'アイスクリームサンドイッチ',
},
{
id: '3',
name: 'Eclair',
jname: 'エクレア',
},
...
]
};
export default sampleData;
```

jname 칼럼 안에 버튼을 달고 싶은데, 테이블 컴포넌트나 원본 데이터의 소스는 건드릴 수 없다.

테이블은 독립된 부품이라 view에서 뭘 어떻게 건든다거나 하는 것은 다 불가능하고,

그저 데이터와 펑션를 넘기는 것만이 가능하다.

고로 받아온 데이터가 버튼을 뱉어내도록 어찌어찌 조작해서 테이블에 넘겨야 한다.

아래와 같이 assign을 이용하면 되긴 된다.

```
render() {
const arr = [];
if (SampleData.rows && SampleData.rows.length > 0) {
SampleData.rows.forEach((row) => {
assign(row, {
jname: (
<Row value={row.jname}>
<Col xs={7}>{row.jname}</Col>
<Col className="">
<FAButton
primary={true}
label={'Click Here'}
onClick={this.handleDsplyBtn(row.jname)}
/>
</Col>
</Row>
)
});
arr.push(row);
});
}
assign(SampleData.rows, arr);

return (
<Frame showNav={true}>
<div style={{ paddingTop: 20 }}>
<SimpleTable
data={SampleData}
, ...
/>
</div>
</Frame>
);
}
Colored by Color Scripter
```

이렇게 화면에서 assign으로 버튼을 꼴아박아버릴 수 있다.

어차피 수정삭제는 편집화면에 id만 넘겨서 재검색하니까,

화면표시용 칼럼 정도는 괜찮겠지라는 생각으로 해버린 짓인데...

역시 부품을 제대로 만드는 것이 더 나을 것 같아서 다 지워버리고 블로그에만 살짝 남겨둔다.
