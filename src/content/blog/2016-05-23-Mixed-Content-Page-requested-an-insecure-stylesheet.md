---
title: "Mixed Content : Page requested an insecure stylesheet"
date: 2016-05-23
tags: ["Tech", "HTML・CSS"]
tistory_url: "https://idenrai.tistory.com/68"
---

jQueryUI 버튼을 하나 따서 쓰는데

로컬에서는 잘만 되던 것이, 릴리즈를 하고 나니 깨지더라.

오류 내용은

Mixed Content: The page at 'https://--------------' was loaded over HTTPS, but requested an insecure stylesheet 'http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/ui-lightness/jquery-ui.css'. This request has been blocked; the content must be served over HTTPS.

이런 내용이었다.

그냥 jQueryUI의 링크를 다음과 같이 http://~~~에서 https://~~~로 수정하여 해결했다.

```
<link type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />
```

참조 : [https://developer.mozilla.org/en-US/docs/Security/Mixed\_content/How\_to\_fix\_website\_with\_mixed\_content](https://developer.mozilla.org/en-US/docs/Security/Mixed_content/How_to_fix_website_with_mixed_content)
