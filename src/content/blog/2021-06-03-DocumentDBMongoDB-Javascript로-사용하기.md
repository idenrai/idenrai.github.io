---
title: "DocumentDB(MongoDB) Javascript로 사용하기"
date: 2021-06-03
tags: ["Tech", "JavaScript", "javascript", "mongodb", "node.js", "documentdb"]
tistory_url: "https://idenrai.tistory.com/243"
---

테스트데이터를 만드는데, Bash가 MongoDB shell버전이랑 server버전이랑 맞질 않아서 안돌아가더라. 뭐 고칠라면 고치는데, 어차피 데이터 구조 바뀔때마다 반복작업 해야하는거, 그냥 JS로 돌려야겠다 싶었다.

그래서 대충 만들어본게 이거.

**/testData/testData.js**

```
const testData = [
  {
    xxx_cd: '01',
    xxx_name: 'xxx01',
    xxx_type: '1',
    xxx_start_date: '2021-01-01',
    xxx_end_date: '2021-12-01',
    xxx_operation: [
      {
        date: '2021-06-01',
        operaton_type: '1'
      }
    ],
    category: {
      id: 'categoryA',
      label: '카테고리A'
    }
  },
  {
    xxx_cd: '02',
    xxx_name: 'xxx02',
    xxx_type: '2',
    xxx_start_date: '2021-01-01',
    xxx_end_date: '2021-12-01',
    xxx_operation: [
      {
        date: '2021-05-01',
        operaton_type: '1'
      },
      {
        date: '2021-06-02',
        operaton_type: '2'
      },
      {
        date: '2021-06-03',
        operaton_type: '3'
      }
    ],
    category: {
      id: 'categoryB',
      label: '카테고리B'
    },
  },
  {
    xxx_cd: '03',
    xxx_name: 'xxx03',
    xxx_type: '3',
    xxx_start_date: '2021-01-01',
    xxx_end_date: '2021-12-01',
    xxx_operation: [
      {
        date: '2021-07-01',
        operaton_type: '1'
      }
    ],
    category: {
      id: 'categoryC',
      label: '카테고리C'
    },
  }
];

export default testData;
```

**/src/CreateCollection.js**

```
import mongodb from 'mongodb';
import fs from 'fs';
import path from 'path';

// 콜렉션 작성 및 인덱스 설정
async function CreateCollection() {
  const { MongoClient } = mongodb;
  const fileDir = './xxx/keys/xxx.pem';
  const ca = [fs.readFileSync(path.resolve(fileDir))];
  
  // DB 신규 작성시에만 아래 사용
  // const newDBName = 'test-db';
  const newDBName = '';
  
  const DB_USER_ID = 'yyyy';
  const DB_PASSWORD = 'zzzz';
  const DB_URL = `aaaaa-bbbbb-cccc.ap-northeast-1.docdb.amazonaws.com:12345/${newDBName}?ssl=true&ssl_ca_certs=xxx.pem&retryWrites=false`;
  const url = `mongodb://${DB_USER_ID}:${DB_PASSWORD}@${DB_URL}`;
  const options = {
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  // ============================================================
  // 작성할 콜렉션명
  const collectionName = 'test';

  // 콜렉션에 부여할 인덱스
  const collectionIndex = { xxx_cd: 1, xxx_type:1 };

  // ============================================================
  // DB접속
  const client = await MongoClient.connect(url, options);

  // DB설정
  const db = client.db('test-db');

  // ============================================================
  // 콜렉션 작성
  const colCreateRes = await db.createCollection(collectionName);
  console.log(`Collection ${collectionName} created: ${colCreateRes}`);

  // ============================================================
  // 콜렉션에 인덱스 설정
  const col = db.collection(collectionName);
  const colIndexRes = await col.createIndex(collectionIndex);
  console.log(`${collectionName} Index created: ${colIndexRes}`);

  // ============================================================
  // DB내의 콜렉션 전체 확인
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections);

  // ============================================================
  // DB 삭제
  // const dbDropRes = await db.dropDatabase();
  // console.log('Database drop result:', dbDropRes);
  // 콜렉션 삭제
  // const colDropRes = await col.drop();
  // console.log('Collection drop result:', colDropRes);
  
  // ============================================================

  client.close();
}

