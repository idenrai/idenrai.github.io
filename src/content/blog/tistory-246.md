---
title: "RDS PostgreSQL 접속하기"
date: 2021-06-25
tags: ["Tech", "JavaScript", "javascript", "PostgreSQL", "DB접속"]
tistory_url: "https://idenrai.tistory.com/246"
---

뭐 일단 간단하게 자바스크립트로 적어보면 아래와 같은 느낌.

```
import pg from 'pg';

async function SearchData() {
  const client = new pg.Client({
    user: 'postgres', // 유저명
    password: 'postgres', // PW
    host: 'aaaabbbbcccc123123.ap-northeast-1.rds.amazonaws.com', // RDS 엔드포인트
    port: 5432,
    database: 'postgres'
  });

  await client.connect();
  const result = await client.query('select * from dbname.tablename');
  console.log(result.rows);
  client.end();
}

SearchData();
```

실시

```
node ./src/SearchDataPg.js
```

이걸 클라이언트만 분리해서 쓰려면 아래와 같은 느낌

```
import { Client } from 'pg';

const logger = LogUtils.getLogger();

export default async function () {
  const dbClient = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'aaaabbbbcccc123123.ap-northeast-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres'
  });
  await dbClient.connect();
  return dbClient;
}
```

사용시엔 이렇게 쓰면 된다.

```
import dbClient from '../common/PGClient'
...
const client = await dbClient();  // Client취득
```
