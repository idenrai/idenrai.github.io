---
title: "Excel파일에서 JSON을 불러와 재구성하기"
date: 2019-12-17
tags: ["Tech", "JavaScript", "node.js", "convert-excel-to-json", "Excel을", "JSON을"]
tistory_url: "https://idenrai.tistory.com/202"
---

node.js 툴에서 excel파일을 json으로 불러와, 데이터를 만들어야 했다. 일단 원본이 되는 엑셀 파일은 다음과 같다.


이걸 [**convert-excel-to-json**](https://www.npmjs.com/package/convert-excel-to-json)으로 불러와서 재구성한다. 코드는 다음과 같다.

```
const excelToJson = require('convert-excel-to-json');

// 엑셀 파일
const input_form_file = '../data/example.xlsm';

function getDataSheet(){
  const excel_sheets = excelToJson({
    sourceFile: input_form_file,
    header: {
      rows: 3 // 필요없는 줄을 자를 수 있다
    },
    // 원하는 시트만 골라서 뽑아내기
    sheets: ['stock_list_1', 'stock_list_2']
  });

  // input_data에 모든 시트의 데이터를 삽입
  let input_data = [];
  input_data = input_data.concat(getDataListFromSheet("재고1", excel_sheets.stock_list_1));
  input_data = input_data.concat(getDataListFromSheet("재고2", excel_sheets.stock_list_2));

  return input_data;
}

// 시트별 JSON 재구성
function getDataListFromSheet(sheet_name, input_sheet){
  const target_data = [];

  // 한 줄 분의 데이터 작성
  input_sheet.forEach(input_line => {
    const line_data = {};

    // 시트명
    line_data.sheet_name = sheet_name;

    // A, B, C열의 값 넣기
    line_data.no = input_line.A;
    line_data.name = input_line.B;
    line_data.category = input_line.C;

    // 넣은 데이터는 삭제
    delete input_line.A;
    delete input_line.B;
    delete input_line.C;

    // D열부터의 데이터를 전부 배열로 바꿈
    line_data.materials = jsonToArray(input_line);

    // 데이터가 하나라도 없으면 아무것도 안함
    if (!line_data.no || !line_data.name || !line_data.category || line_data.materials.length == 0) {
      return;
    }

    // 한 줄 분의 데이터를 시트 전체의 데이터에 삽입
    target_data.push(line_data);
  });
  return target_data;
}

// JSON을 배열로 변경
function jsonToArray(json){
  const result = [];
  const keys = Object.keys(json);
  keys.forEach(function(key){
      result.push(json[key]);
  });
  return result;
}

module.exports = {
  data: getDataSheet()
}
```

이를 통해 취득하는 데이터는 다음과 같은 형식이 된다.

```
[
  {
    sheet_name: '재고1',
    no: 1,
    name: '이름1',
    category: '분류1',
    materials: ['재료a', '재료b', '재료c', '재료d', '재료e']
  },
  {
    sheet_name: '재고2',
    no: 2,
    name: '이름2',
    category: '분류2',
    materials: ['재료f', '재료g', '재료h', '재료i']
  },
  ...
]
```

이를 통해 엑셀 파일을 간단히 JSON으로 바꾸어 처리할 수 있다.

왜 CSV로 해도 될 것을 엑셀로 했냐 하면... 여기선 지금 엑셀의 데이터 시트를 JSON으로 바꾸는 처리만 했지만, 사실 이 엑셀 파일의 다른 시트 중에는 특정 시트의 특정 데이터만 고르는 등의 설정 시트도 있기 때문이다. 이 설정 시트도 다 JSON으로 바꿔서, node.js툴 내에서 조작하도록 하였다. 그건 그냥 셀을 지정하여 뽑아오기만 하면 되는 거니까, 여기선 딱히 설명하지 않는다.
