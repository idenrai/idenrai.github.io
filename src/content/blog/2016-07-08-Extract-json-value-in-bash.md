---
title: "Extract json value in bash"
date: 2016-07-08
tags: ["Tech", "Shell"]
tistory_url: "https://idenrai.tistory.com/78"
---

Java로 작성해 둔 API를 리눅스 서버에서 Bash로 돌려야 했다.

보안상 Token을 따서, 그걸 집어넣어 API를 돌리는 방식인데...

일단 어찌어찌 CURL로 Token은 따 왔는데, 받아오고 보니 JSON으로 리턴되어 오더라.

남은 건 KEY를 집어넣어서 Token값을 따오는 것 뿐인데...

보이는 거라곤 다 뭔가를 깃허브에서 갖고와서 그걸 써서 따온다...라는 것이라

한참동안 다른 방법을 찾아다녔다.

결국 찾아낸 것이 [**이 방식**](https://www.experts-exchange.com/questions/27568762/How-to-parse-json-response-in-bash-script.html).

token = $response | sed -e 's/^.\*"token\_key"\[ \]\*:\[ \]\*"//' -e 's/".\*//'\`

코드에 적용하면 이런 느낌이다.

```
#!/bin/sh

APP_NAME=bulk_delete
RETURN=0

#URL
URL=""

#Token
USER=""
PW=""
AC=""
TOKEN_URL=""

#Get JSON
RESPONSE=`$TOKEN_URL`
echo "$RESPONSE"

#KEY=access_token
TOKEN=`echo $RESPONSE | sed -e 's/^.*"access_token"[ ]*:[ ]*"//' -e 's/".*//'`
echo "TOKEN : $TOKEN"

exit $RETURN
Colored by Color Scripter
```
