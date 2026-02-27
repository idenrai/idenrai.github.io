---
title: "React.js에서의 propTypes 복수 지정"
date: 2017-01-12
tags: ["Tech", "React.js", "react.js", "propTypes"]
tistory_url: "https://idenrai.tistory.com/108"
---

그간 react에서 component를 만들면서,

```
MUIDataTables.propTypes = {
data: PropTypes.object,
cellClick: PropTypes.func,
...
};
```

이와 같이 propTypes를 지정해 왔다.

보통 이걸로 별 문제가 없었기에 다 이런 식으로 지정을 해 왔는데...

어제 한 작업에서 developer tool에 warning이 뜨더라.


react의 render에서 return시 div로 감싸면 별로 멋이 안나니까

이런 식으로 Wrapper를 만들었는데...

```
import React, { Component } from 'react';

class Wrapper extends Component {
componentDidMount() {
}
render() {
return (
<div>
{this.props.children}
</div>
);
}
}
Wrapper.propTypes = {
children: React.PropTypes.element
};
export default Wrapper;

Colored by Color Scripter
```

이 children의 type이 문제가 되더라.

페이지에 따라서 material-ui의 card등으로 한번 래핑을 해서 리턴을 하는 경우도 있고,

본래의 목적대로 여러개의 div등을 wrapper로 감싸서 array형태의 children을 보내는 경우도 있기에...

element로 하건 array로 하건 warning이 뜨는 것이다.

그래서 알아보니, [oneOfType](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)이라는 것이 있더라.

타입을 여러개 지정해두고, 그중 하나 걸리면 OK라는 식이다.

그래서 이렇게 하니 깔끔하게 해결되었다.

```
Wrapper.propTypes = {
children: React.PropTypes.oneOfType([
React.PropTypes.array,
React.PropTypes.element,
])
};
Colored by Color Scripter
```
