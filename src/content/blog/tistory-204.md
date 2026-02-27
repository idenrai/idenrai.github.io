---
title: "VBA 워크시트 초기화"
date: 2020-01-14
tags: ["Tech", "VBA", "초기화", "vba"]
tistory_url: "https://idenrai.tistory.com/204"
---

**1\. 전체 시트 초기화**

```
'워크시트 초기화
Sub ClearSheet(TargetSheet)
	'타겟 시트로 이동하여, 시트를 초기화
	Sheets(TargetSheet).Activate
	With ActiveSheet
		Range("A1:XFD1048576").ClearContents
	End With
End Sub
```

```
'WorkSheet선언
Dim shtWorkKnwl As String
shtWorkKnwl = "Work_Knowledge"

'시트 초기화
Call ClearSheet(TargetSheet:=shtWorkKnwl)
```

**2\. Range지정 초기화**

```
'워크시트의 특정 Range초기화
Sub CustomClearSheet(TargetSheet, TargetRange)
	'TargetSheet로 이동하여 지정한 Range를 초기화 
	Sheets(TargetSheet).Activate
	With ActiveSheet
		Range(TargetRange).ClearContents
	End With
End Sub
```

```
'WorkSheet선언
Dim shtWorkKnwl As String
shtWorkKnwl = "Work_Knowledge"

'시트 초기화
Call ClearSheet(TargetSheet:=shtWorkKnwl, TargetRange:="B4:XFD1048576")
```
