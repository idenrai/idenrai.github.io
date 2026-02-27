---
title: "MAP→CSV→ZIP"
date: 2016-09-09
tags: ["Tech", "Java"]
tistory_url: "https://idenrai.tistory.com/91"
---

Map으로 받아온 데이터를 CSV로 만들어, 이를 Zip으로 압축하여 다운로드.

이 때, CSV는 사업소별로 나누어져야 하며, 파일로 생성되어선 안됨.

즉, Zip파일만을 다운로드하되, 그 안에는 CSV가 사업소별로 나뉘어 들어있어야 함.

물론 Zip파일 내의 CSV파일명에는 사업소명이 들어가야 함.

ex) 20160921164446\_(2558)Nakano.csv

단, 자바 라이브러리 추가는 절대 금지.

위의 조건하에 작업 착수.

File과 PrintWriter를 써서 만들 경우

CSV파일이 따로따로 다 만들어진 후, 이걸 Zip으로 바꾸는 형태가 되는데...

데이터가 수십만건이다 보니, 사업소별로 CSV파일이 다 만들어져버리면 지우는 것도 큰일이다.

결국 inMemory로 만들어야만 하고,

그러려면 가장 간단한 방법은 openCSV를 쓰는 것인데 jar추가는 금지인지라...

여하튼 결국 이렇게 해결했다.

```
@RestController
@RequestMapping("/api/file")
public class FileController extends BaseController {

@Autowired
NumberManagerService numberManagerService;

@Autowired
ApplicationSettings applicationSettings;

@Autowired
AccessLogService accessLogService;

@RequestMapping(value = {"/downloadZipFile"}, method = RequestMethod.POST)
@ResponseBody
public void downloadZipFile(
@RequestBody List<Map<String, String>> param,
BindingResult result,
HttpServletResponse res
) throws Exception {

// CSV 헤더 작성
String[] header = {
"삭제지정",
"등록상황",
"가입번호",
"추가번호",
"지부",
"사업소코드",
"회원증기호",
"회원증번호",
"관계코드",
"관계",
"이름",
"영어명",
"성별",
"생년월일",
"개별번호",
"갱신시메모"
};

// CSV를 사업소별로 나누어 넣는 폴더 역할
List<List<String[]>> csvFiles = new ArrayList<List<String[]>>();

// 사업소별 CSV
List<String[]> csvFile = new ArrayList<String[]>();
Map<String, String> officeInfo = new HashMap<String, String>();

String oldOfficeCode = "";
int index = 0;

// 받아온 데이터를 리스트로 가공
for (Map<String, String> item : param) {
String newOfficeCode = item.get("office_code");

// 사업소 번호가 다를 경우
if (!(newOfficeCode.equals(oldOfficeCode))) {

// CSVFile의 사이즈가 1이상일 경우, CSVFiles에 넣고 새로운 CSVFile 생성
if (csvFile.size()>0) {
csvFiles.add(csvFile);
csvFile = new ArrayList<String[]>();
}
}
if (csvFile.size()==0) {
officeInfo.put(item.get("office_code"), item.get("office_name"));
csvFile.add(header);
}

String[] dataLine = {
"",
item.get("registration"),
item.get("join_no"),
item.get("additional_no"),
item.get("union_branch_code"),
item.get("office_code"),
item.get("membership_card_code"),
item.get("membership_card_no"),
item.get("relationship_code"),
item.get("relationship_name"),
item.get("name"),
item.get("eng_name"),
item.get("gender"),
item.get("birth_date"),
"",
""
};
csvFile.add(dataLine);
oldOfficeCode = newOfficeCode;
index++;

if (index==param.size()) {
csvFiles.add(csvFile);
}
};

// 파일명 지정
SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
String strdt = sdf.format(new Date());
String csvfileName = strdt+ "_(officeCode)officeName.csv";
String zipFileName = strdt+"_member.zip";

// 메모리상에서 CSV파일의 ZIP파일화
File zipfile = new File(zipFileName);
ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipfile));
ByteArrayOutputStream baos = null;
OutputStreamWriter osw = null;

// CSV파일 개별 처리
for (List<String[]> csvFileBuff : csvFiles) {

// CSV파일명 개별 지정 (사업소코드와 사업소명)
String fileNameOnCode = csvfileName.replace("officeCode", csvFileBuff.get(1)[5]);
String fileNameOnName = fileNameOnCode.replace("officeName", officeInfo.get(csvFileBuff.get(1)[5]));

// Stream 재선언
baos = new ByteArrayOutputStream();
osw = new OutputStreamWriter(baos, "euc-kr");

// CSV파일 내 각 행 처리
for (String[] entries : csvFileBuff) {
String oneLine = "";
for (int i = 0; i < entries.length; i++) {
if (i != 0) { oneLine = oneLine + ','; }
oneLine = oneLine + entries[i];
}
oneLine = oneLine + "\n";
osw.write(oneLine);
}
// CSVFile별로 OutputStreamWriter Close
osw.close();

ZipEntry objZe = new ZipEntry(fileNameOnName);
objZe.setMethod(ZipOutputStream.DEFLATED);
zos.putNextEntry(objZe);
byte[] aryByt = baos.toByteArray();
zos.write(aryByt, 0, aryByt.length);
}
zos.closeEntry();

zos.close();
baos.close();

res.setHeader("Content-Type", "application/octet-stream");
res.setHeader("Content-Disposition","attachment;filename=\"" + zipfile.getName() +"\"");
res.setHeader("Content-Transfer-Encoding", "binary");
if ((int) zipfile.length() > 0) {
res.setHeader("Content-Length", "" + (int) zipfile.length());
}

FileInputStream inStream = new FileInputStream(zipfile);
OutputStream outStream = res.getOutputStream();

byte[] buffer = new byte[4096];
int bytesRead = -1;

while ((bytesRead = inStream.read(buffer)) != -1) {
outStream.write(buffer, 0, bytesRead);
}
inStream.close();
outStream.close();
}
}
Colored by Color Scripter
```
