---
title: "Display date in yyyy-mm-dd format in Bash"
date: 2016-07-12
tags: ["Tech", "Shell"]
tistory_url: "https://idenrai.tistory.com/80"
---

Bash에서의 현재 날짜 및 시간 출력

```
echo "$(date '+%Y.%m.%d') $(date '+%H:%M:%S') PROCESS START"
```

실제 출력

```
2016.07.12 16:17:34 PROCESS START
```

다른 형식은 [**여기**](http://www.unixmantra.com/2013/04/how-to-format-date-for-display-shell-scripting.html) 참조
