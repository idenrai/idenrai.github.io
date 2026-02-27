---
title: "CSV Download Button"
date: 2016-12-19
tags: ["Tech", "React.js", "react.js", "csv"]
tistory_url: "https://idenrai.tistory.com/104"
---

**1\. Data 준비**

```
const data = {
buttonStatus: [
{ name: 'CSV', type: 'csv', status: true },
...
],
csvFileName: 'export.csv',
columns: [
{
key: 'name',
label: 'Dessert (100g serving)',
tooltip: '英語',
sortable: true,
...
},
...
],
rows: [
{
name: 'Frozen yogurt',
jname: 'フローズンヨーグルト',
kname: '프로즌 요구르트',
...
},
...
]
}
Colored by Color Scripter
```

**2\. CSV Download Button 작성**

```
setButton(btnStatus) {
if (!btnStatus || btnStatus.length === 0) return null;
this.btnList = btnStatus.map((btn) => {
if (!btn.status) return false;
switch (btn.type) {
case 'csv':
return (
<RaisedButton
label={btn.name}
onClick={this.handleCSVButtonClick}
style={{ marginRight: 10 }}
/>
);
default:
return false;
}
});
return (
<div style={{ padding: 10 }}>
{this.btnList}
</div>
);
}
Colored by Color Scripter
```

**3\. Data를 변환**

\- Column명은 Columns의 label을 사용

\- 실제 데이터를 따올 key는 Columns의 key를 사용

```
convertRowsToCsv() {
const columns = this.state.columns;
const rows = this.state.rows;
let result = null;
const columnDelimiter = ',';
const lineDelimiter = '\n';
const columnRows = [];
columns.forEach((column) => {
columnRows.push(column.label);
});
result = '';
result += columnRows.join(columnDelimiter);
result += lineDelimiter;

rows.forEach((row) => {
let count = 0;
columns.forEach((column) => {
const key = column.key;
if (count > 0) result += columnDelimiter;
result += row[key];
count += 1;
});
result += lineDelimiter;
});
return result;
}
Colored by Color Scripter
```

**4\. Button Click시 변환한 Data를 Download**

```
handleCSVButtonClick(event) {
event.preventDefault();
const data = this.convertRowsToCsv();
if (!data || data.length === 0) return;
const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
const fileName = this.props.data.csvFileName;
const blob = new Blob([bom, data], { type: 'text/csv' });
if (window.navigator.msSaveBlob) {
window.navigator.msSaveBlob(blob, fileName);
window.navigator.msSaveOrOpenBlob(blob, fileName);
} else {
const csv = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.setAttribute('href', csv);
link.setAttribute('download', fileName);
link.click();
}
}
Colored by Color Scripter
```
