---
title: "AWS Glue Job을 종료시키고 싶을 때"
date: 2022-10-26
tags: ["Tech", "AWS for Data Engineering", "Stop", "종료", "Glue"]
tistory_url: "https://idenrai.tistory.com/268"
---

일단 Glue Job의 상식.

Bookmark를 켜둔 상태로 같은 데이터에 대고 Job을 2번 실행할 시, 두번째 실행은 데이터를 0건 취득한다.

근데 데이터가 없다고 따로 종료시켜주거나 하는 게 없고, 그냥 데이터가 없는 상태로 들이박아버리더라.

데이터가 없는 상태에서 데이터 변환을 하려니 당연히 아래와 같은 에러가 터진다.


그러니 데이터가 없으면 종료시켜주는 처리를 넣고 싶었다.

그런데 이게 또 뭐 종료용 명령 같은건 없고, 그냥 파이썬의 exit() 를 써야 하는데...

`sys.exit(0)`을 쓰면 아래와 같이 에러로 처리된다.


`os._exit(0)`을 써야 Succeeded가 되더라.


이런 식으로 사용하면 된다.

```
import os

if df.count() == 0:
    job.commit()
    os._exit(0)
```

처음엔 `os._exit()`로도 된다길래 몇번 시험해봤는데, status를 넣으라고 뜨더라.

`TypeError: _exit() missing required argument 'status' (pos 1)`

보니까 Glue 3.0부턴 status가 필요하게 되었다나.

비슷한 고민을 한 사람이 있어서 링크를 적어둔다.

[End/exit a glue job programmatically](https://stackoverflow.com/questions/69281483/end-exit-a-glue-job-programmatically/72528222#72528222)
