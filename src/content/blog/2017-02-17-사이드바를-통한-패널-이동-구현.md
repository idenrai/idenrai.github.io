---
title: "사이드바를 통한 패널 이동 구현"
date: 2017-02-17
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/118"
---

여전히 프레임워크 제작중...

지금 하는 일은 화면 내 panel의 정보를 주워서 표시하는 사이드바를 만들고,

그 사이드바 버튼 클릭 시 해당 panel로 이동 + panel이 accordion이라면 열어주는 작업이다.

이 사이드바는 따로 props를 받지 않고 독립적으로 움직이며,

그냥 패널이 있는 화면에 갖다 붙이기만 하면 알아서 지가 화면 읽어서 패널 정보를 표시한다.

뭐... 패널도 따로 정해진 부품이 이미 있기에...

```
componentDidMount() {
this.makeMenuItem();
}
makeMenuItem = () => {
const drawer = document.getElementsByClassName('naviDrawer')[0];
const styles = this.getStyles(this.props, this.context);
const panelList = document.getElementsByClassName('accordionwrapper');
if (panelList.length === 0) return;

const menuItems = [];
[].forEach.call(panelList, (panel) => {
const panelTitle = panel.getElementsByClassName('paneltitle')[0];
menuItems.push(
<MenuItem style={styles.item} onClick={() => this.setFocus(panelTitle)} key={uuid()}>
{panelTitle.textContent}
</MenuItem>
);
});
this.setState({ menuItems });
drawer.addEventListener('mouseleave', this.closeNavi);
}
Colored by Color Scripter
```

대충 이런 식으로 클래스명으로 화면 긁어오기만 하면 된다.

다만, 화면이 만들어지고 나서야 긁어올 수 있으므로,

componentDidMount에서 해당 작업을 하는 것이 포인트.

render에는 버튼을 갖다놓고, 해당 버튼에 마우스를 올리면 사이드바를 표시하도록 했다.

```
openNavi = (event) => {
event.preventDefault();
const target = event.currentTarget.parentElement;
target.style.display = 'none';
this.setState({ open: true });
}
closeNavi = (event) => {
event.preventDefault();
const target = event.currentTarget.parentElement.getElementsByClassName('naviTrigger')[0];
target.style.display = 'inline-block';
this.setState({ open: false });
}
render() {
const styles = this.getStyles(this.props, this.context);
return (
<div>
<FloatingActionButton
className="naviTrigger"
style={styles.trigger}
onMouseEnter={this.openNavi}
>
<i className="fa fa-plus fa-lg" aria-hidden="true" />
</FloatingActionButton>
<Drawer
className="naviDrawer"
open={this.state.open}
openSecondary={styles.openSecondary}
containerStyle={styles.root}
>
{this.state.menuItems}
</Drawer>
</div>
);
}
Colored by Color Scripter
```

대충 이래 놓고, 각 메뉴 아이템에 클릭 이벤트를 바르면 일단 기능적으로는 완료.

이 클릭 이벤트는 해당 패널의 좌표를 읽어서 스크롤을 굴려 해당 패널을 화면 최상단에 위치시키고,

만일 아코디언 패널이라 클릭을 통해 여닫는 기능이 있다면 열어주는 역할을 한다.

```
getOffset = (element) => {
const box = element.getBoundingClientRect();
return {
top: (box.top + window.pageYOffset) - document.documentElement.clientTop - 50,
left: (box.left + window.pageXOffset) - document.documentElement.clientLeft
};
}
setFocus = (panel) => {
event.preventDefault();
const panelPosition = this.getOffset(panel);
document.body.scrollTop = panelPosition.top;
Panel.handleOpenPanel(panel.nextElementSibling.id);
}
Colored by Color Scripter
```

getOffset으로 해당 패널의 좌표를 따, scrollTop으로 화면 최상단으로 밀어올린다.

getOffset에서 top에 -50을 한 이유는, 상단에 상태바가 있기 때문이다.

이후엔 Panel에 state로 정의해둔 handleOpenPanel을 불러와 패널을 열어주면 끝.

그런데 여기서 한가지 태클이 들어왔다.

스크롤 이동 시에는 애니메이션을 넣어줄 것...

우린 jQuery 사용 금지인 터라...

다음과 같이 setTimeOut을 사용해 열심히 스크롤을 굴려 주는 것으로 해결봤다.

```
scrollTo = (element, to, duration) => {
if (duration <= 0) return;
const difference = to - element.scrollTop;
const perTick = (difference / duration) * 10;
setTimeout(() => {
element.scrollTop += perTick; // eslint-disable-line no-param-reassign
if (element.scrollTop === to) return;
this.scrollTo(element, to, duration - 10);
}, 10);
}
setFocus = (panel) => {
event.preventDefault();
const panelPosition = this.getOffset(panel);
this.scrollTo(document.body, panelPosition.top, 300);
Panel.handleOpenPanel(panel.nextElementSibling.id);
}
Colored by Color Scripter
```

setTimeOut이 싫은 경우,

setFocus()에서 CSS를 조절하여 같은 동작이 가능하다.

대충 이런 식으로...

```
setFocus = (panel) => {
event.preventDefault();
Panel.handleOpenPanel(panel.nextElementSibling.id);
const panelPosition = this.getOffset(panel);
const base = panel.getBoundingClientRect().top;
const styleBody = document.body.style;
styleBody.transition = 'initial';
styleBody.marginTop = `${base - 1}px`;
window.scrollTo(panelPosition.left, panelPosition.top);
styleBody.transition = 'margin-top 1s ease-in-out';
styleBody.marginTop = '0';
}
Colored by Color Scripter
```
