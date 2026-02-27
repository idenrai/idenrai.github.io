---
title: "Hadoop 完全分散モードでSetting"
date: 2015-10-10
tags: ["Tech", "Hadoop"]
tistory_url: "https://idenrai.tistory.com/33"
---

[Qiita로 이동 (Qiitaの方へ移動)](http://qiita.com/YoungjaeKwon/items/e6e12a3a5158bc02d5b5)

언어 : 일본어

言語：日本語

마크다운으로 작성.

Markdownで作成。

여기엔 보관용으로 마크다운 소스를 그대로 올렸음.

ここには保存のため、Markdownのままで乗せました。

내용은 일단 Qiita쪽을 참조할 것.

内容については、上のQiitaの方を参考してください。

소스 보기

初めてのHadoop

\# Hadoop

\## Hadoopとは

\- doopaH?

\- 大容量のデータを分散処理できる、JAVA基盤のオープンソースフレイームワーク

\### ビックデータの登場

\- 今はビックデータ(3V：大きさVolume, 速度Velocity, 多様性Variety)の時代。

\- 既存のデータ処理方法では、ビックデータを扱いにくい

\- 既存の定形データはRDBMSでも保存できるが、否定形データまで保存するにはデータが大きすぎる

\### Hadoop

\- ビックデータを分散処理できるJAVA基板のOpenSourceFramework

\- Googleが論文で発表した分散処理技術GFSとMap ReduceをDoug CuttingがJavaで具現

\- 名前の由来は、Doug Cuttingの息子のおもちゃの名前

\- 分散ファイルシステム \*\*HDFS(Hadoop Distributed File System)\*\*でデータを保存

\- 分散処理システム \*\*Map Reduce\*\*でデータを処理

\- Hadoop Echo System

\- Hadoop Core Project : HDFS, Map Reduce

\- Sub Project : Zookeeper, HBase, Hive, …

\### なぜHadoopなのか？

\- SWライセンス費用：OpenSourceプロジェクトで、ライセンス費用の負担がない

\- エキップメント：高いUNIX装備を使わず、LINUXサーバーだけあれば運営できる

\- 安定性：データの複製本を保存し、データの異質や障害の発生でも復旧可能

\- 分散コンピューティング：複数のサーバーにデータを保存し、各サーバーで同時にデータを処理

\- 130年分の新聞記事をHadoopを使って一日でPDF化。一般のサーバーだと14年分の作業量

\## 環境構築手順

\### 目標

\- 完全分散モードでのHadoop設定と例題実行

\- SettingをしながらのHDFSとMapReduceの構造を説明

\### 基本設定

\- 装置スペック

\- CPU : i3-4000M 2.40GHz

\- RAM : 4.0GB

\- OS : Microsoft Windows 8.1 Enterprise K 64Bit

\- 実行モード：完全分散(Fully Distributed)モード

\- ２つ以上の装置にHadoop環境を設定(ここではOracle VirtualBoxを使用)

\- OS : CentOS-7.0

\- Hadoopバージョン：1.2.1

\- サーバー構成(４つのサーバーを準備します)

\- test01 : NameNode

\- test02 : Secondary NameNode, DataNode

\- test03 : DataNode

\- test04 : DataNode

\#### \*\*※ Hadoopのモード\*\*

\- 独立モード：Local(Standalone) Mode

\- Local Machineで実行

\- 他ノードとの通信をしないので、HDFSとデモンを使わない。

\- 独立的にMap Reduceのロジック開発に使います。

\- 仮想分散モード：Psudo-Distributed Mode

\- 一台の装置でクラスタを構成し、すべてのデモンを実行

\- ローカルモードのUpgrade板

\- Hadoopを勉強する時に有用です。

\- 完全分散モードFully-Distributed Mode

\- 多数の装置でクラスタを構成し、分散保存・分散演算のすべての機能を実行。

\#### \*\*※ HDFSの構造\*\*

\- \*\*ブロック構造\*\*のファイル・システム

\- HDFSに保存されるファイルは64MBのブロックに分けられて、分散されたサーバーに保存されます。

\- ex) 200MBのファイルがHDFSに保存される時は、64MB, 64MB, 64MB, 8MBの４つのブロックになリます。

