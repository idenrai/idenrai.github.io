---
title: "VBA 테이블 내용을 JSON으로 출력"
date: 2020-01-16
tags: ["Tech", "VBA", "JSON", "vba", "JSON파일"]
tistory_url: "https://idenrai.tistory.com/210"
---

0001

0002

AAA

XXX

BBB

YYY

CCC

ZZZ

위와 같은 테이블을, 아래와 같은 JSON으로 바꾸어 출력하고자 한다.

```
{
  "0001" : ["AAA", "BBB", "CCC"],
  "0002" : ["XXX", "YYY", "ZZZ"]
}
```

코드는 다음과 같다.

```
Sub MakeJson()
    
    '테이블이 있는 시트 설정
    Dim shtWork As String
    shtWork = "Work"
    
    '시트 활성화
    ThisWorkbook.Sheets(shtWork).Activate
    
    '변수 정의
    Dim fileName, fileFolder, filePath As String
    Dim isFirstCol As Boolean
    Dim i, u As Long
    Dim maxRow, maxCol As Long

    'JSON파일 정의
    Const extension = ".json"
    Const file = "workList"
    Dim strYYYYMMDD As String
    strYYYYMMDD = Format(Now, "yyyymmdd")
    fileName = file & "_" & strYYYYMMDD & extension  'JSON파일명
    fileFolder = ThisWorkbook.Path & "\" & "output"  '생성한 파일을 보존할 폴더명
    filePath = fileFolder & "\" & fileName           '파일의 Path
     
    '이미 같은 이름의 파일이 있으면 삭제하기
    If Dir(filePath) <> "" Then
        Kill filePath
    End If
    
    'JSON 생성용 Object만들기
    Dim txt As Object
    Set txt = CreateObject("ADODB.Stream")
    txt.Charset = "UTF-8"
    txt.Open
    
    '마지막 열 구하기
    maxCol = ActiveSheet.Range("A1").End(xlToRight).Column
    
    'JSON시작 태그
    '첫번째 열을 플래그로 둠
    isFirstCol = True
    txt.WriteText "{" & vbCrLf, adWriteLine
    
    '열 단위 Loop
    For u = 1 To maxCol
    
        maxRow = ActiveSheet.Cells(ActiveSheet.Rows.Count, u).End(xlUp).Row
    
        '열을 확인하여, 첫번째가 아닌 경우 ","를 삽입
        If isFirstCol = True Then
            isFirstCol = False
        Else
            txt.WriteText "," & vbCrLf, adWriteLine
        End If
        
        'A행의 내용을 Name으로 설정
        txt.WriteText vbTab & """" & Cells(1, u).Value & """" & ":[" & vbCrLf, adWriteLine

        '행 단위 Loop
        For i = 2 To maxRow
             
            '마지막 행이 아닌 경우 ","를 삽입
            If i = maxRow Then
                txt.WriteText vbTab & vbTab & """" & Cells(i, u).Value & """" & vbCrLf, adWriteLine
            Else
                txt.WriteText vbTab & vbTab & """" & Cells(i, u).Value & """" & "," & vbCrLf, adWriteLine
            End If
            
        Next i
             
        '행 루프가 끝나면 배열을 닫음
        txt.WriteText vbTab & "]", adWriteLine
    
    Next u
     
    'JSON 종료 태그
    txt.WriteText vbCrLf, adWriteLine
    txt.WriteText "}" & vbCrLf, adWriteLine
     
    'Object의 내용을 파일로 저장
    txt.SaveToFile filePath
     
    'Object닫기
    txt.Close
     
    MsgBox (fileName & " 파일을 생성하였습니다.")
     
End Sub
```
