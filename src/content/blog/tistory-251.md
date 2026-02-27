---
title: "Lambda의 6MB 제한 해결"
date: 2021-09-11
tags: ["Tech", "JavaScript", "javascript", "gzip", "lambda", "6mb", "pako"]
tistory_url: "https://idenrai.tistory.com/251"
---

API를 Lambda에 올려서 돌리고 있다.

데이터가 6MB를 넘으면 Network Error가 나오는데...

API에서 데이터를 압축해서 보낸 후, 화면쪽에서 압축 풀면 되지 않나?

라는 생각에, 일단 시도해 보았다.

처음엔 [이거](https://stackoverflow.com/questions/62025368/what-is-a-good-away-to-compress-aws-lambda-response-to-avoid-6mb-limit)를 참조해서 gzip이라던가 써 봤는데...

소스코드도 길어지고, 압축 푸는데 뻑나고 그러더라.

그래서 그냥 [pako](https://www.npmjs.com/package/pako)를 사용해서 해결했다.

**API (Lambda)**

```
import pako from 'pako';

// Zip
const zippedData = pako.deflate(JSON.stringify(targetData));

result.status = RESPONSE_STATUS.OK;
result.response = {
  targetData: zippedData,
}

// 리스폰스 타입은 Uint8Array로 지정
export class ResponseBodyModel {
  @v.IsNotEmpty()
  status: number
  response: {
    targetData: Uint8Array,
  }
}
```

**UI**

```
import sizeof from 'object-sizeof';
import pako from 'pako';

const onTableSearch = (option: SelectOption) => {
  // ...
  
  APIList.getTableData.get({
    searchKey: option.searchKey,
  }).then((res: TargetData) => {
    console.log("Size of zippedData(MB)", sizeof(res.targetData) / (1024 * 1024));

    const targetData = JSON.parse(pako.inflate(res.targetData, { to: 'string' }));
    console.log("Size of targetData(MB)", sizeof(targetData) / (1024 * 1024));
    setTableData(targetData);

}).catch((err) => {
    toast.error(err.message ? err.message : err);
    
  }).finally(() => {
    // ...
  });
};

// 리스폰스 타입은 Uint8Array로 설정
export type TargetData = {
  targetData: Uint8Array
};
```

결과는 대충 이런 식이다.


간당간당 6메가 안넘기고 해결.

편하긴 한데, 압축률이 그다지 좋지 않은 것 같다.