CreateCollection();
```

**/src/InsertData.js**

```
import mongodb from 'mongodb';
import fs from 'fs';
import path from 'path';

// 테스트 데이터
import testData from '../testData/testData.js';

// 콜렉션에 데이터 입력
async function InsertData() {
  const { MongoClient } = mongodb;

  // DB정보는 위와 동일하므로 생략

  // ============================================================
  // 콜렉션명
  const collectionName = 'test';

  // ============================================================
  // DB접속
  const client = await MongoClient.connect(url, options);

  // DB설정
  const db = client.db('test-db');

  // ============================================================
  // 콜렉션에 데이터 입력 (배열이므로 insertMany를 사용)
  const col = db.collection(collectionName);
  const colIndexRes = await col.insertMany(testData);
  console.log(`${collectionName} Index created: ${colIndexRes}`);

  client.close();
}

InsertData();
```

**/src/SearchData.js**

```
import mongodb from 'mongodb';
import fs from 'fs';
import path from 'path';

// 검색
async function SearchData() {
  const { MongoClient } = mongodb;

  // DB정보는 위와 동일하므로 생략

  // ============================================================
  // 콜렉션명
  const collectionName = 'test';

  // DB접속
  const client = await MongoClient.connect(url, options);

  // DB설정
  const db = client.db('test-db');

  // 콜렉션 설정
  const col = db.collection(collectionName);

  // ============================================================
  // 콜렉션 전 데이터 검색 findAll()
  const col = db.collection(collectionName);
  const colData0 = await col.find({}).toArray();
  console.log(`${collectionName} Collection Data: ${colData0}`);

  // 콜렉션 특정 데이터 검색 findOne()
  const colData1 = await col.findOne({ xxx_cd: '01' });
  console.log(`${collectionName} xxx_cd:'01' Data: ${colData1}`);
  console.log('findOne()');
  console.log('test', test);
  
  // 콜렉션에서 특정 데이터만 지정해서 추출
  // _id:0 설정을 통해 _id를 취득하지 않을 수 있음 
  const projection = { _id: 0, xxx_cd: 1, xxx_name: 1 };
  const colData2 = await col.find({}).project(projection).toArray();
  console.log(`${collectionName} xxx_cd Data: ${JSON.stringify(colData2)}`);

  // 응용편1
  const query1 = { xxx_cd: '01', xxx_type: '1' };
  const colData3 = await col.find(query1).project(projection).toArray();
  console.log(`${collectionName} QueryData: ${JSON.stringify(colData3)}`);

  // 응용편2
  // 하위 멤버의 IN Query의 경우
  const query2 = { xxx_start_date: '2021-01-01', "category.id": { $in: ['categoryA', 'categoryC'] } };
  const colData4 = await col.find(query2).project(projection).toArray();
  console.log(`${collectionName} QueryData: ${JSON.stringify(colData4)}`);

  // 응용편3
  // 하위 멤버가 배열 & IN Query의 경우
  const query3 = { xxx_start_date: '2021-01-01', xxx_operation: { $elemMatch: { operaton_type: { $in: ['2', '3'] } } } };
  const colData5 = await col.find(query3).project(projection).toArray();
  console.log(`${collectionName} QueryData: ${JSON.stringify(colData5)}`);
  client.close();
}

SearchData();
```

뭐 대충 이런 식으로 만들어 두면, 차후 콘솔 만지작거릴 귀찮음을 덜 수 있다.

당연한 거지만 실행은 아래와 같이 하면 된다.

```
$ node ./src/CreateCollection.js
$ node ./src/InsertData.js
$ node ./src/SearchData.js
```

다른것도 더 해보고 싶다면 아래를 참조.

[MongoDB Node Driver](https://docs.mongodb.com/drivers/node/)

[

MongoDB Node Driver — Node.js

docs.mongodb.com

](https://docs.mongodb.com/drivers/node/)
