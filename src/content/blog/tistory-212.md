---
title: "VBA 정규표현식(Regex) 사용"
date: 2020-01-17
tags: ["Tech", "VBA", "정규표현식", "vba", "regex", "VBA에서"]
tistory_url: "https://idenrai.tistory.com/212"
---

A열의 내용을 B열로 복사하되, A열에 영어 알파벳이 포함되어 있는 경우 B열은 공란으로 두기

```
Sub RegexTest()

	'// 시트 선언
    Dim shtWork As String
    shtWork = "Work"
    
    '// 변수 선언
    Dim targetRange As Range
    Dim targetCell As Range
    Dim cellValue As String
    Dim endRow As Integer
    
    '// 영어 검출용 Regex
    Dim regex As Object
    Set regex = CreateObject("VBScript.RegExp")
    regex.Pattern = "[a-zA-Z]"
    regex.Global = True
    
    '// 시트 활성화
    ThisWorkbook.Sheets(shtWork).Activate

    '// 최종행 지정 및 Range설정
    endRow = ActiveSheet.Cells(ActiveSheet.Rows.Count, 1).End(xlUp).Row
    Set targetRange = Range(Cells(1, 1), Cells(endRow, 1))
    
    '// Range Loop
    For Each targetCell In targetRange
        
        '// Cell의 값 취득
        cellValue = targetCell.Value
        
        '// 영어가 검출될 경우 cellValue를 ""로 설정
        Dim matches As Variant
        Set matches = regex.Execute(cellValue)
        If matches.Count > 0 Then
            cellValue = ""
        End If
        
        '// B열에 cellValue 설정
        targetCell.Offset(0, 1).Value = cellValue
        
    Next

End Sub
```
