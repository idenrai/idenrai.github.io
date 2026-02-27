---
title: "VBA 중복행 삭제"
date: 2020-01-14
tags: ["Tech", "VBA", "vba", "중복", "중복행"]
tistory_url: "https://idenrai.tistory.com/205"
---

**1\. 모든 열의 중복행 삭제**

```
'지정한 워크시트에서 중복행 삭제
Sub DeleteDuplicate(TargetSheet)
    '시트 설정
    Set SumSheet = ThisWorkbook.Sheets(TargetSheet)
    
    '데이터의 마지막 행 취득
    Dim intArray As Variant, i As Integer
    Dim rng As Range
    Set rng = SumSheet.UsedRange.Rows

    With rng
        '모든 칼럼을 비교
        ReDim intArray(0 To .Columns.Count - 1)
        For i = 0 To UBound(intArray)
            intArray(i) = i + 1
        '중복되는 데이터 삭제
        Next i
        .RemoveDuplicates Columns:=(intArray), Header:=xlNo
    End With
End Sub
```

**2\. 하나의 열에서 중복행 삭제**

```
'특정 시트의 지정한 열에서 중복 삭제
Sub DeleteDuplicateCol(TargetSheetName, StartRow, Col)
    
    Dim TargetSheet As Worksheet
    Dim EndRow As Integer
    
    Set TargetSheet = ThisWorkbook.Sheets(TargetSheetName)
    EndRow = TargetSheet.Cells(TargetSheet.Rows.Count, Col).End(xlUp).Row
    
    '지정한 열을 대상으로 StartRow~EndRow에서 중복 삭제
    Range(TargetSheet.Cells(StartRow, Col), TargetSheet.Cells(EndRow, Col)).RemoveDuplicates _
    Columns:=Array(1), Header:=xlYes
    
End Sub
```

사용 방법은 아래와 같다.

```
Dim shtWork As String
shtWork = "Work"

Dim targetCol As Integer
targetCol = 2

'시트의 전체 열 비교하여 중복행 삭제
Call DeleteDuplicateCol(TargetSheetName:=shtWork)

'지정한 열의 중복행 삭제
Call DeleteDuplicateCol(TargetSheetName:=shtWork, StartRow:=2, Col:=targetCol)
```
