---
title: "VBA 셀에 문자열 설정"
date: 2020-01-15
tags: ["Tech", "VBA", "vba", "셀", "문자열", "0이"]
tistory_url: "https://idenrai.tistory.com/209"
---

「0001」이라는 코드를 파라메터로 받아 셀에 설정하는 Sub이 있다. 이 경우, 먼저 대상이 되는 셀의 속성을 「표준」에서 「문자열」로 바꿔야 한다. 표준 속성의 셀에 그대로 해당 코드를 넣을 경우, 값이 그냥 1이 되어 버리기 때문. 코드는 아래와 같다.

```
Sub SetCompanyCode(index, companyCode)

	'시트
	Dim SumSheet As Worksheet
	Dim shtSum As String
	shtSum = "SumSheet"

	'워크시트 Set
	Set SumSheet = ThisWorkbook.Sheets(shtSum)
	'Cell속성을 문자열로 변경
	SumSheet.Cells(1, index).NumberFormat = "@"
    
	'회사 코드 입력
	SumSheet.Cells(1, index).Value = companyCode
    
End Sub
```
