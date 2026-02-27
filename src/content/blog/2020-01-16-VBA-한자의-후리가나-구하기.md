---
title: "VBA 한자의 후리가나 구하기"
date: 2020-01-16
tags: ["Tech", "VBA", "가타카나", "히라가나", "vba", "한자", "후리가나", "한자를"]
tistory_url: "https://idenrai.tistory.com/211"
---

일본어는 쓰는 문자가 많아서 사람 짜증나게 하는데, 그래서 VBA에서는 한자를 가나로 변환해주는 함수 「[GetPhonetic()](https://docs.microsoft.com/ja-jp/office/vba/api/excel.application.getphonetic)」를 지원한다. 이를 사용하여 아래와 같은 자동 변환 매크로를 만들 수 있다.

**A열 : 변환 대상** **B열 : 전각 가타카나** **C열 : 전각 히라가나** **D열 : 반각 가타카나**

```
Sub MakeWordDict()

    '// 시트 선언
    Dim shtWork As String
    shtWork = "Work"
    
    '// 변수 선언
    Dim endRow As String
    Dim targetRange As Range
    Dim targetCell As Range
    Dim cellValue As String
    Dim cellValueKana As String
    
    '// 시트 활성화
    ThisWorkbook.Sheets(shtWork).Activate
    
    '// 마지막 행 구하기
    endRow = ActiveSheet.Cells(ActiveSheet.Rows.Count, 1).End(xlUp).Row
    
    '// Range 세팅
    Set targetRange = Range(Cells(1, 1), Cells(endRow, 1))
    
    '// Range의 행만큼 Loop
     For Each targetCell In targetRange
        
        '// Cell값 취득
        cellValue = targetCell.Value
        
        '// 한자의 후리가나 취득
        cellValueKana = Application.GetPhonetic(cellValue)
        
        '// 전각 가타카나를 B열에 설정 (기본값)
        targetCell.Offset(0, 1).Value = cellValueKana
        
        '// 전각 히라가나를 C열에 설정
        'targetCell.Offset(0, 2).Value = StrConv(cellValueKana, vbHiragana)
        
        '// 반각 가타카나를 D열에 설정
        'targetCell.Offset(0, 3).Value = StrConv(cellValueKana, vbKatakana + vbNarrow)
        
    Next

End Sub
```
