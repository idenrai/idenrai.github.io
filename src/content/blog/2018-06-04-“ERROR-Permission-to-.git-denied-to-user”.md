---
title: "“ERROR: Permission to ~.git denied to user”"
date: 2018-06-04
tags: ["Tech", "Git"]
tistory_url: "https://idenrai.tistory.com/155"
---

개인 프로젝트를 좀 건드는데 자꾸 이딴 에러가 나와서 사람 미치게 만들더라.

“ERROR: Permission to ~.git denied to user”

내가 쓰는 username이 내 Git에 Permission denied되었다는 건데

user.email이나 user.name은 맞는데 이상하게 안 되더라.

내 경우는 이 에러에 뜨는 username이 내가 예전에 쓰던 username이던 터라

뭔가 잘못되어 있다는 것을 빨리 파악할수 있었다.

[Git's famous “ERROR: Permission to .git denied to user”](https://stackoverflow.com/questions/5335197/gits-famous-error-permission-to-git-denied-to-user)

이 글의 아래쪽에 있는

\[If problem is coming on windows then remove the Credentials from the Windows history.\]

를 보고 해결할 수 있었다.

결론은 예전에 사용했던 git 관련 credential이 남아 있어서 이 꼴이 났던 거라,

Windows의 Credential Manager에서 해당 항목을 삭제하니 깔끔하게 해결되더라.

Credential Manager는 Control Panel에서 찾을 수 있는데,

한글 윈도우나 일본어 윈도우에서는 다른 이름이니 그냥 [여기](https://support.microsoft.com/en-ca/help/4026814/windows-accessing-credential-manager)서 그림 보고 찾도록 하자.
