---
title: "RDS PostgreSQL에서 유저 권한 부여하기"
date: 2020-03-03
tags: ["Tech", "DB・SQL", "User", "db", "권한", "grant", "PostgreSQL", "Role", "rds"]
tistory_url: "https://idenrai.tistory.com/224"
---

RDS에 PostgreSQL을 깔고 DB를 구축했다. DB에는 **Master**와 **Transaction**의 두가지 스키마를 만들었고, 아래와 같이 롤을 부여하기로 했다.

#### Role

**이름**

**Master**

**Transaction**

**설명**

master\_user

CRUD

\-

마스터 테이블 유지보수용 롤

readonly\_user

R

R

열람용 롤

normal\_user

R

CRUD

시스템 가동에 필요한 권한 부여 롤

super\_admin

CRUD

CRUD

전 권한 부여

#### User

**이름**

**Role**

master\_user\_01

master\_user

readonly\_user\_01

readonly\_user

normal\_user\_01

normal\_user

normal\_user\_02

normal\_user

super\_admin\_01

super\_admin

바로 본론으로 들어가, 소스는 다음과 같다.

```
-- ROLE
CREATE ROLE master_user;
CREATE ROLE readonly_user;
CREATE ROLE normal_user;
CREATE ROLE super_admin;

-- USER
CREATE USER master_user_01 WITH PASSWORD 'aaa';
CREATE USER readonly_user_01 WITH PASSWORD 'bbb';
CREATE USER normal_user_01 WITH PASSWORD 'ccc';
CREATE USER normal_user_02 WITH PASSWORD 'ddd';
CREATE USER super_admin_01 WITH PASSWORD 'eee';

-- GRANT USAGE
GRANT USAGE ON SCHEMA master TO master_user, readonly_user, normal_user;
GRANT USAGE ON SCHEMA transaction TO readonly_user, normal_user;

-- GRANT
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA master TO master_user;
GRANT SELECT ON ALL TABLES IN SCHEMA master TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA transaction TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA master TO normal_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA transaction TO normal_user;

-- GRANT SUPERUSER ROLE TO super_admin
GRANT rds_superuser TO super_admin;

-- GRANT ROLE TO USER
GRANT master_user TO master_user_01;
GRANT readonly_user TO readonly_user_01;
GRANT normal_user TO normal_user_01;
GRANT normal_user TO normal_user_02;
GRANT super_admin TO super_admin_01;
```

#### Grant Usage

Grant가 테이블의 CRUD 권한을 부여하는 것이라면, Grant Usage는 스키마에 대한 엑세스 권한을 부여한다. 테이블 권한이 있더라도, 스키마를 사용할 수 없다면 그 안의 테이블을 만질 수 없다는 것. 자세한 것은 **[What GRANT USAGE ON SCHEMA exactly do?](https://stackoverflow.com/questions/17338621/what-grant-usage-on-schema-exactly-do)**를 참조.

#### RDS for PostgreSQL의 ADMIN권한

RDS for PostgreSQL에서는 ADMIN권한을 가진 Role이 존재한다. 이름하야 「rds\_superuser」. 이것만 GRANT로 발라주면, 그 유저/롤은 바로 슈퍼유저가 된다.

#### 참조

**[PostgreSQL Grant](https://www.postgresql.org/docs/current/sql-grant.html)**
