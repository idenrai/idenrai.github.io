---
title: "javascript mouse in-out event 비교"
date: 2017-02-03
tags: ["Tech", "JavaScript"]
tistory_url: "https://idenrai.tistory.com/114"
---

MaterialUI의 Drawer를 이용해 sideNavigation을 만드는 중이었다.

drawer자체에 onMouseLeave를 발라도 전혀 적용이 되지 않기에,

일단 render를 해 두고, 나중에 따로 class로 element를 찾아서 이벤트를 바르기로 했다.

```
render() {
const styles = this.getStyles(this.props, this.context);
return (
<div>
<FloatingActionButton
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
<MenuItem
style={styles.item}
onClick={this.setFocus}
>Menu Item</MenuItem>
<MenuItem
style={styles.item}
onClick={this.setFocus}
>Menu Item 2</MenuItem>
</Drawer>
</div>
);
}
Colored by Color Scripter
```

대충 이래 render를 준비해 두고

```
componentDidMount() {
const drawer = document.getElementsByClassName('naviDrawer')[0];
drawer.addEventListener('mouseout', this.closeNavi);
}
Colored by Color Scripter
```

이렇게 Drawer에 이벤트리스터를 발라 두었다.

```
closeNavi = () => {
this.setState({
open: false,
});
}
```

원래대로라면 drawer의 div를 벗어날 경우 이벤트가 발생해야 하는데,

drawer div내의 자식 엘리먼트간 이동을 하는데도 closeNavi가 작동하더라.

뭔가 싶어서 알아보았더니...

1\. 자식 요소에도 개별적으로 영향

mouseover, mouseout

2\. 자식 요소에는 영향 없음

mouseenter, mouseleave

즉, 내가 원하는대로 하려면

componentDidMount에서 이벤트리스너를 바를 때,

mouseout대신 mouseleave를 발라야하더라.

```
componentDidMount() {
const drawer = document.getElementsByClassName('naviDrawer')[0];
drawer.addEventListener('mouseleave', this.closeNavi);
}
Colored by Color Scripter
```
