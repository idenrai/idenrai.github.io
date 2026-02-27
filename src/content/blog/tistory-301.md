---
title: "Databricks Git folder 추가하기"
date: 2025-07-06
description: "개요 Databricks Git folder는 Databricks 워크스페이스에서 Git 저장소를 직접 연동해 코드 버전 관리와 협업을 지원하는 기능. 이 도큐먼트에서는 간단한 설명 및 세팅, 조작 방법 등에 대해 "
tags: ["Databricks", "databricks", "git folder", "git integration", "Github"]
tistory_url: "https://idenrai.tistory.com/301"
---

## 개요

Databricks Git folder는 Databricks 워크스페이스에서 Git 저장소를 직접 연동해 코드 버전 관리와 협업을 지원하는 기능. 이 도큐먼트에서는 간단한 설명 및 세팅, 조작 방법 등에 대해 적어 보도록 한다.

## 상세

[Git integration for Databricks Git folders](https://docs.databricks.com/aws/en/repos)

### 장단점

**장점**

-   Databricks UI에서 Git 주요 기능(Clone, Commit, Push, Pull, 브랜치 관리, diff 등) 사용 가능
-   다양한 Git 제공자(GitHub, GitLab, Bitbucket 등) 지원
-   노트북, 코드 파일 등 다양한 파일 버전 관리
-   CI/CD 파이프라인 연동 및 자동화 가능
-   시각적 diff, 충돌 해결 등 협업에 유리

**단점**

-   복잡한 Git 작업(리베이스, 충돌 해결 등)은 제한적
-   네트워크, 인증(PAT, OAuth 등) 설정 필요
-   대용량 저장소/파일 처리 시 성능 저하 가능
-   일부 Git 워크플로(submodule 등) 미지원 또는 제약
-   폴더 권한 관리가 혼동될 수 있음

### Git folder 다루기

### Databricks와 GitHub 계정 연동

Settings - Linked accounts - Add Git credential

![스크린샷 2025-07-06 오후 2.29.08.png](https://blog.kakaocdn.net/dn/0ZqzX/btsO6Zxl6vD/P0d4GNMF26CZtN4RBQOIC1/img.png)

Git provider에서 'GitHub' 선택, 'Link Git account' 클릭 후 'Link'

![스크린샷 2025-07-06 오후 2.29.27.png](https://blog.kakaocdn.net/dn/o5Wnl/btsO6DOL1uR/XuWW89RCe8XZHZP97z2vF0/img.png)

![스크린샷 2025-07-06 오후 2.29.56.png](https://blog.kakaocdn.net/dn/bsaHdt/btsO7xUEyDA/QMYDhGGzWxKsI58zQpekW0/img.png)

연결됨

![스크린샷 2025-07-06 오후 2.30.10.png](https://blog.kakaocdn.net/dn/zEuua/btsO679JCKu/TueLH1tV6bGaITtk8VgD3K/img.png)

#### Git folder

Workspace - Create - Git folder

![스크린샷 2025-07-06 오후 2.32.00.png](https://blog.kakaocdn.net/dn/46OOO/btsO5wccwM6/dGOqX1eGb8sA5CKJKAH9bk/img.png)

Git repository url 을 입력하면, 나머진 알아서 채워짐

![스크린샷 2025-07-06 오후 2.32.47.png](https://blog.kakaocdn.net/dn/y9rtn/btsO7wVLpaD/eWgTJ7JpAhX6zxF7PNHdOk/img.png)

연결됨

![스크린샷 2025-07-06 오후 2.33.20.png](https://blog.kakaocdn.net/dn/04iNQ/btsO7ftaLOw/kg1FdvgMh8kxVLqiYkr9P1/img.png)

test\_nb Notebook file 작성 후, Git... 선택

![스크린샷 2025-07-06 오후 2.36.48.png](https://blog.kakaocdn.net/dn/cyCe9j/btsO6qPL9f1/PMu19SZDhfKk9LsRoRivik/img.png)

Branch 작성 및 Commit & Push 가능

![스크린샷 2025-07-06 오후 2.37.43.png](https://blog.kakaocdn.net/dn/7pngz/btsO69zHrBO/c0Yg0K2Urj7tETeMsOp7S1/img.png)

Github 에서 확인 가능

![스크린샷 2025-07-06 오후 2.43.53.png](https://blog.kakaocdn.net/dn/rtUSE/btsO7hYOKng/Fv5BVguffYCQLopepeFyBK/img.png)

## 결론

DBX 상에서 GUI를 이용하여 직관적으로 소스 관리가 가능하다는 점은 만족스러움. 다만 DBX는 아래와 같이 VS Code 연계도 가능하므로, 이를 이용할 경우엔 더욱 편한 방법이 많긴 하다.

![스크린샷 2025-07-06 오후 3.46.50.png](https://blog.kakaocdn.net/dn/KBsSU/btsO6AR8evL/M40Uh5OpPtiIX73X9Rmxm0/img.png)
