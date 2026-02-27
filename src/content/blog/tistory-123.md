---
title: "postgreSQL로 Yesod 샘플 프로그램 실행까지"
date: 2017-04-20
tags: ["Tech", "Yesod"]
tistory_url: "https://idenrai.tistory.com/123"
---

@markdown

\### 개발환경

\- 장치 스펙

\- CPU : i5-4310M 2.70GHz

\- RAM : 8.0GB

\- OS : Microsoft Windows 10 Pro 64Bit

\### Haskell Stack Install

\- \*\*\[Download Haskell Stack\](https://haskell-lang.org/get-started#why-not-haskell-platform)\*\*

\- OS를 고르고 다운로드 (windows라면 평범하게 다운로드, macOS나 Linux라면 wget, curl을 사용해서 다운로드 가능)

\- \*\*Haskell Stack\*\* 설치확인

\- HelloWorld.hs 작성

\`\`\`Haskell

#!/usr/bin/env stack

\-- stack --install-ghc runghc

main :: IO ()

main = putStrLn "Hello World"

\`\`\`

\- terminal에서 \`\`\`stack haskell\`\`\`을 입력, \[Hello World\]가 출력되는지 확인

\### 프로젝트 작성

\- scaffolded site template의 postgreSQL판으로 pgcrud 폴더를 작성

\`\`\`text

stack new pgcrud yesod-postgres

stack build yesod-bin cabal-install --install-ghc

stack build

\`\`\`

\- stack build를 돌렸을 때 \`\`\`pg\_config.exe\`\`\` 가 발견되지 않았다는 에러가 나온다면, postgreSQL의 bin폴더를 환경변수에 추가(\`\`\`C:\\Program Files\\PostgreSQL\\9.3\\bin\`\`\`)

\- \`\`\`Windows PowerShell\`\`\`에서는 \`\`\`pg\_config.exe\`\`\`을 가져올 수 없으므로、평범하게 cmd상에서 실행할 것

\### posrgreSQL에서 유저와 DB를 작성 (pgAdminⅢ의 local server에서 실행)

\- 이 부분은 일본어판 PGAdmin으로 실행하였기에... 한국판에서는 어찌되는지 잘 모르겠다.

\- 유저 작성 : Login Roll을 우클릭하여 \[새로운 로그인 롤\]에서 유저를 추가

\`\`\`Text

로그인 롤 이름 : kwon

패스워드 : kwon

\`\`\`

\- DB 작성 : 데이터베이스를 우클릭, \[새로운 데이터베이스\]에서 DB 작성

\`\`\`Text

DB명 : yesod

오너 : kwon

\`\`\`

\### Yesod에서 데이터베이스 연결 설정

\- \[이 글\](http://blog.livedoor.jp/rtabaladi\_58/archives/58083990.html)에서는 프로젝트명에 맞추어 유저명이나 DB명을 작성하라고 적고 있지만, 실제로는 \`\`\`config/settings.yml\`\`\`에서 간단하게 DB 설정 가능

\`\`\`Text

database:

user: "\_env:PGUSER:kwon"

password: "\_env:PGPASS:kwon"

host: "\_env:PGHOST:localhost"

port: "\_env:PGPORT:5432"

database: "\_env:PGDATABASE:yesod"

poolsize: "\_env:PGPOOLSIZE:10"

\`\`\`

\- test용 DB도 설정하고 싶다면, \`\`\`config/test-setting.yml\`\`\`에서 다른 DB (DB 오너는 동일하게 설정)를 설정하면 된다.

\`\`\`Text

database:

database: yesod\_test

\`\`\`

\### 프로그램 가동

\- \`\`\`stack exec -- yesod devel\`\`\`

\- 이걸 실행하면, 연결된 DB의 샘플 데이터 테이블이 생성됨 (comment, email, user)

\- 테스트도 실행해 보고 싶다면, \`\`\`stack test\`\`\`를 입력하여, \`\`\`yesod\_test\`\`\`에서 설정한 DB에 테이블이 생성된다면 OK

\- \[http://localhost:3000/\](http://localhost:3000/) 에 접속, Comment 작성이나 유저 등록 등을 실행하여, DB가 갱신되는지 확인

\- 여기까지 설정했다면, 다른 작업은 sqlite에서와 동일하므로, \*\*\[이곳\](http://qiita.com/erin/items/55e0109e4be6b3257bef)\*\* 등을 참조하여 다음 단계로 넘어가도록 하자

\## 참조

\- \[Yesod のインストールとサンプルプログラムの実行\](http://qiita.com/waddlaw/items/e47552cb26c1d58ece0b)

\- \[YesodでpostgreSQLを使う Haskell stack\](http://blog.livedoor.jp/rtabaladi\_58/archives/58083990.html)

\- \[Yesod 1.4でのCRUD処理およびメール送信（stackによる開発環境の構築からketerによるデプロイまで）\](http://qiita.com/erin/items/55e0109e4be6b3257bef)
