---
title: "Windows에서 Jekyll로 Github Pages에 블로그 만들기"
date: 2016-12-07
tags: ["Tech", "Tool", "windows", "Jekyll", "github"]
tistory_url: "https://idenrai.tistory.com/103"
---

[본인 블로그](https://idenrai.github.io/) (이후 이 블로그와 Qiita의 글을 옮겨갈 예정)

**1\. Github Pages 만들기(GitHub 계정 생성)**

**2\. 준비물 설치**

[Ruby와 RubyDevkit Install](http://jekyll-windows.juthilo.com/1-ruby-and-devkit/)

**3\. Ruby Command Prompt에서의 작업**

$ gem install jekyll

$ gem install bundle

**4\. Jekyll**

$ jekyll new 「폴더명」

이후 해당 폴더로 이동

**5.포스팅 및 Jekyll로 포스팅 내용 확인**

$ bundle exec jekyll serve

5-1. 확인

http://localhost:4000/

**6\. Github Pages 연결**

$ git init

$ git add -A && git commit -m "initial commit"

$ git remote add origin 「Repository URL」

**7\. Github Push**

$ git add . -A

$ git commit -m "커밋 내용"

$ git push -u origin master

**8\. Google Analystics 연결**

[https://aweekj.github.io/2016-08-08/jekyll-with-google-analytics/](https://aweekj.github.io/2016-08-08/jekyll-with-google-analytics/)

**9\. 포스트 작성은 Atom등을 이용하면 편함**

\- Add-Commit-Push가 귀찮다면 Git Plus는 꼭 설치할 것!
