---
title: "사이드바를 통한 패널 이동 구현 (jQuery 사용)"
date: 2017-03-03
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/119"
---

그동안 react.js와 jQuery를 같이 쓰지 않는다는 룰이 있어서

[You don't need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.ko-KR.md)를 참고해 가며 꾸역꾸역 javascript로 코딩을 해 왔는데...

드디어 conponentDidMount() 이후에 한해 jQuery를 사용해도 된다는 허가가 떨어졌다.

하여, 몇몇 코드에 대대적인 공사가 들어갔고...

나 또한 이전의 leftNavigation를 jQuery로 갈아치우게 되었다.

디자인 수정도 겸해서, 거의 새로 만들다시피 하는 꼴이 되었는데...

하는 김에 MaterialUI의 drawer를 빼버리고, 그냥 div로 다 해결해 버렸다.

코드는 다음과 같다.

일단 componentDidMount() 이후, Navigation의 item을 만들기로 한다.

```
constructor(props, context) {
super(props, context);
this.state = {
menuItems: undefined,
};
}
componentDidMount() {
this.makeMenuItems();
}
```

makeMenuItems에서는 이전과 동일하게 화면상의 panel을 긁어온다.

이후 각 패널을 for로 돌려서 menu div를 만들고, onClick function을 부여한다.

```
makeMenuItems = () => {
const panelList = $('div.accordionwrapper');
if (panelList.length === 0) return;
const menuItems = [];
[].forEach.call(panelList, (panel) => {
const item = this.createItem(panel);
menuItems.push(item);
});
this.setState({ menuItems });
}
createItem = (panel) => {
const styles = this.getStyles(this.props, this.context);
const panelTitle = panel.getElementsByClassName('paneltitle')[0];
return (
<MenuItem
style={styles.item}
onClick={() => this.setFocus(panel)}
key={uuid()}
>
{panelTitle.textContent}
</MenuItem>
);
}
Colored by Color Scripter
```

클릭 이벤트에서는, 받아온 패널을 조작하고, 스크롤 이동을 한다.

이전 코드에서의 길고 긴 삽질이, animate() 한줄로 해결되었다.

이 때, 마우스 호버 반복으로 애니메이션이 축적되는 일이 없도록, stop()을 거는 것을 잊지 말자.

```
setFocus = (panel) => {
event.preventDefault();
// Panelを開く
const panelarrow = $(panel).find('i.fa')[0];
const paneldata = $(panel).find('li.paneldata')[0];
$(panelarrow).removeClass('fa-angle-double-down');
$(panelarrow).addClass('fa-angle-double-up');
$(paneldata).slideDown();

// Scroll移動
const panelPosition = this.getOffset(panel);
$('html, body').animate({ scrollTop: panelPosition.top }, 1000, 'swing');
}
getOffset = (element) => {
const box = element.getBoundingClientRect();
return {
top: (box.top + window.pageYOffset) - document.documentElement.clientTop - 40,
left: (box.left + window.pageXOffset) - document.documentElement.clientLeft
};
}
Colored by Color Scripter
```

이후 마우스 호버시 네비게이션을 넣었다 뺐다 할 수 있도록 준비해준다.

버튼은 냅두고 네비게이션 본체만 숨겼다 꺼내도록 해야 하며,

네비게이션의 길이가 패널 타이틀에 따라 변하는 관계로

네비게이션의 outerWidth를 구해서 marginLeft를 시켜야 한다.

```
openNavi = (event) => {
event.preventDefault();
const target = event.currentTarget;
$(target).stop().animate({ marginLeft: '0px' }, 300);
$(this.navArrow).removeClass('fa-angle-double-right');
$(this.navArrow).addClass('fa-angle-double-left');
}
closeNavi = (event) => {
event.preventDefault();
const target = event.currentTarget;
const slideWidth = $(target).outerWidth();
$(target).stop().animate({ marginLeft: `-${slideWidth}px` }, 300);
$(this.navArrow).addClass('fa-angle-double-right');
$(this.navArrow).removeClass('fa-angle-double-left');
}
Colored by Color Scripter
```

render에 위의 기능을 붙여주기만 하면 끝.

FontAwesome의 클래스를 바꿔주어야 하므로, ref를 걸어주었다.

```
render() {
const styles = this.getStyles(this.props, this.context);
return (
<div
className="leftNavi"
style={styles.root}
onMouseEnter={this.openNavi}
onMouseLeave={this.closeNavi}
>
{this.state.menuItems}
<div style={styles.itemBtn}>
<i
className="fa fa-angle-double-right fa-lg" aria-hidden="true"
style={{ paddingTop: '20px' }}
ref={(c) => { this.navArrow = c; }}
/>
</div>
</div>
);
}
Colored by Color Scripter
```

이 상태에선 네비게이션이 나와 있는 상태로 화면이 떠 버리기에...

render이후 componentDidUpdate()에서 한번 네비게이션을 숨겨주도록 한다.

```
componentDidUpdate() {
this.initLeftNavi();
}
initLeftNavi = () => {
const leftNavi = $('div.leftNavi');
const slideWidth = $(leftNavi).outerWidth();
$(leftNavi).animate({ marginLeft: `-${slideWidth}px` }, 0);
}
Colored by Color Scripter
```

코드 내에서 getStyle()은 커스텀 테마에 적어 둔 CSS를 받아오는 부분인데...

딱히 CSS까지 공개할 필요는 없을 것 같으니 자세히는 적지 않겠다.

다만, 네비게이션인 이상 스크롤 이동시에도 따라와야 하므로...

zIndex와 position fixed는 꼭 넣어주도록 하자.

나머지는 자유롭게...

```
...

navigation: {
root: {
zIndex: 1099,
position: 'fixed',
top: '25%',
...
},
item: {
position: 'relative',
...
},
itemBtn: {
position: 'absolute',
...
},
},

...
```
