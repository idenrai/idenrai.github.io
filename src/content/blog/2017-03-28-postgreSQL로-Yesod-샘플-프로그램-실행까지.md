---
title: "postgreSQL로 Yesod 샘플 프로그램 실행까지"
date: 2017-03-28
tags: ["Tech", "Yesod"]
tistory_url: "https://idenrai.tistory.com/121"
---

업무상 Haskell과 Yesod를 만지게 되었는데...

scaffolded site templet 중 yesod-postgre로 개발환경을 구죽하는 예문이 아무리 찾아도 없기에

이래저래 만져본 김에 직접 적어 보았다.

아래의 글은 Qiita에 올린 Markdown 원문이므로

자세한 내용은 [postgreSQLでYesodのサンプルプログラムの実行まで](http://qiita.com/YoungjaeKwon/items/8265834c0436944bc3ca)를 참조할 것.

본문 열기

\# postgreSQLでYesodのサンプルプログラムの実行まで

\### 構築環境

\- 装置スペック

\- CPU : i5-4310M 2.70GHz

\- RAM : 8.0GB

\- OS : Microsoft Windows 10 Pro 64Bit

\### Haskell Stackのインストール

\- \*\*\[Download Haskell Stack\](https://haskell-lang.org/get-started#why-not-haskell-platform)\*\*

\- OSを選び、ダウンロード（windowsだと普通にダウンロード、macOSやLinuxだとwget・curlを使ってダウンロードできる）

\- \*\*Haskell Stack\*\* の設置確認

\- HelloWorld.hsの作成

\`\`\`Haskell

#!/usr/bin/env stack

\-- stack --install-ghc runghc

main :: IO ()

main = putStrLn "Hello World"

\`\`\`

\- terminalで\`\`\`stack haskell\`\`\`を入力し、「Hello World」の出力を確認

\### プロジェクト作成

\- scaffolded site templateのpostgreSQL版でpgcrudフォルダを作成

\`\`\`text

stack new pgcrud yesod-postgres

stack build yesod-bin cabal-install --install-ghc

stack build

\`\`\`

\- stack buildで \`\`\`pg\_config.exe\`\`\` が見つけられないとエラーが出たら、postgreSQLのbinフォルダを環境変数に追加（\`\`\`C:\\Program Files\\PostgreSQL\\9.3\\bin\`\`\`）

\- \`\`\`Windows PowerShell\`\`\`では\`\`\`pg\_config.exe\`\`\`が取れないので、cmd上で実行すること

\### posrgreSQLでユーザとDBを作成（pgAdminⅢのlocal serverで実行）

\- ユーザの生成：ログインロールを右クリックし、「新しいログインロール」でユーザを二つ追加する

\`\`\`Text

ロール名：kwon

パスワード：kwon

\`\`\`

\- DBの生成：データベースを右クリックし、「新しいデータベース」で実際使うDBとテスト用のDBを作成する

\`\`\`Text

名前：yesod

オーナー：kwon

\`\`\`

\### Yesodでのデータベース接続設定

\- \[ここ\](http://blog.livedoor.jp/rtabaladi\_58/archives/58083990.html)ではプロジェクト名に合わせてユーザやDBを作成すると書いてあるが、実際は\`\`\`config/settings.yml\`\`\`でDBのsettingが普通にできる

\`\`\`Text

database:

user: "\_env:PGUSER:kwon"

password: "\_env:PGPASS:kwon"

host: "\_env:PGHOST:localhost"

port: "\_env:PGPORT:5432"

database: "\_env:PGDATABASE:yesod"

poolsize: "\_env:PGPOOLSIZE:10"

\`\`\`

\- test用のDBも設定したいなら、\`\`\`config/test-setting.yml\`\`\`で他のDB（オーナーは同じく）だけを設定する。

\`\`\`Text

database:

database: yesod\_test

\`\`\`

\### プログラム稼働

\- \`\`\`stack exec -- yesod devel\`\`\`

\- これを実行すると、つなげたDBにサンプルデータのテーブルが生成される（comment, email, user）

\- テストも実行してみたいなら、\`\`\`stack test\`\`\`で、設定した\`\`\`yesod\_test\`\`\`DBにテーブルができたらOK

\- \[http://localhost:3000/\](http://localhost:3000/) に接続し、Comment作成やユーザ登録などでDBが更新されるかを確認する。

\- ここまで設定したら、他の作業はsqliteでのと同じなので \*\*\[ここ\](http://qiita.com/erin/items/55e0109e4be6b3257bef)\*\* などを参考し、次の実装をしてもOK

\## 参考

\- \[Yesod のインストールとサンプルプログラムの実行\](http://qiita.com/waddlaw/items/e47552cb26c1d58ece0b)

\- \[YesodでpostgreSQLを使う Haskell stack\](http://blog.livedoor.jp/rtabaladi\_58/archives/58083990.html)

\- \[Yesod 1.4でのCRUD処理およびメール送信（stackによる開発環境の構築からketerによるデプロイまで）\](http://qiita.com/erin/items/55e0109e4be6b3257bef)
