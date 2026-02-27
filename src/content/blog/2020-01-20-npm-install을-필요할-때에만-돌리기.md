---
title: "npm install을 필요할 때에만 돌리기"
date: 2020-01-20
tags: ["Tech", "Jenkins", "JenkinsFile", "npm", "package.json", "node_modules"]
tistory_url: "https://idenrai.tistory.com/216"
---

node\_modules가 없거나 package.json이 갱신된 경우에만 npm install을 돌리도록 한다. **1\. package.json이 갱신되었는지 판별**

```
def check_package_updated() {
    script {
        def pretty = ""
        def file_paths =  sh(script : "git show --pretty=${pretty} --name-only ${env.GIT_COMMIT}", returnStdout: true).trim()
        def path_list = file_paths.split('\n')

        def is_updated = 0
        for (path in path_list) {
            if(path.contains("package.json")) {
                is_updated=1
            }
        }
        return is_updated
    }
}
```

**2\. 폴더/파일이 존재하는지 확인**

```
def check_target_exist(target_dir) {
    script {
        def res = sh(script: "test -d ${target_dir} && echo '1' || echo '0' ", returnStdout: true).trim()
        return res
    }
}
```

**3\. **package.json이 갱신되었거나, node\_modules가 없는 경우에만** npm install**

```
pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Install') {
            steps {
                echo ""
                echo "+++----- [Pipeline] Install"
                echo ""
                script {
                    LAST_STARTED = env.STAGE_NAME
                    def is_package_updated = check_package_updated()
                    def is_node_modules_exist = check_target_exist("./node_modules")

                    if((is_package_updated == 1) || (is_node_modules_exist == 0)){
                        echo "+--- npm install"
                        sh "npm install"
                    } else {
                        echo "+--- skip npm install command."
                    }
                }
            }
        }
    }
}
```
