---
title: "Node.js로 파라메터 넘기기"
date: 2020-01-20
tags: ["Tech", "JavaScript", "node.js", "파라메터"]
tistory_url: "https://idenrai.tistory.com/215"
---

git push시에 Jenkins가 기동되어 Jenkinsfile을 실행하고, 이 Jenkinsfile에서 각종 Tool을 부르는 처리를 하였다. Node.js로 툴을 하나 만들었는데, 이 Tool의 결과는 Teams로 Post를 하도록 하였다 이 때, Jenkins Job의 결과를 URL링크로 만들어 Teams에 함께 띄우고 싶은데... 이를 위해선 Jenkinsfile에서 Node.js Tool을 호출할 때, 「env.BUILD\_URL」을 파라메터로 보내야 한다. bash에서야 그냥

```
sh "bash ./path/teams-notice.sh ${env.BUILD_URL}"
```

대충 이런 식으로 적어두고

```
#!/bin/bash

# BUILD URL
BUILD_URL=$1
```

이런 식으로 받아오면 된다지만... JSON에서는 어떨까 싶었다.

---

일단 사용하는 것은 [**process.argv**](https://nodejs.org/docs/latest/api/process.html#process_process_argv)라는 녀석. 사용 방법은 비슷하다. 일단 Jenkinsfile에서 부를 때엔 이런 느낌.

```
pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        BATCH_DIR = "./src"
    }
    stages {
        stage('Run') {
            steps {
                script {
                    LAST_STARTED = env.STAGE_NAME
                    sh "node src/main.js ${env.BUILD_URL}" 
                }
            }
        }
    }
    post {
        failure {
            echo ""
            echo "+++----- [Pipeline][Error]Failed stage : ${LAST_STARTED}"
            echo ""
        }
    }
}
```

그리고 사용은 이런 식으로.

```
async function main() {
  var args = process.argv.slice(2);
  console.log(args[0]);
}
```

process.argv.slice(2)를 하면, process.argv의 3번째 값부터 짤라서 배열로 갖고오니까, 우리가 호출시에 보낸 파라메터는 이 값의 0번째에 위치하게 된다. 혹시 파라메터를 2개 이상 보낼 경우에도 적용 가능하다.
