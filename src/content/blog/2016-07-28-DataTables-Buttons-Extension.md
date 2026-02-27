---
title: "DataTables - Buttons Extension"
date: 2016-07-28
tags: ["Tech", "jQuery DataTables"]
tistory_url: "https://idenrai.tistory.com/81"
---

jQuery DataTables의 추가 기능 중,

[Buttons Extension](https://datatables.net/extensions/buttons/)이라는 기능이 있다.

이전 버전의 **[TableTools-Buttons](https://datatables.net/extensions/tabletools/)**와 동일한 기능이다.

DataTables의 다른 항목과 마찬가지로, 테이블에 붙어 편의 기능을 제공하는데...

이름 그대로 버튼을 달아준다.

설정하는 것 만으로 복사, 출력, csv・excel・pdf출력이 가능하다.

기본 출력 위치가 lengthChange와 동일하기에,

아무 설정도 하지 않고 Buttons를 달았다면 lengthChange가 사라지는 불상사가 발생한다.

이는 **[DOM](https://datatables.net/release-datatables/examples/basic_init/dom.html)**옵션을 통해 해결할 수 있다.

DOM은 단 한줄로 DataTable에 표시할 항목을 설정 가능하다.

데이터테이블의 각 옵션은 기본적으로 위치가 고정되어 있는데,

dom설정을 통해, CSS변경 없이 해당 항목의 위치 이동이 가능하다.

```
require('datatables.net-buttons')(window, $);
require('../sass/plugin/datatables/buttons.dataTables.css');
require( 'datatables.net-buttons/js/buttons.html5.js')();
require('datatables.net-buttons/js/buttons.print.js')(window, $);
```

일단 위와 같이, main.js 등에서 require를 달아 주고...

```
require('datatables.net-buttons/js/buttons.flash.js')(window, $);
```

Flash로 버튼을 달고 싶다면, html5 대신 flash를 달아주면 된다.

```
dataTables: {dom: '<"top"Blf>rt<"bottom"ip><"clear">',buttons: ['csv', 'excel', 'pdf', 'print'],...}
dataTables: {
dom: '<"top"Blf>rt<"bottom"ip><"clear">',
buttons: ['csv', 'excel', 'pdf', 'print'],
.
.
.
}
Colored by Color Scripter
```

위의 DOM설정을 통해

top에 Button과 lengthChange, filter를 설정하고

테이블을 중간,

bottom에 info와 paginate를 설정하였다.

아래의 예와 같이, pull-right, pull-left 클래스를 이용해 좌우 위치 변경 또한 가능하다.

추가로, extend를 통해 버튼의 상세 설정을 바꿀 수도 있다.

**text** : 버튼 내용,

**className** : class부여

**title** : 파일 출력 및 저장시의 초기 파일명

**bom** : CSV의 인코딩을 UTF-8 BOM으로 설정 (기본 FALSE) --- Buttons Plugin 1.2.2부터

```
dataTables: {dom: '<"top"l<"pull-right"<"pull-left"f>B>>rt<"bottom"ip>',buttons: [{extend: 'csv',text: '一覧ファイル出力',title:'一覧ファイル',bom: true}],...}
dataTables: {
dom: '<"top"l<"pull-right"<"pull-left"f>B>>rt<"bottom"ip>',
buttons: [{
extend: 'csv',
text: '一覧ファイル出力',
title:'一覧ファイル',
bom: true
}],
...
}
Colored by Color Scripter
```

Button Plugin 1.2.2가 npm에 없는 관계로,

BOM 대응을 위한 다른 해결책을 찾아 보니 아래 코드로 해결되었다.

data가 한줄짜리 string으로 잘 붙어서 나오니까,

그냥 customize로 데이터에 BOM만 붙여서 리턴하면 됨.

```
dataTables: {dom: '<"top"l<"pull-right"<"pull-left"f>B>>rt<"bottom"ip>',buttons: [{extend: 'csv',text: '一覧ファイル出力',title:'一覧ファイル',customize: function(data, config) {data = '\ufeff' + data;return data;}}],...}
dataTables: {
dom: '<"top"l<"pull-right"<"pull-left"f>B>>rt<"bottom"ip>',
buttons: [{
extend: 'csv',
text: '一覧ファイル出力',
title:'一覧ファイル',
customize: function(data, config) {
data = '\ufeff' + data;
return data;
}
}],

...

}
Colored by Color Scripter
```

2016/08/26 추가사항

**[NPM패키지](https://datatables.net/download/npm)**

**[HTML5방식 CSV출력](https://datatables.net/extensions/buttons/examples/html5/simple.html)**

Flash방식보다, HTML5쪽이 더 간편한 것 같아, 이 쪽으로 대응 완료.

extend부분만 html버튼으로 바꿔주면 된다.

```
extend: 'csvHtml5',
```
