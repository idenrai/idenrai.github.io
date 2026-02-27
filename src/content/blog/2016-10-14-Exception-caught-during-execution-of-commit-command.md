---
title: "Exception caught during execution of commit command"
date: 2016-10-14
tags: ["Tech", "Git"]
tistory_url: "https://idenrai.tistory.com/96"
---

EGit에서 Commit를 하던 중 Eclipse가 멈추어, 재시작을 해야만 했다.

아직 Commit이 되지 않았기에, 재차 Commit을 하려고 보니

Exception caught during execution of commit command

이 메시지가 뜨며 Commit이 되지 않더라.

해당 프로젝트의 **/.git/index.lock**을 삭제하니 해결되었다.
