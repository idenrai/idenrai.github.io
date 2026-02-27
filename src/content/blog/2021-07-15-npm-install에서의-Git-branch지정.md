---
title: "npm install에서의 Git branch지정"
date: 2021-07-15
tags: ["Tech", "NPM", "npm", "exceljs"]
tistory_url: "https://idenrai.tistory.com/249"
---

레포트 출력 API를 개발중이다.

RDS에서 데이터 검색 후 Lambda에서 데이터를 기존 준비된 엑셀 파일에 넣어 DL까지.

데이터 취득 후엔 xlsx-populate를 사용하여 리스트째로 엑셀에 넣었고,

작성된 엑셀 파일을 export하는데에는 exceljs를 사용하였다.

근데 exceljs를 사용해서 export를 해 보니, 조건부서식이 다 작살나더라.


내가 이 조건부서식 만들려고 얼마나 개고생을 했는데...

처음엔 전송방법에 문제가 있나 싶어 Header를 이리저리 바꿔보았는데, 결과는 다 똑같았다.

그래서 혹시나 하여, 그냥 exceljs로 멀쩡한 파일을 읽은 후, 그대로 다시 아웃풋해보니 박살나있는 것을 확인.

exceljs의 문제더라.

알아보니 나와 같은 피해자들이 많았다.

[https://github.com/exceljs/exceljs/issues/1305](https://github.com/exceljs/exceljs/issues/1305)

[

\[BUG\] Errors when opening file in Excel after saving a file with conditional formatting · Issue #1305 · exceljs/exceljs

? Bug Report Lib version: 3.9.0 Steps To Reproduce const Excel = require("exceljs"); const fs = require("fs"); const inputFilePath = "input.xlsx"; const outputFilePath...

github.com

](https://github.com/exceljs/exceljs/issues/1305)

근데 좀 더 찾아보니, 이미 올해 4월에 아래 Commit으로 해결이 되어 있더라.

[https://github.com/exceljs/exceljs/pull/1574](https://github.com/exceljs/exceljs/pull/1574)

[

Fixed conditional format corrupting sheet #1305 by rolandostar · Pull Request #1574 · exceljs/exceljs

Summary I'm using a template for styling, and filling out data with ExcelJS. When my template had conditional formatting enabled on it, opening it and writing the file (even without data being ...

github.com

](https://github.com/exceljs/exceljs/pull/1574)

이미 해결책이 나왔고, Master Branch에 Merge도 되었는데, NPM에 공개된 최신 버전에는 아직 안들어가있는거다.

일단 수동으로 node\_modules/exceljs에서 위의 커밋대로 수정을 해 보니, 제대로 돌아가는 것이 확인되었다.

조만간 최신 버전이 릴리즈되기야 하겠지만서도, 일단 스케줄상 오늘까지 이 일을 마쳐야 하는지라...

Git의 특정 브랜치를 직접 npm install하는 형식으로 해결하기로 했다.

```
# npm install username/repository#branchName --save
npm install exceljs/exceljs#master --save
```

이렇게 하면 해당 브랜치의 내용이 인스톨되며, package.json에는 아래와 같이 기재된다.

```
"exceljs": "github:exceljs/exceljs#master"
```

일단 이걸로 해결.
