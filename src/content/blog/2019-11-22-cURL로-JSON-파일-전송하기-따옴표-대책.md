---
title: "cURL로 JSON 파일 전송하기 (따옴표 대책)"
date: 2019-11-22
tags: ["Tech", "Shell", "JSON", "curl", "문자열"]
tistory_url: "https://idenrai.tistory.com/196"
---

Jenkinsfile에서 받은 데이터를 Shell로 넘겨서, TEAMS로 cURL을 통해 Notification을 날리는 업무.

일 자체는 그냥 데이터 받은거 편집해서 curl로 날리면 땡인데...

보시다시피 날려야 할 cURL이 이런 식이다.

```
curl -X POST -H "Content-Type: application/json" -d '{"text":"Branch Name:${BRANCH_NAME}Author:${COMMIT_AUTHOR}Commit Comment:${COMMIT_MSG} ... Jenkins Build:${BUILD_URL}"}' ${TEAMS_URL}
```

이걸 쉘에 그대로 써서 돌리려니 당연히 따옴표와 쌍따옴표의 카오스가 일어난다.

가독성은 말할 것도 없이 더럽고...

그래서 방법을 찾아보다가...

가장 따옴표 문제가 심각한 JSON부분을 통째로 들어내서 json파일에 넣어버리기로 했다.

그리고 그 파일을 cURL에서 불러내어 전송.

방법은 딱히 뭐 없고, 그냥 아래와 같이, 보낼 파일 앞에 @만 붙이면 된댄다.

```
curl -X POST -H "Content-Type: application/json"  -d @<파일명>
```

뭐 이걸로 설명은 다 했고, 구현한 코드는 이렇다.

```
# request.json파일이 존재할 경우 삭제
if [ -e ./request.json ]; then
    rm -rf request.json
fi

# json부분을 request.json파일을 만들어 통째로 집어넣기
echo "{text: '" > request.json
echo "Branch Name   : ${BRANCH_NAME}" >>  request.json
echo "Commit Author : ${COMMIT_AUTHOR}" >>  request.json
echo "Commit Comment: ${SPC_COMMIT_MSG}" >>  request.json
...
echo "Jenkins Build : ${BUILD_URL}" >>  request.json
echo "'}" >> request.json

# TEAMS에 날리기
curl -X POST -H "Content-Type: application/json" ${TEAMS_URL} -d @request.json
```
