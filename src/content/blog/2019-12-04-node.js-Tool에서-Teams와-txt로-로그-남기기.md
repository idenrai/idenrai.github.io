---
title: "node.js Tool에서 Teams와 txt로 로그 남기기"
date: 2019-12-04
tags: ["Tech", "JavaScript", "javascript", "로그", "텍스트", "replace", "Teams", "WriteFile", "node.js", "axios"]
tistory_url: "https://idenrai.tistory.com/197"
---

node.js로 정확도 기록용 테스트 툴을 만드는 중. 테스트의 결과를 Teams로 통지함과 동시에 텍스트파일로도 로그를 남겨야 했다. 일단 텍스트 로그를 남기고 최종적으로 Teams에 통지를 하려고 하는데, 당연한거지만 줄바뀜 문자가 다르다. 텍스트파일의 줄바뀜 문자는 「**\\n**」 Teams로 날릴 줄바뀜 문자는 「」 우선 이런 펑션을 돌려서 텍스트용 로그를 만들었다.

```
log = log.concat(addLog(result, data, true)); 
```

```
function addLog(result, data, isSuccessed){ 
  let log = ""; 
  log = log.concat("문장 : " + result.text + "\n"); 
  log = log.concat("기대치 : " + data.category + "\n"); 
  log = log.concat("출력값 : " + result.top_class + "\n"); 
  log = log.concat("결과 : " + (isSuccessed ? "성공" : "실패") + "\n\n"); 
  return log; 
}
```

이걸 일단 텍스트파일로 쓰고

```
const filename = __dirname + "/log/result_" + timestamp + ".txt"; 
fs.writeFile(filename, nlc_log, (err) => { 
  if (err) throw err; 
  console.log('Log saved!'); 
}); 
```

아래와 같은 펑션을 만들어 Teams로 포스트를 날렸다.

```
function teamsNotification(log){ 
  // 문자열 전부 치환 
  const logForTeams = log.replace(/\n/gi, '
'); 

  // Axios로 Teams에 Post 
  axios.post(teams_url, { 
    text: logForTeams 
  }) 
  .then((res) => { 
    console.log(`status : ${res.status}`) 
    // console.log(res) 
  }) 
  .catch((error) => { 
    console.error(error) 
  }); 
} 
```

```
teamsNotification(log); 
```

줄바뀜문자는 replace를 써서 치환해 줄 수 있는데, 그냥 replace만 쓰면 첫번째 걸린 글자만 바뀐다. 고로, 아래와 같이 정규식을 써야 일제 변환이 가능하다. **대상 문자열.replace(/찾을 문자열/g, '변경할 문자열')** ※　g (global) : 모든 문자열 대상

※　예문에선 i (ignore)도 썼는데, 이건 영어 대소문자 구분 안하고 다 대상으로 한다는 뜻이다. **참조**

[JavaScript String replace() Method](http://https://www.w3schools.com/jsref/jsref_replace.asp)
