---
title: "Key-Break"
date: 2017-04-27
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/127"
---

@markdown

\# Key-Break

DB에서 습득하는 데이터를 그 내용에 따라 분류하여 출력하기

\- 데이터는 다음의 세 테이블 (Users, Authorities, User-Authority)에서 습득

\- User는 복수의 Authority를 가질 수 있음.

\- Authority가 복수인 유저의 경우, main key인 user.id가 중복됨

\- 데이터를 출력할 테이블은 user.id를 key로 가지므로, id가 중복되는 경우 에러가 발생.

\- 두 데이터를 하나로 합치고, 테이블에 표시되는 Auth에는 Authority.name을 ,로 연결하여 출력할 것. ex) "Admin, User"

\- 각 User의 Authority 데이터는 다른 화면에서 사용되므로, 따로 Json Object로 만들어 Users State에 함께 보관할 것.

\### 데이터 습득

\`\`\`javascript

handleSearch = async () => {

const {

username,

} = this.state.search;

let url = '';

if (username.length > 0) {

url = \`/api/users?username=${username}\`;

} else {

url = '/api/users';

}

await this.axios.get(url)

.then((res) => {

this.createTable(res.data);

})

.catch((err) => {

this.notice(err.response.data.message, 'error');

return;

});

}

\`\`\`

\### 데이터 정렬, 가공, 테이블 작성

\- 정렬 및 setState를 통해 테이블 출력

\`\`\`javascript

createTable = (data) => {

if (!data.length > 0) this.notice(Message.validate.noData, 'warning');

data.sort((a, b) => {

const aValue = a.id;

const bValue = b.id;

if (aValue < bValue) return -1;

if (aValue > bValue) return 1;

return 0;

});

const adjustedData = this.checkMultiAuth(data);

const tableData = this.makeTableData(adjustedData);

this.setState(

assign(this.state.tableData, { rows: tableData })

);

}

\`\`\`

\- Key-Break 실시

\`\`\`javascript

checkMultiAuth = (rows) => {

const adjustedData = \[\]; // 가공한 데이터 보존 및 Return

let stockId = null; // 이전 id 저장

let stockObject = null; // 이전 object 저장

let stockAuthObject = \[\]; // authority object 저장

rows.forEach((row, index) => {

// 첫 Row는 바로 Stock에 넣는다.

if (index === 0) {

stockId = row.id;

stockObject = row;

stockAuthObject.push({

authorities\_id: row.authorities\_id,

authorities\_authority: row.authorities\_authority,

authorities\_name: row.authorities\_name,

});

return;

}

// 2번째 row 이후부터는 id가 중복되는지 분별

if (row.id === stockId) {

// row의 id가 이전과 동일할 경우, auth object를 추가하고 다음 row로

stockAuthObject.push({

authorities\_id: row.authorities\_id,

authorities\_authority: row.authorities\_authority,

authorities\_name: row.authorities\_name,

});

} else {

// id가 이전 row와 다를 경우, stock에 넣어 두었던 데이터를 전부 adjustedData에 저장

stockAuthObject.sort((a, b) => {

const aValue = a.authorities\_id;

const bValue = b.authorities\_id;

if (aValue < bValue) return -1;

if (aValue > bValue) return 1;

return 0;

});

assign(stockObject, { auths: stockAuthObject });

adjustedData.push(stockObject);

// stock을 지금의 row로 재설정

stockAuthObject = \[\];

stockId = row.id;

stockObject = row;

stockAuthObject.push({

authorities\_id: row.authorities\_id,

authorities\_authority: row.authorities\_authority,

authorities\_name: row.authorities\_name,

});

}

// 현재의 row가 마지막 row일 경우, stock을 전부 adjustedData에 저장하고 작업 종료

if (index === rows.length - 1) {

stockAuthObject.sort((a, b) => {

const aValue = a.authorities\_id;

const bValue = b.authorities\_id;

if (aValue < bValue) return -1;

if (aValue > bValue) return 1;

return 0;

});

assign(stockObject, { auths: stockAuthObject });

adjustedData.push(stockObject);

}

return;

});

return adjustedData;

}

\`\`\`

\- 각 row에 넣었던 auth object 내부 정렬 및 테이블 출력용 데이터 가공

\`\`\`javascript

makeTableData = (rows) => {

const tableData = \[\];

rows.forEach((row) => {

let authorityName = '';

if (row.auths.length > 1) {

row.auths.forEach((auth, index) => {

if (index > 0) authorityName = \`${authorityName}、\`;

authorityName = \`${authorityName}${auth.authorities\_name}\`;

});

} else {

authorityName = row.authorities\_name;

}

// 그외

const lastAccountLockedTime = row.last\_account\_locked\_time ?

moment(row.last\_account\_locked\_time).format('YYYY-MM-DD HH:mm:ss') : row.last\_account\_locked\_time;

const newRow = {

id: row.id,

username: row.username,

authority: row.auths,

authorities\_name: authorityName,

// 그외

last\_account\_locked\_time: lastAccountLockedTime,

};

tableData.push(newRow);

});

return tableData;

}

\`\`\`
