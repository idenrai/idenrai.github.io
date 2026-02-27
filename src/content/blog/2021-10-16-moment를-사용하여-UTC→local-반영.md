---
title: "moment를 사용하여 UTC→local 반영"
date: 2021-10-16
tags: ["Tech", "JavaScript", "moment", "UTC", "local"]
tistory_url: "https://idenrai.tistory.com/253"
---

대충 이런 형태로 SQL작성

```
    SELECT
        id,
        memo,
        updated_by,
        to_char(updated_at, 'YYYY/MM/DD HH24MIss') AS updated_at
    FROM
        memo
    WHERE
            memo_category = 'normal'
        AND logical_delete_flag = false
    ORDER BY
        id DESC
    ;
```

UI쪽에서 moment를 사용하여, UTC를 로컬 시간으로 변경

```
import moment from 'moment';

// ...

const updatedTime = moment.utc(actionMemo.updatedAt, "YYYY/MM/DD HHmmss");
const adjustedUpdatedTime = updatedTime.local().format('YYYY/MM/DD HH:mm:ss');
```
