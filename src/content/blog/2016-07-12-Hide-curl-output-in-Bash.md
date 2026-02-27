---
title: "Hide curl output in Bash"
date: 2016-07-12
tags: ["Tech", "Shell"]
tistory_url: "https://idenrai.tistory.com/79"
---

Bash로 CURL을 돌리는 과정에서...

커맨드창에 자꾸 CURL 관련 아웃풋이 출력되더라.

```
2016.07.12 16:17:34 PROCESS START
Delete data which fulfills the following condition
: Not Covered.

% Total % Received % Xferd Average Speed Time Time Time Current
Dload Upload Total Spent Left Speed
0 47 0 47 0 0 22 0 --:--:-- 0:00:02 --:--:-- 22
NOT_COVERED : This operation was successful.
{
"ReturnCode" : "0",
"ProcessResult" : 0
}

2016.07.12 16:17:36 PROCESS END
Delete data which fulfills the following condition
: Not Covered.
Colored by Color Scripter
```

그냥 START-결과-END만 출력하고 싶었기에 찾아보니

```
RESPONSE=`curl -s "$URL$NOT_COVERED?username=$1&full_name=$2" -H "Authorization: Bearer $TOKEN"`
```

curl 다음에 -s 만 붙여주니 해결되었다.

**\-s, --silent**

Silent or quiet mode.

Don't show progress meter or error messages. Makes Curl mute.

It will still output the data you ask for, potentially even to the terminal/stdout unless you redirect it.

참조 : [**curl Man Page - Haxx**](https://curl.haxx.se/docs/manpage.html)
