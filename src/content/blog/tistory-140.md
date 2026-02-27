---
title: "react-router Link Tag에서의 disabled 적용"
date: 2017-10-20
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/140"
---

예전 기가드롭다운을 만들 때, 딱히 링크 비활성 같은건 넣지 않았는데...

지금 이쪽 업무 담당하는 선배가 필요하다길래 대충 건드려 봤다.

벌써 반년도 더 전에 손 뗀 프로젝트라...

화면 띄우는 데 30분, 비활성화 구현하는데 5분 걸렸다.

맨날 설계한다고 엑셀만 붙잡고 있다가 간만에 아톰 열어보니 재미있었다.

**Menu.js**

```
...
{
name: '各種コンポーネント',
link: '/sample2',
icon: 'delete',
activate: false,
},
{
name: 'Approach(Tab ver)',
link: '/approachTab',
icon: 'search',
activate: true,
},
...
```

**GigaDropdown.js**

```
if (!isActivate) {
return (
<Link key={uuid()} className={nmClass} to={mini.link} onClick={(e) => e.preventDefault()}>
<i className={iconClass} aria-hidden="true" />&nbsp;
{mini.name}
</Link>
);
}
Colored by Color Scripter
```

react-router의 Link태그는 disabled 같은거 안 먹히니까,

그냥 Activate플래그 하나 만들어서 넣고, 분기에 걸리면 헛발질하는 onClick event만 넣어주면 된다.

그럼 to 대신 onClick으로 가서, 링크고 나발이고 아무 일도 안 일어나니까.

대충 이런 식으로 한다는 거만 다음주에 선배한테 말해주면 되겠지.

이후 필요한 것은 disabled 되었음을 시각적으로 보여줄 css 수정 정도 뿐이다.

플래그도 좀더 이쁘게 넣으면 좋을 것 같고.

여하튼 나머지는 담당자가 알아서 하시길 하고 넘겨줘야겠다.
