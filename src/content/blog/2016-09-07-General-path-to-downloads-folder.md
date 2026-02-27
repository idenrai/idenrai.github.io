---
title: "General path to downloads folder"
date: 2016-09-07
tags: ["Tech", "Java"]
tistory_url: "https://idenrai.tistory.com/89"
---

자바에서 csv파일을 다운로드하는 작업을 진행중이다.

어찌어찌 다운로드가 되긴 하는데...

따로 위치지정을 안했더니 그냥 막 프로젝트 내에 파일을 뱉어내더라.

다운로드 폴더에 위치지정을 하고 싶어서 알아보니...

그냥 **[Java](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html)[의 System Properties](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html)**에 Home Directory가 있는게 아닌가!

그래서 이렇게 해결.

```
SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
String strdt = sdf.format(new Date());
String downloadFolder = System.getProperty("user.home")+"/Downloads/";
String fileName = downloadFolder + strdt+ "_(officeCode)officeName.csv";
```
