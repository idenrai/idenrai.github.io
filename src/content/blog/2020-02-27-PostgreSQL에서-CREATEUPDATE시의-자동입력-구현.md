---
title: "PostgreSQL에서 CREATE/UPDATE시의 자동입력 구현"
date: 2020-02-27
tags: ["Tech", "DB・SQL", "PostgreSQL", "OnCreate", "onUpdate", "Update시"]
tistory_url: "https://idenrai.tistory.com/223"
---

이번 플젝의 테스트를 위해 PostgreSQL을 이용하게 되었다. 모든 테이블에 **작성일, 작성자, 갱신일, 갱신자** 정보를 넣기로 정해서... 그럴거면 그냥 CREATE/UPDATE시에 자동으로 입력되도록 할까 하고 조금 알아보았다. MySQL에선 그냥 CREATE시에 OnCreate, OnUpdate를 넣으면 끝날 일인데... PostgreSQL에선 그런게 없고, Function을 만들고 Trigger를 테이블과 연결시켜야 한댄다. 뭔가 귀찮아... 그래도 별 수 없으니 여하튼 만들어 보았다. 만드는 순서는 Table→Function→Trigger순이다.

### 1\. Table 작성

작성일, 작성자 항목은 초기치를 지정해 주면 이후 변동할 일은 없다. 고로, CREATE시에 DEFAULT로 초기치를 설정해 주는 것이 중요. 하는 김에 id도 INT대신에 SERIAL을 넣어, 자동 갱신되도록 하자.

```
CREATE TABLE keyword (
    id SERIAL NOT NULL PRIMARY KEY,
    keyword VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_user VARCHAR NOT NULL DEFAULT current_user,
    updated_at TIMESTAMP,
    updated_user VARCHAR
);
```

### 2\. Function 작성

작성일과 작성자 항목을 각각 자동으로 설정하는 기능이다. 테이블이 여러개여도 Column명이 동일하다면,처리를 담당할 Function은 하나만 만들면 된다.

```
CREATE OR REPLACE FUNCTION update_time_and_user()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.updated_user = current_user;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 3\. Trigger 작성

Trigger는 각 테이블에 Function을 연결시키는 역할을 한다. 이건 무조건 테이블 수만큼 만들어야 한다.

```
CREATE TRIGGER update_trigger
BEFORE UPDATE ON keyword
FOR EACH ROW
EXECUTE PROCEDURE update_time_and_user();
```

### 4\. Test

잘 돌아가는지 대충 테스트를 해 보자. 일단 대충 keyword만 입력하여 INSERT.

```
INSERT INTO keyword (keyword)
VALUES (
   'test'
);
```

이후 UPDATE로 keyword를 바꿔준다.

```
UPDATE keyword
SET keyword = 'onakasuita'
WHERE id = 1;
```

결과는 아래와 같다.

```
1    "onakasuita"    "2020-02-26 11:45:01.971002"    "postgres"    "2020-02-26 11:46:35.590533"    "postgres"
```

---

보기엔 귀찮아 보이는데, 생각보다 그냥 되게 평범하게 잘 작동하드라. 추가로 Function과 Trigger만 만들어 붙이면 되니 테이블에 손 댈 필요도 없고. 나름 편하다면 편한 듯.
