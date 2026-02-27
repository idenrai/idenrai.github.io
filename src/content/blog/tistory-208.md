---
title: "VBA 셀 내의 강제개행코드(Shift + Enter) 삭제"
date: 2020-01-15
tags: ["Tech", "VBA", "vba", "개행코드", "Shift+Enter"]
tistory_url: "https://idenrai.tistory.com/208"
---

B열의 모든 셀에 대하여, 강제개행코드를 삭제하기

```
'변수 선언 및 지정
Dim shtWork As String
shtWork = "Work"

Dim rngAll As Range
Dim rngTarget As Range
Dim cellStr As String
Dim targetCol As String
Dim endRow As Integer

'개행코드를 삭제할 열 지정
targetCol = "B"

'시트 활성화
Sheets(shtWork).Activate

'활성화된 시트 내 지정 열의 마지막 줄 구하기
endRow = ActiveSheet.Cells(ActiveSheet.Rows.Count, 2).End(xlUp).Row + 1

'B열을 Range지정
Set rngAll = Range(Cells(1, targetCol), Cells(endRow, targetCol))

'지정 Range를 Loop
For Each rngTarget In rngAll
    '개행코드(Chr(10))가 존재할 경우
    If InStr(rngTarget, Chr(10)) Then
        '타겟 셀의 값을 따와서
        cellStr = rngTarget.Value
        '개행코드를 지우고 다시 셀에 값 저장
        rngTarget.Value = Replace(cellStr, Chr(10), "")
    End If
Next rngTarget
```
