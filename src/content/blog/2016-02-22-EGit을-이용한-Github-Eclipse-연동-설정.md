---
title: "EGit을 이용한 Github-Eclipse 연동 설정"
date: 2016-02-22
tags: ["Tech", "Eclipse"]
tistory_url: "https://idenrai.tistory.com/56"
---

참고 : [http://rogerdudler.github.io/git-guide/index.ko.html](http://rogerdudler.github.io/git-guide/index.ko.html)

**1\. Eclipse Marketplace**

Help > Eclipse Marketplace... 클릭, git 이라고 검색

EGit - Git Team Provider 를 install

**2\. Git Repositories**

Window > Show View > Other... 클릭, git 이라고 검색

Git Repositories 를 추가 한다.

**3\. Git Clone**

Project 받기.

Clone a Git repository 클릭

Location, Authentication 정보를 추가

(Location은 URI입력을 통해 다 채워짐.

Authentication은 깃허브 아이디, 비번)

Branch 가 여러개인 경우엔 설정 (기본은 master)

Local 에 저장 되는 Directory 설정만 하면 마무리

**4\. Project Import**

Git 폴더 클릭 > 마우스 오른쪽 > Import Projects... 클릭

Import existing projects 를 선택 하고, 폴더를 지정 한다.

Finish 하자. Package Explorer 에 추가 된 모습을 볼 수 있다.

**5\. Git에 프로젝트 올려서 사용하기**

하단의 "Git Repositories" 탭에 있는 "Working Directories"에 우클릭

\> "Copy Path to Clipboard" 선택

새로운 프로젝트를 만들 때 위치를 위의 복사한 디렉토리 하위에 생성

프로젝트 설정하고 생성

먼저 어디에 해당 git 폴더를 생성했는지 본 다음에, 해당하는 위치에 프로젝트를 생성한다.

위치를 설정하는 화면에서 "Create Project in Workspace"의 체크는 삭제하고

해당 git의 디렉토리로 설정하면 된다.

이렇게 프로젝트의 생성을 마저 진행하게 되면

우측의 프로젝트 정보에 다른 프로젝트와는 달리

해당 git 저장소명과 어떠한 branch를 사용하는지 표시된다.

로컬의 저장소에 변경이 아직 반영된 것은 아니다.

프로젝트의 옆에 보면 ? 표시와 함께 폴더의 앞에 '>' 표시가 있을텐데,

향후 개발을 할 때 이러한 표시가 있는 폴더는 내부에 어떠한 변경이 있다는 것을 의미하므로,

특정 변경을 적용할 때 로컬 저장소 또는 원격 저장소로 적용을 하면 된다.

**6\. git 업로드 ([http://unikys.tistory.com/330](http://unikys.tistory.com/330) 참조)**

1차적으로 로컬저장소에 적용을 먼저 해보자.

다음과 같은 순서대로 하면 쉽게 적용이 가능하다.

1) 우측의 "Project Explorer" > "해당 프로젝트(UnikyTistory)" > 우클릭 > Team > Commit

2) 해당 commit에 대한 메세지/변경 내역 작성 > commit할 파일들 선택

3) 로컬에만 'commit' 하거나 원격 저장소에 바로 'commit and push' 버튼 클릭

먼저 프로젝트에 우클릭 > Team > Commit을 해보자.

"Commit message"의 텍스트 박스에는 해당 commit에 대한 설정을 정의한 규격대로 입력하면 되고,

하단에 변경된 파일 목록이 있는데, 여기서 어떠한 파일들을 commit 할 것인지 선택하면 된다.

Commit 하는 버튼은, "Commit"과 "Commit and push"가 있는데,

로컬의 저장소와 원격의 저장소는 별도로 적용되기 때문에,

로컬의 저장소에만 적용하거나 별도의 branch를 생성해서 작업하고 싶으면 "Commit" 버튼을,

원격의 저장소에 바로 적용하고 싶으면 "Commit and push"를 선택하면 된다.

원격의 저장소에도 여러 가지가 branch가 있을텐데,

이는 프로젝트명 옆에 있는 프로젝트 명과 저장소 이름으로 확인할 수 있다.

이는 보통 원격의 저장소에서 clone한 저장소가 설정 되어있다.

만약 github 저장소에 처음으로 push를 하려는 경우

아이디/비밀번호 설정이 되어있지 않으므로,

일단 로컬 저장소에만 "Commit"하고,

다시 하단의 뷰의 "Git Repository" > 해당 저장소 > 우클릭 > Remote... > Push를 선택하면

아이디/비밀번호를 설정하여 원격 저장소에 push를 할 수 있도록 해주므로 참고하자.

"Custom URI"를 선택한 다음, 원격의 저장소 URI와 아이디/비밀번호를 입력하고 "Next"를 선택하자.

그러면 저장소에 대한 레퍼런스 설정(생성/업데이트)를 선택하는 창이 나오는데,

모든 branch에 대한 레퍼런스를 업데이트하는 "Add All Branches Spec" 버튼을 선택, 업데이트.

"Finish" 버튼을 누르면 파일 용량 계산 등 여러가지 계산/업로드를 하고 아래와 같이 완료되었다는 창이 뜬다.

이제 해당 저장소로 Push가 되었다고 뜬다.

그러면 이제 Github에 가서 제대로 되었는지 확인하자.

**7\. Branch의 사용**

마스터는 릴리즈 할 때에만 commit하도록 한다.

기본적으로 자기 부분을 할 때엔

import project로 받아온 마스터는 그대로 냅두고

create branch로 브랜치를 생성해서,

거기에 체크아웃 후 코딩 및 커밋 진행할 것.

이후 테스트가 끝나고, 릴리즈에 들어가면서 merge로 브랜치와 마스터를 합침.

merge 방법은 다음과 같다.

브랜치를 master로 옮기고,

우클릭-merge 선택 후, 합치고 싶은 브랜치를 선택

혹은 현재의 브랜치에서

합치고 싶은 브랜치를 우클릭-merge
