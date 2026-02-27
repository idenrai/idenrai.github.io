---
title: "NoSuchMethodException: Unknown property ' '"
date: 2015-10-29
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/40"
---

참고 : [https://community.jaspersoft.com/questions/527187/nosuchmethodexception-unknown-property](https://community.jaspersoft.com/questions/527187/nosuchmethodexception-unknown-property)

Caused by: java.lang.NoSuchMethodException: Unknown property '' on class 'class jp.co.sbs.tms.report.\*\*\*ReportForm'

at org.apache.commons.beanutils.PropertyUtilsBean.getSimpleProperty(PropertyUtilsBean.java:1313)

at org.apache.commons.beanutils.PropertyUtilsBean.getNestedProperty(PropertyUtilsBean.java:762)

at org.apache.commons.beanutils.PropertyUtilsBean.getProperty(PropertyUtilsBean.java:837)

at org.apache.commons.beanutils.PropertyUtils.getProperty(PropertyUtils.java:426)

at net.sf.jasperreports.engine.data.JRAbstractBeanDataSource.getBeanProperty(JRAbstractBeanDataSource.java:111)

이와 같이,

ReportForm에서 property '' 을 찾을 수 없다며 에러가 뜨는 경우가 있다.

iReport는 java등에서 new JRBeanCollectionDataSource(reportData)의 형식으로 데이터 소스를 받아,

고정 Parameter인 REPORT\_DATA\_SOURCE로 받아온다.

이 parameter의 클래스는 net.sf.jasperreports.engine.JRDataSource이다.

(API : [http://jasperreports.sourceforge.net/api/net/sf/jasperreports/engine/data/JRBeanCollectionDataSource.html](http://jasperreports.sourceforge.net/api/net/sf/jasperreports/engine/data/JRBeanCollectionDataSource.html))

이 데이터소스에서 레포트 내에 정의된 Field명과 동일한 것을 뽑아와 사용하는 것인데,

이때 Default 설정은 Field Name을 사용하는 것이지만,

만일 Field Description이 존재한다면 이것이 우선한다.

보통은 아무것도 적지 않거나 Name과 동일하게 설정하는데,

아무것도 적지 않을 경우 가끔 위와 같은 에러가 발생하게 된다.

iReport가 멋대로

와 같은 형식으로 fieldDescription을 생성해 버리는 것이다.

(아마 Field Description을 실수로 입력했다가 지운 경우 발생하는 것 같다.)

이렇게 일단 Field Description을 만들어 버리면

레포트는 이를 우선으로 읽어버리게 되는 것이다.

이에 대한 해결책은 다음과 같다.

-   **Remove the empty field descriptions from the JRXML.** 이와 같이 fieldDescription 항목을 아예 없애거나
-   **Set the field descriptions to match the bean property names.** fieldDescription을 field name과 동일하게 맞추거나

-   **Pass false as isUseFieldDescription when creating the bean data source, e.g. new JRBeanCollectionDataSource(data, false).** 아예 DataSource를 넘길 때, FieldDescription을 쓰지 않겠다고 설정하는 것이다. `**[JRBeanCollectionDataSource](http://jasperreports.sourceforge.net/api/net/sf/jasperreports/engine/data/JRBeanCollectionDataSource.html#JRBeanCollectionDataSource\(java.util.Collection,%20boolean\))**(java.util.Collection beanCollection, boolean isUseFieldDescription)`
