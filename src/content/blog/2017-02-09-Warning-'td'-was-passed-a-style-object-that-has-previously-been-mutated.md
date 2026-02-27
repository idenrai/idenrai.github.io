---
title: "Warning: 'td' was passed a style object that has previously been mutated."
date: 2017-02-09
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/116"
---

자작 데이터테이블에서 column에 mouse hover를 할 경우 background의 색깔을 변경하도록 했는데,

꼭 한번씩 이런 warning이 뜨더라.


받아온 style props가 mutated당했다는 내용.

뭐 여기서 이미 눈치챈 사람도 있겠지만서도...

문제는 render를 하는 과정에서 적었던 이 코드였다.

```
return (
<td
className={className}
style={assign(styles.root, style)}
{...handlers}
{...other}
>
{content}
</td>
);
Colored by Color Scripter
```

props값이 파괴된다면 어째야 한다고?

[「props의 데이터가 파괴되는 문제」](http://idenrai.tistory.com/115) 참조

```
return (
<td
className={className}
style={assign({}, styles.root, style)}
{...handlers}
{...other}
>
{content}
</td>
);
Colored by Color Scripter
```

assign에서 맨 앞에 {}를 붙이는 것으로 해결되었다.