\- 保存する時は、\*\*基本的にブロック当たり３つのコピー本を保存\*\*

\- 一つのサーバーに全てのブロックを入れるのではなく、多数のサーバーに分けて保存することで、安全性が高まります。

\- ex) 上の例のブロック１～４をDataNodeに保存するとしたら、DataNode1\[1, 3, 4\], DataNode2\[1, 2, 3\], DataNode3\[2, 3, 4\], DataNode4\[1, 2, 4\]みたいな形で分散。

\- Master-Slaveアーキテクチャ

\- NameNode（Master Server）：ファイルシステムの維持のためのメタデータを管理、データノードモニタリング、ブロック管理、クライエントの要求を受け取る

\- DataNode（Slave Server）：クライエントがHDFSに保存するファイルを\*\*メタデータ\*\*（ファイル名・ファイル生成日など）と\*\*ローデータ\*\*（実際のデータ）に分けて、ローカルディスクに保存

\- Secondary NameNode（Checkpointing Server）：NameNodeのメタデータのFile System Imageを周期的（基本１時間）に更新し、NameNodeの負担を軽くします。

\### Linux Serverの準備

\- 下準備

\- \[Oracle VM Virtualbox\](https://www.virtualbox.org/wiki/Downloads)

\- \[CentOS\](https://www.centos.org/download/)

\- VM生成

\- VirtualBoxをインストールしたら、新規をクリック

\- 名前 : test01

\- タイプ : Linux

\- バージョン : Other Linux (64bit)

\- メモリーサイズ : 512MB

\- ハードタイプ : 仮想ハードドライブを作成する

\- ハードドライブのファイルタイプ : VMDK(Virtual Machine Disk)

\- ストレージ : 可変サイズ (4GB以上)

\- CentOS インストール

\- Test this media and Install CentOS

\- 後、インストール画面が出たら、言語を設定し、後のインストールも進めます。

\- Network設定

\- ネットワークをONにして、Host名は上の通り、test01にします。

\- インストール中にRoot暗号やユーザ設定をします。

\- ここではRoot暗号をrootにしておきます。

\- インストールが全部できたら、再起動を押します。

\- もしここでインストールができなかったら、それはまだ３２－６４ビット設定ができてないからです。

\- CMOSで、Advanced - CPUに入り、VirtualizationをEnabledに変更します。

\- この作業を４回繰り返すと、Hadoopテストのサーバーは準備完了です。

\### CentOSの設定

\#### CentOS Update ＆ wget Install

\- Update

\- \[root@test01 ~\]$ \*\*yum update\*\*

\- wgetインストール可能確認

\- \[root@test01 ~\]$ \*\*yum info wget\*\*

\- wgetインストール

\- \[root@test01 ~\]$ \*\*yum install wget -y\*\*

\- GUIモード設置

\- \[root@test01 ~\]$ \*\*yum groupinstall "base"\*\*

\- \[root@test01 ~\]$ \*\*yum -y groups install "GNOME Desktop"\*\*

\- \[root@test01 ~\]$ \*\*startx\*\*

\- 今後からはGUI環境で実行します。

\#### JDK Install

\- Hadoopを使うには、必ずJavaが必要ですので、JDKをインストールします。

\- ここまで来たらmopenjdkがもう設置されていますが、ここではOracle JDKをインストールするようにします。

\- 今設置されているJDKのVersion確認

\- \[root@test01 ~\]$ \*\*rpm -qa

[

参考資料\_151009.xlsx

다운로드

](./file/参考資料_151009.xlsx)
