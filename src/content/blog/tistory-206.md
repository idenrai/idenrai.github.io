---
title: "VBA 지정 폴더 내의 파일 Loop"
date: 2020-01-14
tags: ["Tech", "VBA"]
tistory_url: "https://idenrai.tistory.com/206"
---

```
Sub ClickRead()

    '화면 업데이트 일시 중지
    Application.ScreenUpdating = False

    '정수
    Dim filePath As String
    Dim fileList() As String
    Dim FileName As String
    Dim i As Integer
    
    '폴더 선택
    With Application.FileDialog(msoFileDialogFolderPicker)
        If .Show = True Then
            filePath = .SelectedItems(1)
        End If
    End With
    
    '파일패스를 취득하지 못한 경우
    If filePath = "" Then
        MsgBox "폴더를 선택해 주세요"
        Exit Sub
    End If
    
    '파일패스 맨뒤에 "\"가 없을 경우 추가
    If Right(filePath, 0) <> "\" Then
        filePath = filePath & "\"
    End If

    '선택한 폴더 내의 모든 파일 취득
    FileName = Dir(filePath & "*.*")
    
    '선택한 폴더의 모든 파일에 대하여 이하의 처리
    While FileName <> ""
        i = i + 1
        ReDim Preserve fileList(1 To i)
            '각 시트에 대한 특정 처리
            'ex) 모든 시트의 내용을 지금의 시트에 합치는 등            
            Call SumListFile(filePath + FileName, i)
        FileName = Dir()
    Wend

    '화면 업데이트 일시 중지 해제
    Application.ScreenUpdating = True

End Sub
```
