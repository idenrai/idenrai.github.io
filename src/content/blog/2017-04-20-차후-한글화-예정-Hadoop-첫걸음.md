---
title: "[차후 한글화 예정] Hadoop 첫걸음"
date: 2017-04-20
tags: ["Tech", "Hadoop"]
tistory_url: "https://idenrai.tistory.com/125"
---

@markdown

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

\- \[root@test01 ~\]$ \*\*rpm -qa | grep jdk\*\*

\- 今のJDKを削除します。

\- \[root@test01 ~\]$ \*\*yum remove 今のJDK\*\* ex) yum remove java-1.7.0-openjdk-1.7.0.85-2.6.1.2.el7\_1.x86\_64

\- 削除確認

\- \[root@test01 ~\]$ \*\*rpm -qa | grep jdk\*\*

\- \[root@test01 ~\]$ \*\*java\*\*

\- \[root@test01 ~\]$ \*\*javac\*\*

\- \[root@test01 ~\]$ \*\*java -version\*\*

\- OracleJDKを\[ダウンロード\](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

\- ダウンロードするJDKは、Linux x64の\*\*jdk-8u60-linux-x64.tar.gz\*\*です。

\- ダウンロードしたJDKを、/usr/local フォルダに入れます。

\- JDKのインストール

\- Terminalを開き、RootでLoginします。

\- フォルダ移動：\[root@test01 ~\]$ \*\*cd /usr/local/\*\*

\- 権限修正：\[root@test01 ~\]$ \*\*chmod 755 jdk-8u60-linux-x64.tar.gz\*\*

\- インストール（Unzip）：\[root@test01 ~\]$ \*\*tar xvfz jdk-8u60-linux-x64.tar.gz\*\*

\- Symbolic Link ：\[root@test01 ~\]$ \*\*ln -s jdk1.8.0\_60 java\*\* (JDKをすぐ探せるように)

\- \*\*ls -l\*\*で確認すると、javaというSymbolic Linkがあるのを確認できます。

\- 環境変数の登録

\- /etc/profileを開き、一番下に次のように環境変数を登録します。

\- \[root@test01 ~\]$ \*\*export JAVA\_HOME=/usr/local/java\*\*

\- \[root@test01 ~\]$ \*\*export PATH=$PATH:$JAVA\_HOME/bin\*\*

\- \[root@test01 ~\]$ \*\*export CLASS\_PATH="."\*\*

\- profileの編集が終わったらTerminalに戻り、変更されたprofileをシステムに適用します。

\- \[root@test01 ~\]$ \*\*source /etc/profile\*\*

\- JDK設置確認

\- \[root@test01 ~\]$ \*\*java\*\*

\- \[root@test01 ~\]$ \*\*javac\*\*

\- \[root@test01 ~\]$ \*\*java -version\*\*

\- \*\*この方法で、すべてのサーバーにJDKを設置します。\*\*

\#### Network Setting

\- Hadoopはサーバー間でSSHプロトコルを使って通信を行います。

\- SSHでの通信は、IPまたはホスト名で接続できます。

\- 今回はHost名を使って通信をしますので、test01～04の各サーバーに固定IPを設定し、各HostどんなIPを持つのかを定義するようにします。

\- 装置のIP確認

\- WindowsのCMD上で確認できます。（\*\*Windowsキー＋R\*\* → cmd → \*\*ipconfig\*\*）

\- VirtualBox Network Setting

\- 仮想マシンを右クリック→設定に入ります。

\- ネットワーク設定で、アダプター１の設定を変更します。

\>割り当て：ブリッジアダプター

\>名前：（この装置の場合は）Intel(R) Wireless-N 7260

\>プロミスキャスモード：すべて許可

\- CentOSの私設IP設定

\- CentOS7.0でのNetwork Interfaceの名称は、「en～」です。

\- CentOSのターミナルでifconfigで確認してみると、今回は\*\*「enp0s3」\*\*でしたので、これを修正します。

\- 設定ファイルの位置は、「/etc/sysconfig/network-script」の下です。ここで「ifcfg-enp0s3」を開き、修正します。

\- Install時にNetworkをOnにしたら、基本的にはDHCPになってます。

\>TYPE="Ethernet"

\>BOOTPROTO="dhcp"

\>DEFROUTE="yes"

\>IPV4\_FAILURE\_FATAL="no"

\>IPV6INIT="yes"

\>IPV6\_AUTOCONF="yes"

\>IPV6\_DEFROUTE="yes"

\>IPV6\_FAILURE\_FATAL="no"

\>NAME="enp0s3"

\>UUID="48e57651-8bdb-4fa4-bb04-168de248f235"

\>ONBOOT="yes"

\>HWADDR="08:00:27:40:97:D4"

\>PEERDNS="yes"

\>PEERROUTES="yes"

\>IPV6\_PEERDNS="yes"

\>IPV6\_PEERROUTES="yes"

これを私の装置のIP固定IP帯域の「192.168.0.101」に設定します。

\>TYPE="Ethernet"

\>BOOTPROTO=\*\*"static"\*\*

\>DEFROUTE="yes"

\>IPV4\_FAILURE\_FATAL="no"

\>IPV6INIT="yes"

\>IPV6\_AUTOCONF="yes"

\>IPV6\_DEFROUTE="yes"

\>IPV6\_FAILURE\_FATAL="no"

\>NAME="enp0s3"

\>UUID="48e57651-8bdb-4fa4-bb04-168de248f235"

\>ONBOOT="yes"

\>HWADDR="08:00:27:40:97:D4"

\>

\>\*\*IPADDR="192.168.0.101"\*\*

\>\*\*NETMASK="255.255.255.0"\*\*

\>\*\*GATEWAY="192.168.0.1"\*\*

\>\*\*DNS1="192.168.1.1"\*\*

\>\*\*DNS2="192.126.63.2"\*\*

こうやって修正して保存し、ターミナルでNetworkを再起動します。

\- 変更確認

\>「service network restart」 または、「systemctl restart network」

\- 再起動が終わったら、ifconfigでIPが「192.168.0.101」になったかを確認します。

\- ちゃんと変更されたら、「ping 8.8.8.8」・「ping google.com」などで、インタネットができるのも確認します。

\- 「64 Bytes from 8.8.8.8: icmp\_seq=1 ttl=54 time=9.68 ms」などが出力されたらOKです。

\- または、GUI画面でfirefoxを開き、インタネット接続ができるか確認してもOKです。

\- この設定を残りのサーバーにも全部行います。固定IPは下の通りにしておきます。

\> test01 :「192.168.0.101」

\> test02 :「192.168.0.102」

\> test03 :「192.168.0.103」

\> test04 :「192.168.0.104」

\- HOSTファイル修正(/etc/host)

\- SSH接続で、サーバー間Host名がどんなIPを保有するのかを定義します。

\- 一番下に、この通り入力すればOKです。この作業も４つ全部設定します。

\> 192.168.0.101 test01

\> 192.168.0.102 test02

\> 192.168.0.103 test03

\> 192.168.0.104 test04

\#### SSH Setting

\- NameNode(test01)で、他のサーバーに接続するため、SSHの設定をします。

\- この作業は、rootではなく、他に作っておいたユーザ(hadoop)で行います。

\- NameNodeでSSH公開キーを生成

\- \[hadoop@test01 ~\]$ \*\*ssh-keygen -t rsa\*\*

\- 生成確認

\- \[hadoop@test01 ~\]$ \*\*cat ~/.ssh/id\_rsa.pub\*\*

\- ssh-copy-idで、他のサーバーにCopyすします。

\- \[hadoop@test01 ~\]$ \*\*ssh-copy-id -i /home/hadoop/.ssh/id\_rsa.pub hadoop@test02\*\*

\- Are you sure you want to continue connecting? : yes

\- hadoop@test02's password : hadoop

\- ここまでできたら、後からは簡単にNameNodeからDataNodeへの接続が可能です。

\- \[hadoop@test01 ~\]$ \*\*ssh wikibbooks02\*\*

\- Passwordを確認せずに、そのままDataNodeへの接続ができるのを確認します。

\- コピ作業を、他のServerにも繰り返します。

\- \[hadoop@test01 ~\]$ \*\*ssh-copy-id -i /home/hadoop/.ssh/id\_rsa.pub hadoop@test03\*\*

\- \[hadoop@test01 ~\]$ \*\*ssh-copy-id -i /home/hadoop/.ssh/id\_rsa.pub hadoop@test04\*\*

\- \[hadoop@test01 ~\]$ \*\*ssh-copy-id -i /home/hadoop/.ssh/id\_rsa.pub hadoop@test01\*\*

(test01 自分自身にもCopyします。)

\### Hadoop Download, Install, Setting

\#### Hadoop Downloadと設置

\- \[Hadoop Download\](http://www.apache.org/dyn/closer.cgi/hadoop/common/)

\- またはwgetでもダウンロードできます。

\- \*\*wget "http://www.eu.apache.org/dist/hadoop/common/hadoop-1.2.1/hadoop-1.2.1.tar.gz"\*\*

\- Rootでダウンロードした場合はそのままrootのhomeにhadoop-1.2.1.tar.gzがありますが、今回は別のユーザを使うので、tarファイルを\*\*/home/hadoop（ユーザHadoopのホームディレクトリー）\*\*に位置します。

\- \[root@test01 ~\]# \*\*su - hadoop\*\*

\- \[hadoop@test01 ~\]# \*\*tar xvfz hadoop-1.2.1.tar.gz\*\* (解凍・設置)

\- \[hadoop@test01 ~\]# \*\*ln -s hadoop-1.2.1 hadoop\*\* (hadoop-1.2.1のSymbolicLink生成)

\- この作業も、すべてのサーバーで行います。

\#### Hadoop環境設定ファイル修正

\- confフォルダ内の環境設定ファイルを修正することで、Hadoopの設置作業は終わります。

\- hadoop-env.sh : Hadoopを実行するセールスクリプトダイルで必要な環境変数を設定。JDK経路、クラスパス、デモン実行オプションなど

\- masters : SecondaryNameNodeServer設定

\- slaves : DataNodeServer設定

\- core-site.xml : HDFSとMapReduceで共通に使う環境情報を設定

\- hdfs-site.xml : HDFSでの環境情報設定

\- mapred-site.xml : MapReduceでの環境情報を設定

\- hadoop-env.sh 修正

\- JAVA\_HOMEを実際のJDK経路に修正します。「\*\*export JAVA\_HOME=/usr/local/java\*\*」

\- HadoopデモンのPID情報のディレクトリーを設定します。「\*\*export HADOOP\_PID\_DIR=/home/hadoop/hadoop-1.2.1/pids\*\*」

\- masters 修正

\- SecondaryNameNodeで使うサーバーを設定します。「\*\*test02\*\*」

\- slaves 修正

\- データノードを実行するサーバーを設定します。一行に一つづつ書きます。「\*\*test02\*\*, \*\*test03\*\*, \*\*test04\*\*」

\- core-site.xml 修正

\`\`\`xml

fs.default.name

hdfs://test01:9000

hadoop.tmp.dir

/home/hadoop/hadoop-data/

\`\`\`

\- hdfs-site.xml 修正

\`\`\`xml

dfs.replication

3

dfs.http.address

test01:50070

dfs.secondary.http.address

test02:50090

\`\`\`

\- mapred-site.xml 修正

\`\`\`xml

mapred.job.tracker

test01:9001

\`\`\`

\- 全てのデータノードサーバーに同じ設定をします。

\- 今まで修正したconfフォルダのファイルをscpを利用して各サーバーに送ります。

\- \*\*\[hadoop@test01 ~\]$ scp -r /home/hadoop/hadoop/conf hadoop@test02:/home/hadoop/hadoop/\*\*

\- \*\*\[hadoop@test01 ~\]$ scp -r /home/hadoop/hadoop/conf hadoop@test03:/home/hadoop/hadoop/\*\*

\- \*\*\[hadoop@test01 ~\]$ scp -r /home/hadoop/hadoop/conf hadoop@test04:/home/hadoop/hadoop/\*\*

\### Hadoop実行

\- NameNodeを初期化し、すべてのデモンを実行するとHadoopが実行されます。

\- Hadoop Namenode Format

\- \*\*\[hadoop@test01 hadoop\]$ ./bin/hadoop namenode -format\*\*

\- すべてのデモンを実行

\- \*\*\[hadoop@test01 hadoop\]$ ./bin/start-all.sh\*\*

\- Hadoopデモン実行確認

\- NameNode Serverでの確認：\*\*\[hadoop@test01 hadoop\]$ jps\*\*

\- NameNode, JobTrackerが出力されたらオッケーです。

\- DataNode Serverでの確認：\*\*\[hadoop@test02 ~\]$ jps\*\*

\- DataNode, TaskTrackerが出力されたらオッケーです。test02はSecondaryNameNodeなので、追加にSecondaryNameNodeも出力されます。

\- Hadoop Web Interface

\- ここまでできたら、WebInterfaceにも入れます。

\- ウェブブラウザーで、「http://NameNodeServer IP:50070」に入ることで、ウェブ画面が出ます。

\- このページでは、HDFSの状態情報やNameNodeに入っているHadoopLog、HDFSに保存されたファイルを見れます。

\#### \*\*※ Map Reduce\*\*

\- Map Reduce : HDFSに保存されたファイルを分散・配置・分析できるように助けてくれるFramework。

\- 開発者がMap Reduce Programming Modelによる分析ロジックを具現すると、データ伝送や分散処理などの作業はMap Reduce Frameworkが自動で処理します。

\- Map Reduceプログラミングモデルは、MapとReduceの二段階でデータを処理します。

\- Map : Transformation - 入力されたファイルを一行づつ読み込んでデータを変形。

\- Reduce : Aggregation - Mapの結果のデータを集計。

\- ex) Read a newspaper, Read a book を入力時…

\>\*\*入力\*\*

\>read a newspaper / read a book

\>

\>\*\*Map\*\*

\>read 1 / read 1

\>a 1 / a 1

\>newspaper 1 / book 1

\>

\>\*\*Reduce\*\*

\>read 1

\>a 1

\>newspaper 1

\>read 1

\>a 1

\>book 1

\>

\>\*\*出力\*\*

\>read 2

\>a 2

\>newspaper 1

\>book 1

\- Map Reduceシステムの構成

\- Client : ユーザが実行したMap Reduceプログラム＆Hadoopで提供するMap Reduce APIです。

\- Job Tracker : Map Reduceプログラムは「job」という作業単位で管理されますが、このjobのスケジュールを管理・モニタリングするのが「JobTracker」です。

\- Task Tracker : ユーザが設定したMap Reduceプログラムを実行します。（JobTrackerが要請した「Map」と「Reduce」の個数ほどの「MapTask」と「ReduceTask」を生成・実行します。

\## 例題実行

\### WordCount

\- Hadoopは例題のコードとjarファイルを提供します。

\- 今回は例題で提供される「WordCount」という、単語の個数を数えるプログラムを使ってhadoop-env.shファイルの単語個数を数えみます。

\- まず、hadoop-env.shファイルをHDFSにアップロードします。

\- \*\*\[hadoop@test01 hadoop\]$ ./bin/hadoop fs -put conf/hadoop-env.sh conf/hadoop-env.sh\*\*

\- \*\*fs (FileSystemShell)\*\*：使用者がHDFSを簡単に制御するために使う命令語。

\- Hadoopのホームディレクトリーで「 \*\*./bin/hadoop fs - cmd \[asgs\]\*\* 」の形で実行します。

\- Hadoop命令語を使って、\*\*hadoop-examples-\*.jar\*\*ファイルにあるwordcount Classを実行します。

\- \*\*\[hadoop@test01 hadoop\]$ ./bin/hadoop jar hadoop-examples-\*.jar wordcount conf/hadoop-env.sh wordcount-output\*\*

\- 入力値は「conf/hadoop-env.sh」、出力値は「output」フォルダです。

\- 後は、wordcountの出力値が正常的に作られたかの確認です。

\- \*\*\[hadoop@test01 hadoop\]$ ./bin/hadoop fs -cat wordcount\_output/part-r-00000\*\*

\- これで、hadoop-env.shファイルの単語別個数が出力されるのを見れます。

\## まとめ

\### \*\*Hadoopは、RDBMSを代替する魔術棒ではありません\*\*

\- Hadoopは既存のRDBMS（Oracle, MS-SQL, MySQLなど）と相互補完の関係です。

\- 大量のログやデータを早く処理する時は確かに、Hadoopを使うのがいいです。

\- でもHadoopは秒単位以下でデータをお互い報告したり、多段階の複雑なトランザクションでのデータの運用などには強くないです。

\- なので、\*\*データ完全性\*\*と\*\*正確さ\*\*が要求される、銀行取引などの作業には今の通りRDBMSが適合です。

\- また、データが挿入と削除で更新される場合にもRDBMSを使った方が効果的です。

\### \*\*始め半分\*\*

\- 今日の発表ではHadoop勉強のための環境構築や簡単な動き方を調べてみました。

\- どんなシステムでも、最初のSettingが一番つらいもの。

\- これで誰でもHadoopを実行できる環境が構築できますので、皆さんもスペックアップの一貫でHadoopを始めるのはどうでしょうか？

\## 参考

\- Hadoop-The Definitive Guide (Tom White)

\- 시작하세요! 하둡 프로그래밍 (정재화)

\- \[MapR Academy\](https://www.mapr.com/services/mapr-academy/big-data-hadoop-online-training)

\- \[Oracle VirtureBoxでのCentOS設置\](http://zetawiki.com/wiki/VirtualBox\_CentOS\_6\_%EC%84%A4%EC%B9%98)

\- \[目標設定参考\](http://kertz.egloos.com/209218)

\- \[CentOS7でifconfig使用\](http://confile.info/2212)

\- \[CentOS7 Network Setting 参考1\](http://manseok.blogspot.jp/2014/08/centos-70.html)

\- \[CentOS Network Setting 参考2\](http://www.gooday.kr/bbs/board.php?bo\_table=note&wr\_id=163)

\- \[CentOS Network Setting 参考3\](http://webdir.tistory.com/116)

\- \[Hadoop設置\](http://evir.tistory.com/category/Hadoop)

\- \[WordCount使用方法\](http://gorakgarak.tistory.com/373)
