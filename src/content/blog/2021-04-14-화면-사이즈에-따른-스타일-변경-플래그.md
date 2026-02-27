---
title: "화면 사이즈에 따른 스타일 변경 플래그"
date: 2021-04-14
tags: ["Tech", "React.js", "react.js", "Windows", "화면", "스타일"]
tistory_url: "https://idenrai.tistory.com/239"
---

대략 2년만에 리액트를 만지게 되었다. 이래저래 변한 것도 있긴 한데, 그래도 별 문제 없이 적응 중. 노트북 크기의 화면에 꽤 많은 데이터를 집어넣어야 했는데, 다른 팀원이 만든 화면 중에서 클라이언트의 모니터 크기에 맞지 않는 부분이 있었다. 원래대로라면 1줄로 표기해야 하는데, 아무리 줄여도 맞지 않더라. 그래서 동의를 얻어, 화면이 일정 수준 이상 작아졌을 때엔 2줄로 표기하는 식으로 해결을 보았다. 소스코드는 아래와 같다.

```
// 브라우저 화면의 Width, Height를 보존할 State만들기 
const [windowSize, setWindowSize] = useState({
  width: undefined,
  height: undefined,
});

// 브라우저 화면의 Width, Height 취득
useEffect(() => {
  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => window.removeEventListener('resize', handleResize);
}, []);

// 사용할 곳으로 넘기기
 return (
  
    ...
    
      
        
      
    
    ...
  
);

// 일정 사이즈 이하일 경우 Flag On
let isLaptop = false;
if (windowSize && windowSize.width) {
  if (windowSize.width <= 1900) {
    isLaptop = true;
  }
}

...

// 사용
export const RowByWindowSize = ({
  isLaptop, firstCell, secondCell, thirdCell
}) => {
  if (isLaptop) {
    return (
      <>
        
          
            {firstCell}
          
        
        
          
            {secondCell}
          
          
            {thirdCell}
          
        
      
    );
  }
  return (
    <>
      
        
          {firstCell}
        
        
          {secondCell}
        
        
          {thirdCell}
        
      
    
  );
};
RowByWindowSize.propTypes = {
  isLaptop: PropTypes.bool.isRequired,
  firstCell: PropTypes.element.isRequired,
  secondCell: PropTypes.element.isRequired,
  thirdCell: PropTypes.element.isRequired,
};
```
