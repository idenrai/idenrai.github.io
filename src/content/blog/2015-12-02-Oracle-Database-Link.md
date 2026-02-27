---
title: "Oracle Database Link"
date: 2015-12-02
tags: ["Tech", "DB・SQL"]
tistory_url: "https://idenrai.tistory.com/42"
---

**1\. DB Link?**

로컬 DB에서 Database Link 생성을 통해, 원격지 DB의 데이터를 가져올 수 있음.

\# DB링크의 설정을 위해서는 DBA 권한이 필요하다.

**2\. DB LINK 설정**

**1) CREATE DATABASE LINK**

CREATE DATABASE LINK

**DB LINK명**

CONNECT TO

**유저명**

IDENTIFIED BY

**비밀번호**

USING

'

(DESCRIPTION =

(ADDRESS\_LIST =

(ADDRESS =

(PROTOCOL = TCP)

(HOST = **호스트명**)

(PORT = 1521)

)

)

(CONNECT\_DATA =

(SERVER = DEDICATED)

(SERVICE\_NAME = **서비스명**)

)

)

'

;

Open Example

CREATE DATABASE LINK

**DBLK\_ENRAI**

CONNECT TO

**ENRAI**

IDENTIFIED BY

**password**

USING

'

(DESCRIPTION =

(ADDRESS\_LIST =

(ADDRESS =

(PROTOCOL = TCP)

(HOST = **123.456.7.89**)

(PORT = 1521)

)

)

(CONNECT\_DATA =

(SERVER = DEDICATED)

(SERVICE\_NAME = **NETRCVSERV**)

)

)

'

;

\# 로컬 DB의 tnsnames.ora에 원격지 DB의 접속 정보를 추가하였을 경우에는, USING 뒤에 해당 DB의 서비스 명을 적으면 된다.

Open Example

**1\. tmsnames.ora**

ENRAI\_DB =

(DESCRIPTION =

(ADDRESS\_LIST =

(ADDRESS =

(PROTOCOL = TCP)

(HOST = **123.456.7.89**)

(PORT = 1521)

)

)

(CONNECT\_DATA =

(SERVER = DEDICATED)

(SERVICE\_NAME = **NETRCVSERV**)

)

)

**2\. CREATE DB LINK**

CREATE DATABASE LINK

**DBLK\_ENRAI**

CONNECT TO

**ENRAI**

IDENTIFIED BY

**password**

USING

'**ENRAI\_DB**'

**2) DB LINK 사용**

SELECT \* FROM **원격지DB\_TABLE명**@**DB\_LINK명**;

ex) SELECT \* FROM **TBL\_TSTORTY**@**DBLK\_ENRAI**;

위와 같이, DB LINK를 통해 원격지DB의 테이블을 이용할 경우에는

해당 테이블 명 뒤에 @DB LINK명을 적도록 한다.

**3) DB LINK 삭제**

DROP DATABASE LINK **DB\_LINK명**;

ex) DROP DATABASE LINK DBLK\_ENRAI;
