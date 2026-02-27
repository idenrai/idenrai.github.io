---
title: "iReportでのフォント適用"
date: 2015-08-05
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/24"
---

**１．PDFで出力してほしいフォントのTrue Type Fontファイルを準備する。**

C:\\Windows\\Fonts

にあるフォントは、TTC（True Type Collection）ファイル。

これをBREAKTTC.EXEを使ってTTFファイルを抽出できる。

（TTSDK-TTC-BREAKTTC.EXE / ＭＳのもので、安全）

**２．TTFファイルをDesktopとかに置く。**

**３．iReportでの作業**

ツール→オプション→iReport→Fontsで、右側のInstall Fontをクリック。

Browseをクリックし、用意したTTFファイルを選択→次へ

Family Nameはそのままで、

Font detailsも、別になければ追加しなくてもいい。

PDF detailsでは

PDF Encoding : Identity-H(Unicode with horizontal writing)

Embed this font in the PDF documentにチェック

次へ　をクリックし、Locales画面で、完了をクリック

（ほかのとこで完了をクリックすると、なぜかエラー発生！）

※ 保安設定によって、フォントの登録時にAccess拒否になることがある。

この場合は、Window Installerではなく、EXEファイルで実行してみること。

完了を押したら、Fontsに今登録したフォントが入っているか確認。

入っていたら、それをクリック→Export as extensionをクリック

名前は同じくして、拡張子をjarにして保存。

ex) MS-PGothic.jar

**４．Classpath**

オプション→iReport→Classpathに移動。

Add JARをクリックして、さっき作ったjarファイルを登録。

その後、了解をクリックして、一回iReportを再起動。

再起動しないと適用されないので、必ず再起動すること。

**５．適用**

漢字を使いたいところを選んで、プロパティーを見る。

Text propertiesで

Font nameで、登録したフォントがあるか確認。

ここで出ないと、そのフォントはできないと考えてもいい…

今まではテストしたうちでは、

梅フォント、CP and Trans、font\_1\_honokamarugo\_1.1、nicomoji-plus\_v0.9、

MS-Gothic、MS-Mincho、MS-PGothic、MS-PMincho

フォントが選べたら、いったん成功。

後は、

下のPDF設定を触る。


PdfFont Nameには、

SelectBoxにフォントが出ないので、

Font nameからコピーして、貼り付けたらOK。

PDF Embeddedにはチェックし、

PDF EncodingにはIdentity-H(Unicode with horizontal writing)

**６．確認**

メニューのpreviewで、PDFを選択。

その後Previewを見ると、PDFでの出力が見れる。

**7．Eclipseでの適用**

以前exportしたjarファイルをプロジェクトのlibフォルダに入れる。

後、プロジェクトを右クリック→プロパティー

Javaのビルド・パス→ライブラリー→Jar追加

Jarファイルを入れたlibフォルダをクリックすると、

そのJarファイルをビルド・パスに登録できる。

これでＯＫ。
