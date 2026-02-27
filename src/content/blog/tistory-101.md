---
title: "Resource Filters : node_modules"
date: 2016-12-05
tags: ["Tech", "Eclipse"]
tistory_url: "https://idenrai.tistory.com/101"
---

현재 하는 작업의 흐름은 다음과 같다.

1\. Atom에서 js나 sass 수정

2\. watch를 걸어둔 gulp가 자동으로 돌아감

3\. 이클립스 새로고침

4\. 크롬 시크릿 창에서 새로고침

보통은 gulp가 돌아가면서 이클립스도 refresh시켜주는데...

이게 너무너무 느리길래 뭔 일인가 하고 봤더니

이클립스의 리소스 필터에 노드 모듈을 적어두지 않았다...

맨날 프로젝트 추가할 때마다 깜빡하고는 나중에서야 적용을 하는데,

이제는 절대 까먹지 않겠다는 각오를 다지며 여기에도 적어 두도록 한다.

1\. PackageExplorer에서 프로젝트 폴더 우클릭 → Properties

2\. Resources → Resource Filters → Add

3\. 다음 내용 적용

Filter type: Exclude all 체크

Applies to: Files and Folders & All children(recursive) 체크

Filter Details: Project Prelative Path 선택 & matches 선택 & node\_modules 입력

4\. 「OK」를 눌러 Properties로 돌아간 후, 「Apply」→「OK」

※ 주의

캐시 삭제를 위해 크롬상에서 ctrl+F5를 누르곤 하는데,

이게 버릇이 되다 보니 이클립스에서 프로젝트 새로고침을 할 때도 ctrl+F5를 눌러버리게 된다.

이 경우, 지금의 프로젝트에서는 Gradle이 refresh all을 돌려버리게 되는데...

이게 조금이라도 돌아가 버리면, 위에서 적용한 exclude가 초기화되어버린다.

다시 설정하기 귀찮으니, 어지간해선 시크릿 모드에서 디버거를 돌리도록 하자.
