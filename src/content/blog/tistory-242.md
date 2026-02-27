---
title: "AWS Secrets Manager로부터 DB정보 취득"
date: 2021-05-28
tags: ["Tech", "JavaScript", "typescript", "AWS", "documentdb"]
tistory_url: "https://idenrai.tistory.com/242"
---

AWS DocumentDB의 정보 보관을 위해 AWS Secrets Manager를 사용하게 되었다. SecretsManager의 정보 자체는 Lambda의 환경변수로 아래와 같이 설정하면 된다.


현재 Lambda를 Serverless를 써서 올리기로 하고 그냥 다 코드 자체는 로컬에서 작성하고 있기 때문에, 사실 테스트를 하려면 그냥 env같은거 만들어서 정보 다 넣어두고 쓰면 되지만서도, Secrets Manager를 한번은 테스트 하고 싶으니까 Credential까지 넣어서 한번 적어 봤다.

```
import * as aws from 'aws-sdk';
import { DatabaseInfoModel } from '../models/DatabaseInfoModel';

export default async function (): Promise {
  const secretId = {
    SecretId: process.env.SECRET_ID // Lambda에서 사용시엔 환경변수 등록
  }
  const info = {
    region: process.env.AWS_REGION, // Lambda에선 기본 취득 가능
    credentials: {
      accessKeyId: process.env.ACCESS_KEY, // Lambda에서 구동시엔 필요없음
      secretAccessKey: process.env.SECRET_KEY // Lambda에서 구동시엔 필요없음
    }
  }
  return new Promise((resolve, reject) => {
    new aws.SecretsManager(info).getSecretValue(secretId, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const res = JSON.parse(data.SecretString);
        const dbInfo = new DatabaseInfoModel();
        dbInfo.username = res.username;
        dbInfo.password = res.password;
        dbInfo.host = res.host;
        dbInfo.port = res.port;
        dbInfo.ssl = res.ssl;
        resolve(dbInfo);
      }
    });
  });
}
```

취득할 수 있는 Secret의 형태는 아래와 같다.

```
{
  username: 'xxx', // DB UserId
  password: 'xxxxxxxx', // DB PW
  engine: 'mongo',
  host: 'xxxx-xxxxx.com', // DB URL
  port: 12345,
  ssl: true,
  dbClusterIdentifier: 'xxxxx'
}
```

타입스크립트를 쓴다면 클래스도 만들어 줄 것.

```
import * as v from "class-validator";

export class DatabaseInfoModel {
  constructor() { }

  // DocumentDB접속시에 필요한 정보만 일단 NotEmpty걸어두기
  @v.IsNotEmpty()
  username: string
  @v.IsNotEmpty()
  password: string
  @v.IsNotEmpty()
  host: string
  @v.IsNotEmpty()
  port: number
  @v.IsNotEmpty()
  ssl: boolean

  engine: string
  dbClusterIdentifier: string
}
```

사용시엔 아래와 같이 사용하면 된다.

```
...
const databaseInfo: DatabaseInfoModel = await getDatabaseInfo().catch(error => {
  throw error;
});

// DocumentDB URL
const url = `mongodb://${databaseInfo.username}:${databaseInfo.password}@${databaseInfo.host}:${databaseInfo.port}/?ssl=${databaseInfo.ssl}`;
```

DocumentDB 접속 관련은 아래를 참조.

[https://idenrai.tistory.com/243](https://idenrai.tistory.com/243)
