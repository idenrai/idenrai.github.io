---
title: "Error retrieving field value from bean"
date: 2015-12-16
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/44"
---

2015-12-16 12:20:08,726 ERROR - :Error retrieving field value from bean : cdKaisha

net.sf.jasperreports.engine.JRException: Error retrieving field value from bean : cdKaisha

at net.sf.jasperreports.engine.data.JRAbstractBeanDataSource.getBeanProperty(JRAbstractBeanDataSource.java:123)

at net.sf.jasperreports.engine.data.JRAbstractBeanDataSource.getFieldValue(JRAbstractBeanDataSource.java:96)

at net.sf.jasperreports.engine.data.JRBeanCollectionDataSource.getFieldValue(JRBeanCollectionDataSource.java:100)

at net.sf.jasperreports.engine.fill.JRFillDataset.setOldValues(JRFillDataset.java:1331)

at net.sf.jasperreports.engine.fill.JRFillDataset.next(JRFillDataset.java:1232)

at net.sf.jasperreports.engine.fill.JRFillDataset.next(JRFillDataset.java:1208)

at net.sf.jasperreports.engine.fill.JRBaseFiller.next(JRBaseFiller.java:1554)...

cdKaisha가 없다는 말이 떠서,

일단 jrxml파일의 오탈자를 확인하였으나 문제 없었음.

ReportForm에도 정확하게 cdKaisha가 적혀 있었고...

문제는 ReportForm에서 **Getter를 추가하지 않은 것 때문**이었음.

PT까지 끝내고 나서 한달쯤 후에 회사 코드와 영업소 코드를 넣어 수정을 하다 보니,

ReportForm의 Getter 추가까지는 생각이 미치지 않았던 것.
