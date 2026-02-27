---
title: "parallel execute sample"
date: 2023-12-06
tags: ["Tech", "Python", "Parallel", "Jupyter"]
tistory_url: "https://idenrai.tistory.com/282"
---

## concurrent.futures

[https://docs.python.org/3/library/concurrent.futures.html](https://docs.python.org/3/library/concurrent.futures.html)

### ThreadPoolExecutor

지정한 함수를 병렬기동

```
from concurrent.futures import ThreadPoolExecutor

def parallel_execute(function, args_list, max_workers=20):
    futures = []
    with ThreadPoolExecutor(
        max_workers=max_workers, thread_name_prefix="thread"
    ) as pool:
        for args in args_list:
            future = pool.submit(function, *args)
            futures.append(future)

    return [fut.result() for fut in futures]
```

사용법

`translate_story` 함수를 병렬기동하고 싶은 경우, 함수의 파라메터의 배열을 만들어서 넘기면 됨

```
def translate_story(title, df):
    df['story'] = df['name'].apply(lambda x: translate(x))
    return df

grouped_by_title = df.groupby('title')
args = list(grouped_by_title)

result = parallel_execute(translate_story, args)
```
