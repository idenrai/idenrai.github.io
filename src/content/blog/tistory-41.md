---
title: "Creating JasperReport with subreports using datasource"
date: 2015-10-29
tags: ["Tech", "iReport"]
tistory_url: "https://idenrai.tistory.com/41"
---

출처 : [http://junaedhalim.blogspot.jp/2009/12/creating-jasperreport-with-subreports.html](http://junaedhalim.blogspot.jp/2009/12/creating-jasperreport-with-subreports.html) Creating JasperReport with subreports using datasource

In my previous post, I explained how to use datasources to create jasper reports. As I promised, now I am going to explain how to use subreports with datasources.

The concept is very similar. All we have to do is pass the appropriate datasource(s) to the subreport(s).

For example, say we have the following reports in hand:

1\. MasterReport.jrxml

2\. SubReport1.jrxml

3\. SubReport2.jrxml

Both the subreports are contained in the master report.

Now prepare the datasources for these reports (as list, as I mentioned in my previous post):

1\. masterReportDataList

2\. subReport1DataList

3\. subReport2DataList

Construct 3 TestDataSource(extends JRDataSource) type objects using these 3 lists. Say these are:

1\. masterReportDS

2\. subReport1DS

3\. subReport2DS

Now we have to pass these datasources to the appropriate reports.

I am going to pass the subreport datasources as parameters to the main report, while passing the master report datasource as usual - using the following call:

JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReportPath, parameters, masterReportDS);

In the parameter HashMap, we are going to put our subReport DataSources and any other parameters needed by the report.

Map parameters = new HashMap();

parameters.put('subreport\_datasource',subReport1DS);

parameters.put('subreport\_datasource\_2',subReport2DS);

Now open the master report using iReport. Add two parameters to the main report named subreport\_datasource and subreport\_datasource\_2. Set the data type of these two parameters as net.sf.jasperreports.engine.JRDataSource.

Open the properties window of subreport1. Set the following:

Connection type: Use a datasource expression

Data Source Expression: $P{subreport\_datasource}

Do the same for the other subreport:

Connection type: Use a datasource expression

Data Source Expression: $P{subreport\_datasource\_2}

If you are not using iReport, then open the masterReport.jrxml in any text editor. Go to the subreport section (look for ). Remove tag (if any). Add the following:

That's all. Now you can create reports containing subreports using DataSources. You can even have one subreport inside another.

There is a beautiful article I found earlier on this topic. You can find that here.

Thanks for visiting. Good bye.

정리하자면...

SubReport에 데이터를 보낼 때엔

MainReport에 net.sf.jasperreports.engine.JRDataSource 클래스로 Parameter를 정해 두고,

Java쪽에서 데이터를 MainReport에 보낼 때

SubReport용 Data를 해당 Parameter명으로 동봉해서 보내야 한다는 거다.

그렇게 받아온 Patameter를 다음과 같이

Connection type: Use a datasource expression

Data Source Expression: $P{subreport\_datasource}

해당 Parameter를 SubReport의 ReportData로 활용한다고 설정하면 된다.
