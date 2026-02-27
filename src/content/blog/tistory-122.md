---
title: "자주 사용하는 Git Command"
date: 2017-04-11
tags: ["Tech", "Git"]
tistory_url: "https://idenrai.tistory.com/122"
---

@markdown

\#### 초보자를 위한 Git 초기설정 세트

$ git init

$ git add -A

$ git config --global user.email

$ git config --global user.name

$ git commit -m

$ git remote add origin

$ git push --set-upstream origin master

\#### Init

$ git init

$ git add -A && git commit -m \[commit comment\]

$ git remote add origin \[Your Repository URL\]

\#### Add ・ Commit ・ Push

$ git add . -A

$ git commit -m \[commit comment\]

$ git push -u origin master

\#### Pull

$ git pull

\-- 또는

$ git pull origin \[branchname\]

\#### Clone

$ git clone \[Repository URL\]

\-- Branch 지정시

$ git clone -b \[branchname\] \[Repository URL\]

\#### Checkout

$ git checkout \[branchname\]

\-- 확인

$ git branch

\#### New Branch & Merge

\-- 새로운 branch 작성 및 체크아웃

$ git branch \[new branchname\]

$ git checkout \[new branchname\]

\-- 한 방에 하고싶은 경우

$ git checkout -b \[new branchname\]

\-- 새로운 branch의 작업이 끝나고 기존 branch로 이동

$ git checkout \[base branchname\]

\-- 기존 branch에 새로운 branch를 merge

$ git merge \[new branchname\]

\-- 새로운 branch 삭제

$ git branch -d \[new branchname\]

\#### New Branch & Rebase & Merge

\-- main\_branch에서 new branch 작성 및 checkout

git checkout -b new\_branch

\-- new\_branch에서의 작업 완료 후 commit까지 실행

git add .

git commit -m "msg"

\-- main\_branch의 변경사항 취득

git checkout main\_branch

git pull origin main\_branch

\-- rebase를 통해 main\_branch의 변경사항을 new\_branch에 도입

git checkout new\_branch

git rebase -i main\_branch

\- git add .

\- git rebase --continue

\-- new\_branch push

git push origin new\_branch

\-- new\_branch에 과거 push를 한번 한 상태에서 다시 수정 후 rebase까지 한 경우

git push origin new\_branch -f

\-- main\_branch에 new\_branch를 merge

git checkout main\_branch

git merge new\_branch

git branch -d new\_branch

git push origin new\_branch

\#### 그외

\-- 상태확인

$ git status

\-- Upstream 설정

$ git push --set-upstream origin \[branchname\]

\-- 개판난 소스를 버리고 최근 버전으로 돌아가기

$ git reset --hard
