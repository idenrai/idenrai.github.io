---
title: "Ant Design 테이블에 Loading 기능 구현"
date: 2021-09-12
tags: ["Tech", "JavaScript", "Spin", "Table", "로딩", "Loading", "antd", "AntDesign"]
tistory_url: "https://idenrai.tistory.com/252"
---

일단 이번에 사용하게 된 녀석 소개.

[Ant Design](https://ant.design/components/overview/)

[

Components Overview - Ant Design

antd provides plenty of UI components to enrich your web applications, and we will improve components experience consistently. We also recommend some great Third-Party Libraries additionally.

ant.design

](https://ant.design/components/overview/)

이번엔 테이블 구현을 위해 사용하였다.

MaterialUI와도 별 위화감 없이 섞어쓸 수 있고, 데이터테이블 기능이 어느정도 다 구현되어 있어서 좋더라.

일단 기본적인 로딩 기능 구현은 아래를 참조하면 된다.

[https://ant.design/components/table/#components-table-demo-dynamic-settings](https://ant.design/components/table/#components-table-demo-dynamic-settings)

[

Table - Ant Design

ant.design

](https://ant.design/components/table/#components-table-demo-dynamic-settings)

다만 내 경우는 기본 디자인 말고 아래와 같은 느낌으로 커스텀 스핀을 사용하고 싶더라.

[https://ant.design/components/spin/#components-spin-demo-custom-indicator](https://ant.design/components/spin/#components-spin-demo-custom-indicator)

[

Spin - Ant Design

Alert message title Further details about the context of this alert.

ant.design

](https://ant.design/components/spin/#components-spin-demo-custom-indicator)

뭐 구현방법은 대충 아래와 같다.

요약하자면, Table 컴포넌트에서 loading에는 boolean이나 SpinProps를 넣을 수 있다.

로딩중에는 Custom Spin Props를 넣고, 로딩 끝나면 False를 넣으면 된다.

```
const antIcon = ;
return (
   } : false}
    rowSelection={{ ...rowSelection }}
    columns={columns}
    dataSource={tableData}
    size="small"
    bordered
    pagination={{
      size: "small",
      position: ["topRight"],
      defaultPageSize: 10,
      pageSizeOptions: ["3", "5", "10"],
      showSizeChanger: true,
      // ...
    }}
  >
); 혹시 테이블 말고 딴곳에 로딩을 넣을 경우엔 아래와 같은 식으로 사용하면 된다.대충 스핀의 위치를 중간 부분에 맞춰주는 것이 포인트.
  
    
      ...
    
  
  {load ? (
    
      } />
    
  ) : (
    
      
        ...
      
    
 )}

                        
```
