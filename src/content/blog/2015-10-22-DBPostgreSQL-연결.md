---
title: "DB(PostgreSQL) 연결"
date: 2015-10-22
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/37"
---

**１．iReportを立ち上げたら、JDBCファイルを連結する。**

ここではPostgreSqlをインストールするので、PostgreSqlの設置フォルダのJDBCドライバーを使う。

iReportで メニュー → ツール → Options → Classpath → Add JAR

C:\\Program Files\\PostgreSQL\\pgJDBCの

postgresql-9.4-1200.jdbc4.jar, postgresql-9.4-1200.jdbc41を登録、了解を押す。

**（チェックはしなくてもいい。）**

もし、ここにない場合は、

[https://jdbc.postgresql.org/download.html](https://jdbc.postgresql.org/download.html)

ここでpostgresql-9.4-1200.jdbc4とpostgresql-9.4-1200.jdbc41をダウンロードして

C:\\Program Files\\PostgreSQL\\pgJDBCに入れること。　

**２．DB****の****準備（PostgreSQL****で****）**

**DB生成**

CREATE DATABASE "MYDB01" WITH OWNER = postgres

ENCODING = 'UTF-8'

TABLESPACE = pg\_default;

このQueryを実効してリフレッシュを押したら、DBが作れたはず。

後からのQueryはこのMYDB01で実行すること！

**Table****生成**

```
CREATE TABLE rel (
rel_id int2 NOT NULL
,rel_name text,
CONSTRAINT "rel_PK" PRIMARY KEY (rel_id)
)

CREATE TABLE tbl01 (
uid int4 NOT NULL
,fname text
,telno1 text
,rel_id int2
,CONSTRAINT "tbl01_PK" PRIMARY KEY (uid)
)

Colored by Color Scripter
```

**Data****入力**

```
insert into rel(rel_id, rel_name) values(1,'家族');
insert into rel(rel_id, rel_name) values(2,'親戚');
insert into rel(rel_id, rel_name) values(3,'同期');
insert into rel(rel_id, rel_name) values(4,'後輩');
insert into rel(rel_id, rel_name) values(5,'先輩');
insert into tbl01(uid,fname,telno1,rel_id) values(1,'父','011-111-1111',1);
insert into tbl01(uid,fname,telno1,rel_id) values(2,'母','022-222-2222',1);
insert into tbl01(uid,fname,telno1,rel_id) values(3,'妹','033-333-3333',1);
insert into tbl01(uid,fname,telno1,rel_id) values(4,'兄','044-444-4444',1);
insert into tbl01(uid,fname,telno1,rel_id) values(5,'伯父さん','055-555-5555',2);
insert into tbl01(uid,fname,telno1,rel_id) values(6,'伯母さん','066-666-6666',2);
insert into tbl01(uid,fname,telno1,rel_id) values(7,'AAA','077-777-7777',3);
insert into tbl01(uid,fname,telno1,rel_id) values(8,'SSS','088-888-8888',3);
insert into tbl01(uid,fname,telno1,rel_id) values(9,'DDD','099-999-9999',3);
insert into tbl01(uid,fname,telno1,rel_id) values(10,'FFF','100-100-1000',4);
insert into tbl01(uid,fname,telno1,rel_id) values(11,'GGG','200-200-2000',4);
insert into tbl01(uid,fname,telno1,rel_id) values(12,'BBB','300-300-3000',4);
insert into tbl01(uid,fname,telno1,rel_id) values(13,'Aさん','123-123-1234',5);
insert into tbl01(uid,fname,telno1,rel_id) values(14,'Bさん','234-234-2345',5);
insert into tbl01(uid,fname,telno1,rel_id) values(15,'Cさん','345-345-3456',5);

Colored by Color Scripter
```

このSQLを実行し、データを準備する。

データが準備できたら、このReportに使うSQL文を作成

```
SELECT b.rel_name, a.fname, a.telno1
FROM tbl01 a LEFT JOIN rel b ON a.rel_id = b.rel_id
ORDER BY b.rel_name

Colored by Color Scripter
```

レポートを作る準備完了！

**３．使うデータソースの定義**

メニューのReport Datasourcesをクリック → New → Database JDBC Connection

自分のPostgresのUsername・PW入力

Testボタンを押して、連結ができたか確認。

連結ができたらSave

JDBC Driver : PostgreSQL (org.postgresql.Driver)

JDBC URL : jdbc:postgresql:\\\\localhost:5432\\YourDatabaseName

JDBC URLの最後は、連結するデータベースの名前を入れること。

ここではMYDB01なので、MYDB01を入れればOK。

ここまで全部終わったら、iReportを一回再起動すること。

**４．iReport****でレポートを作ってみよう****！**

Step 1.

メニュー → ファイル → New… → ReportでTemplateを選択（Simple Blueをお勧め）

→ Launch Report Wizard → Reportの名前とLocationなどを定義。

→ Queryでは、使うDBを選ぶ

MyDB01を選択後、準備したSQL文を入れる

Step 2. Fields画面で、すべてのColumnを右側に移す。（">>" ボタンクリック）

Step 3. Group byでは何もしないまま、次へ

Step 4. Finishボタンをクリック

まずは保存をする。CompileとPreviewも…

PDFでも見てみよう。

メニュー → Preview → PDF Preview → Preview

**５．日本語が見れる作業。**

iReportインストールディレクトリの　/ireport/modules/ext/iTextAsian.jar をCopyして、

ex) C:\\Program Files\\Jaspersoft\\iReport-5.5.0\\ireport\\modules\\ext\\iTextAsian.jar

iReportにlibフォルダを作って入れる。

ex) C:\\Program Files\\Jaspersoft\\iReport-5.5.0\\lib\\iTextAsian

iReportを再起動する。

さっき作った report01.jrxml　をOpenして、

日本語を見せる項目のPropertiesで

Font Name:なんでもいい（PDFの場合、使われない） PDF Font Name:HeiseiKakuGo-W5 もしくはHeiseiMin-W3 PDF Embedded:チェックなし PDF Encoding:UniJIS-UCS2-H (Japanese)

をSetting、保存後にPreviewすると…

完了。
