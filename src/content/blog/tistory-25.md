---
title: "iReportのInstall方法"
date: 2015-08-05
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/25"
---

**iReport****のInstall方法**

**iReport****とは？**

iReportとは、JasperReportLibraryを利用して報告書を作成するOpen Source Program。

GUIで簡単に報告書を作れる。

**クライアント開発環境**

iReport(5.5.0)をダウンロード、インストール(Win版はinstallerがある) Download : [http://sourceforge.net/projects/ireport/files/iReport/](http://sourceforge.net/projects/ireport/files/iReport/)

＃iReportはJDK1.8では実行不可能 – JDK1.7が必要!

（ただ、この下の方法だとJDKのバージョンをわざわざ1.7にするなどの必要はない）

**\-------------------------------------------------------------------------------------**

**iReport****をインストールするだけで立ち上がらない場合は…**

[http://stackoverflow.com/questions/23902977/ireport-not-starting-using-jre-8](http://stackoverflow.com/questions/23902977/ireport-not-starting-using-jre-8)

（windows7 32bit, jdk1.8 / windows8.1 64bit, jdk1.8 の端末で成功）

まず、jreをダウンロードする。（tar.gzで圧縮されているJRE）

jre-7u79-windows-i586.tar.gz

または

jre-7u79-windows-x64.tar.gz

[http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html)それを展開する。

（二回圧縮したものだから、二回展開すること）

#Windowの基本の展開では解凍できないので、7zなどの解凍プログラムを利用すること。

そうすると、jre1.7.0\_79フォルダがでる。

これをiReportがインストールされたフォルダに入れる。

Ex) C:\\Program Files\\Jaspersoft\\iReport-5.5.0

その後、iReportフォルダのetcフォルダに入って、ireport.confをテキストエディタで開く。

#jdkhome="@@@@@@@"の下に

jdkhome=".\\jre1.7.0\_79"

を追加して保存する。

その後、iReport-5.5.0\\binでireport\_wを実行。

一回そうした後からはireportで実行してもできるようになる。

**もし、これでもできなかった場合は…**

[http://sourceforge.net/projects/jasperstudio/?source=typ\_redirect](http://sourceforge.net/projects/jasperstudio/?source=typ_redirect)

Jaspersoft Studioというプログラムを利用する。

iReportを組めて、いろんなJaspersoftの製品が入ってるプログラム。

これも開けれないかも知らないが…

Jaspersoft.ini ファイルを開き、

\-Xmx128m または　–Mmx1024mのDefault Valueを512mに変えるとOK。

後からは開ける。

**デフォルトではPDF出力時に日本語が表示されないので対応** iReportを開き、ツール→Option→iReport→Classpath→AddJAR iReportインストールディレクトリ/ireport/modules/ext/iTextAsian.jarを追加、了解。 Optionをまた開き、fontsでiTextAsian.jarにチェック

**（ここからはフォント設定済ならいらない）**

**レポートで各項目を以下のようにセット** Font Name:なんでもいい（PDFの場合、使われない） PDF Font Name:HeiseiKakuGo-W5 もしくはHeiseiMin-W3 PDF Embedded:チェックなし PDF Encoding:UniJIS-UCS2-H (Japanese) iReport再起動しないとプレビューのPDFに反映されないっぽい
