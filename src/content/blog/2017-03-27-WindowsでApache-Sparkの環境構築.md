---
title: "WindowsでApache Sparkの環境構築"
date: 2017-03-27
tags: ["Tech", "Spark"]
tistory_url: "https://idenrai.tistory.com/120"
---

**１．[Java設置](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)**

**２．[Python設置](https://www.python.org/downloads/)**

**３．[HADOOP設置](https://github.com/karthikj1/Hadoop-2.7.1-Windows-64-binaries/releases)**

**４．[Spark設置](http://spark.apache.org/downloads.html)**

**５．システム環境変数にPATH追加**

```
JAVA_HOME=設置フォルダ
SPARK_HOME=設置フォルダ
PYTHONPATH=$SPARK_HOME/python/lib/pyspark.zip:$SPARK_HOME/python/lib/py4j-0.8.2.1-src.zip
HADOOP_HOME=設置フォルダ
Colored by Color Scripter
```

**６．システム環境変数のpathにSpark設置フォルダ\\bin追加**

```
C:\spark-2.1.0-bin-hadoop2.7\bin
```

**７．Windowsの場合**

HADOOP\_HOMEを設定しないとエラー & Hiveを設定しないとエラー

```
%HADOOP_HOME%/bin/winutils.exe chmod 777 C:\tmp\hive
```

**８．CONF設定**

$SPARK\_HOME$/conf/log4j.properties.templateをコピーし、log4j.propertiesを作成

```
cp $SPARK_HOME$/conf/log4j.properties.template log4j.properties
```

log4j.propertiesを編集

```
log4j.rootCategory=WARN, console # INFO->WARN
```

**９．テスト（cmdで実行）**

適当なフォルダにテストしたいファイルを置いて、cmd上でpysparkを実行

```
C:\spark>pyspark
```

\>>>がでたら

```
>>> textFile = sc.textFile("README.md")
>>> textFile.count()
104

>>> textFile.first()
u'# Apache Spark'
```

１０．ファイルを使ってテスト

simple.py

```
from pyspark import SparkContext

logFile = "./README.md" # Should be some file on your system
sc = SparkContext("local", "Simple App")
logData = sc.textFile(logFile).cache()

numAs = logData.filter(lambda s: 'a' in s).count()
numBs = logData.filter(lambda s: 'b' in s).count()

print("Lines with a: %i, lines with b: %i" % (numAs, numBs))

sc.stop()
Colored by Color Scripter
```

```
PS C:\spark> spark-submit --master local[4] simple.py
17/03/28 12:07:08 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
s where applicable
Lines with a: 62, lines with b: 30
Colored by Color Scripter
```

参考

[Spark 설치 (Standalone](http://cdecl.tistory.com/305)[)](http://cdecl.tistory.com/305)
