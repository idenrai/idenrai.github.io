---
title: "테이블 내용을 클립보드에 복사하기"
date: 2016-06-08
tags: ["Tech", "JavaScript", "javascript", "클립보드", "createTextRange", "window.getSelection"]
tistory_url: "https://idenrai.tistory.com/69"
---

jQuery DataTables등, 각종 테이블에 입력된 내용을 엑셀로 옮길 필요가 있었다.

그냥 마우스 드래그로 대충 긁어서 Ctrl+C, Ctrl+V를 해도 된다만...

아무래도 엔드유저를 대상으로 하다 보니, 버튼 클릭만으로 클립보드 복사를 해야 했다.

예전에 회사 선배 한 분이 **document.body.createTextRange()**를 써서 해결하려 했던 것 같은데...

결국엔 익스플로러에서만 된다고 하고는 내비뒀더라.

뭐, 여하튼 알아보았더니 크롬 등에서도 다 방법이 있길래 적어보도록 한다.

**1\. 일단 버튼을 만들고**

```
<div class="pull-right" style="margin-bottom: 10px; padding-bottom: 10px;">
<a id="ctrlCButton" class="btn btn-info btn-small" style="width: 100px;" rel="tooltip" data-original-title="クリップボードにコピーします">
<i class="icon-pencil icon-white">i>
<span class="btnTitle" style="vertical-align: text-top;">Ctrl + Cspan>
a>
div>
Colored by Color Scripter
```

**2\. javascript에서 아래와 같이 적어주면 끝**

```
/**
* Ctrl + C ボタン押下
*/
$(document).on('click', '#ctrlCButton', function() {
if (document.body.createTextRange) {
//createTextRangeをサポート(IE)
var textRange = document.body.createTextRange();
textRange.moveToElementText(document.getElementById("projectHanbai_table"));
textRange.execCommand("Copy");
$common.notice_success('クリップボードにコピーしました。');
} else {
//createTextRangeを非サポート(IE以外)
window.getSelection().selectAllChildren(document.getElementById('projectHanbai_table'));
document.execCommand('Copy');
$common.notice_success('クリップボードにコピーしました。');
}
});
Colored by Color Scripter
```
