---
title: "현재 page의 path를 읽어, 해당 링크에 하이라이트 부여하기"
date: 2017-01-25
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/112"
---

여전히 사내 프레임워크 작성을 담당하고 있는데...

예전에 만들어 두었던 GigaDropdown의 수정 요구가 들어왔다.

드롭다운 내에서 현재 페이지와 동일한 링크에 하이라이트 표시를 해달라는 것.

해야 하는 일은 명확하다.

1\. 드롭다운을 기동시 현재 페이지를 읽을 것

(페이지 전체가 아니라 해당 페이지의 path만을 추출할 것)

2\. 드롭다운이 render되며 링크 작성 시, 해당 링크에 부여된 path와 1을 비교할 것

3\. path가 동일하다면, 해당 링크에 하이라이트 효과를 부여할 것

일단 path추출은 이걸로 가능하다.

document.location.pathname;

이걸 초기 로드 시와 드롭다운 기동 시 state로 지정해 두도록 한다.

초기 로드 시

```
...

constructor(props, context) {
super(props, context);
this.state = {
address: document.location.pathname,
};
}

...
Colored by Color Scripter
```

드롭다운 기동 시

```
...

toggleNav = (event) => {
event.preventDefault();
this.setState({
address: document.location.pathname,
});
...
}

...
Colored by Color Scripter
```

이후 링크를 작성하는 과정에서 prop으로 받아온 데이터를 map으로 돌려 각 link의 path를 구하고,

이를 matchAddress펑션에 보내서 state의 address와 비교,

받아온 리턴치를 해당 링크의 기존 className과 합쳐서 className에 집어넣는다.

```
...

link = (data) => {
if (!data || data.length === 0) return null;
this.miniList = data.map((mini) => {
const highlightClass = this.matchAddress(mini.link);
const nmClass = `giga-dropdown-item-mini${highlightClass}`;
return (
<Link key={uuid()} className={nmClass} to={mini.link}>{mini.name}</Link>
);
});
return (
<div className="mini-items switchBtn">{this.miniList}</div>
);
}

...
Colored by Color Scripter
```

matchAddress

\- 일치할 경우 문자열 ' highlight'를 리턴

\- 일치하지 않을 경우 빈 문자열 ''를 리턴

```
...

matchAddress = (link) => {
let highlightClass = '';
const address = this.state.address;
if (link === address) {
highlightClass = ' highlight';
}
return highlightClass;
}

...
Colored by Color Scripter
```

마지막으로, 연결된 CSS에 해당 class의 CSS를 설정하는 것으로 끝.

```
.giga-dropdown-item-mini.highlight {
color: #e53935 !important;
font-weight: 900 !important;
}
Colored by Color Scripter
```
