---
title: "Git Commit Message와 Author를 취득하여 환경변수로 사용하기"
date: 2020-01-20
tags: ["Tech", "Jenkins", "환경변수", "author", "JenkinsFile", "Commit"]
tistory_url: "https://idenrai.tistory.com/217"
---

**Commit Message 취득**

```
def get_commit_msg(){
    script {
        return sh(script : "git show -s --format=%B ${env.GIT_COMMIT}", returnStdout: true).trim().replace (' ', '-spc-')
    }
}
```

**Author 취득**

```
def get_commit_author(){
    script {
        return sh(script : "git --no-pager show -s --format=%an ${env.GIT_COMMIT}", returnStdout: true).trim()
    }
}
```

**Jenkinsfile 환경변수 설정 및 사용**

```
pipeline {
    agent any
    environment {
        BATCH_DIR = "./path"
        COMMIT_MSG = get_commit_msg()
        COMMIT_AUTHOR = get_commit_author()       
    }
    stages {
        stage('test') {
            steps {
                script {
                    LAST_STARTED = env.STAGE_NAME
                    // 아래와 같이 환경변수 사용 가능. GIT_BRANCH나 BUILD_URL은 기본 제공
                    sh "bash ${env.BATCH_DIR}/test.sh ${env.GIT_BRANCH} ${env.COMMIT_AUTHOR} ${env.COMMIT_MSG} ${env.BUILD_URL}"
				}
            }
        }
    }
}
```

※ 환경변수에 관해서는 「[**Using environment variables**](https://jenkins.io/doc/pipeline/tour/environment/)」를 참조
