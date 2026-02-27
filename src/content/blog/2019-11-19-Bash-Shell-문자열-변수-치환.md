---
title: "Bash Shell 문자열 변수 치환"
date: 2019-11-19
tags: ["Tech", "Shell", "Bash", "문자열", "JenkinsFile"]
tistory_url: "https://idenrai.tistory.com/195"
---

Git의 Commit Message를 Jenkinsfile에서 Shell로 전달해서 curl로 TEAMS에 송신해야 했다. 여기서 문제가 되는 것이, 커밋 메시지에 공백이 있어서 쉘로 변수 전달시 짤린다는 것. 그래서 일단 Jenkinsfile에서는 커밋 아이디로 커밋 메시지를 취득하여, 메시지의 공백을 "-spc-"라는 문자열로 치환하였다.

```
def get_commit_msg(){
    script {
        return sh(script : "git show -s --format=%B ${env.GIT_COMMIT}", returnStdout: true).trim().replace (' ', '-spc-')
    }
}
```

이를 환경변수에 저장하여 다음과 같이 쉘에 송신.

```
stage('TEAMS') {
    steps {
        echo 'TEAMS_MSG_Finished!'
        script {
            last_started = env.STAGE_NAME
            sh "bash ${env.BATCH_DIR}/teams-notice.sh ${env.GIT_BRANCH} ${env.COMMIT_MSG} ${env.BUILD_URL}"
        }
    }
}
```

쉘에서 변수를 받아 다음과 같이 커밋 메시지를 치환

```
#!/bin/bash

# Branch Name
BRANCH_NAME=$1
# Commit Message
COMMIT_MSG=$2
# Build URL
BUILD_URL=$3

SPC_COMMIT_MSG=$(echo ${COMMIT_MSG}|sed 's/-spc-/\ /g')
```

치환한 내용을 바로 변수에 넣는 것이 계속 안되더라.

그냥 출력하는 방법은 인터넷상에 많기에, 일단 echo로 출력 후 그 결과를 변수에 넣는 형식으로 해결했다.
