---
title: "ISO to local datetime"
date: 2023-09-13
tags: ["Tech", "JavaScript", "javascript", "ISO", "local"]
tistory_url: "https://idenrai.tistory.com/276"
---

`2023-09-11T13:34:51.892305+00:00` 위와 같은 형식의 ISO time 을 Local timezone과 Format을 지정하여 출력하고 싶다. 방법은 두가지. 여기선 일본 시간, `YYYY/MM/DD HH:mm:ss`로 출력해 보자.

## dayjs 를 사용하는 방법

```
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const isoToLocalDatetime = (timestamp: string): string => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const tz = 'Asia/Tokyo';
  const format = 'YYYY/MM/DD HH:mm:ss';
  return dayjs(timestamp).utc().local().tz(tz).format(format);
};

export { isoToLocalDatetime };
```

## 라이브러리를 사용하지 않는 방법

```
const isoToLocalDatetime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const japanDateString = date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return japanDateString;
};

export { isoToLocalDatetime };
```
