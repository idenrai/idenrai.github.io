---
title: "DataTables의 X축 스크롤 지정과 Column길이 지정 (DataTables 자체)"
date: 2016-09-02
tags: ["Tech", "jQuery DataTables"]
tistory_url: "https://idenrai.tistory.com/85"
---

DataTables로 테이블 출력 시, 기본적으로는 한 화면에 들어가도록 자동 조정이 되어버린다.

보통은 그렇게 한 화면에 다 볼 수 있게 해 주는게 좋긴 한데...

column수가 많으면 column을 지맘대로 접어버리니까...

가끔은 가로 스크롤을 써서라도 내용을 한줄에 이쁘게 뽑고 싶어진다.

근데 데이터테이블은 에 클래스 지정이라든가 하기 애매하니까...

CSS class를 입히려면 그냥 데이터테이블 뽑은 이후에 테이블 객체를 가져와서 addClass를 쓰라고 하드라.

근데 괜히 그런식으로 테이블 가져오기도 싫고, CSS도 따로 지정하기 귀찮고...

괜히 DataTables까지 망가지는것도 싫으니 그냥 DataTables에서 해결해 버리기로 했다.

일단 결론부터 적자면

```
local.$dom.find('#reportList').DataTable({
data: param.reportInfo,
scrollY: '60vh',
columns: [
{title: i18n.get('App.Column.id'), data: 'id'},
{title: i18n.get('App.Column.func'), data: 'func'},
{title: i18n.get('App.Column.operation'), data: 'operation'},
{title: i18n.get('App.Column.operation.detail'), data: 'operation_detail'},
{title: i18n.get('App.hs.Column.insuranceCard.code'), data: 'insurance_card_code'},
{title: i18n.get('App.hs.Column.insuranceCard.no'), data: 'insurance_card_no'},
{title: i18n.get('App.hs.Column.relationship.name'), data: 'relationship_name'},
{title: i18n.get('App.hs.Column.name'), data: 'name'},
{title: i18n.get('App.hs.Column.name.kana'), data: 'kana_name'},
{title: i18n.get('App.hs.Column.create.dat'), data: 'create_dat'},
{title: i18n.get('App.hs.Column.create.code'), data: 'create_by_cd'},
{title: i18n.get('App.hs.Column.create.name'), data: 'create_by_nm'}
],
order: [
[9, 'desc']
],
fixedHeader: {
header: true,
footer: false
},
ordering: true,
paging: true,
pageLength: 1000,
processing: true,
scrollY: true,
scrollX: "100%",
scrollXInner: "2300px",
columnDefs: [
// hide id(first column)
{
targets: [0],
visible: false,
searchable: false
},
{targets: [1], width: "200px"},
{targets: [2], width: "100px"},
{targets: [3], width: "500px"},
{targets: [4], width: "200px"},
{targets: [5], width: "200px"},
{targets: [6], width: "150px"},
{targets: [7], width: "150px"},
{targets: [8], width: "200px"},
{targets: [9], width: "200px"},
{targets: [10], width: "200px"},
{targets: [11], width: "200px"},
],
fnCreatedRow: function(nRow, aData, iDataIndex) {
$(nRow).attr("data-json", JSON.stringify(aData));
}
});
Colored by Color Scripter
```

이런 식이다.

우선 DataTables에서 X축 스크롤을 뽑으려면...

**scrollX**를 true로 하거나 길이를 지정하고 (여기선 그냥 100%로),

**scrollXInner**를 **scrollX**보다 크게 지정하면 된다.

(위 코드처럼 column을 지정한 것이 아니라면, **scrollXInner**를 130%로 하는 등의 방법도 있다.)

column의 크기 지정을 따로 하지 않는 경우에는 이 두가지만으로 안될 수도 있는데,

이 때에는 당황하지 말고 이걸 넣어주자.

```
table tbody td {
min-width: 100px;
}
```

더도말고 덜도말고 100px여야 한다. 50px는 또 안된다.

되게 븅신같긴 한데, 이래야 되더라.

근데 솔직히 한 화면에 다 보이는 것을 포기하고 X축 스크롤을 만드는 경우라면

그냥 위 코드처럼 column길이 지정을 하나하나 이쁘게 다 해 주는 경우가 더 많으리라 생각된다...

길이지정은 보다시피 **columnDefs**에서 **target**을 정하고 **width를 설정**해 주면 된다.

그리고 나서 그 **width의 합계**를 **scrollXInner**로 지정해 주면 딱 맞게 X축 스크롤이 생긴다.
