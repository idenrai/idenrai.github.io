---
title: "Mermaid 를 PNG 로 Export 하기"
date: 2025-06-17
description: "개요 mermaid-cli 를 이용하여, Mermaid 로 만든 차트를 PNG 파일로 출력하기 상세 이전 포스팅에서 Mermaid 를 소개한 적이 있다. 현재 업무에서도 VSCode 를 이용하여 Mermaid 로 차"
tags: ["Design", "markdown", "Mermaid", "MMD"]
tistory_url: "https://idenrai.tistory.com/300"
---

## 개요

[mermaid-cli](https://github.com/mermaid-js/mermaid-cli) 를 이용하여, Mermaid 로 만든 차트를 PNG 파일로 출력하기

## 상세

이전 포스팅에서 [Mermaid](https://idenrai.tistory.com/293) 를 소개한 적이 있다. 현재 업무에서도 VSCode 를 이용하여 Mermaid 로 차트를 그리고 있는데, 한가지 문제가 있더라.

### 문제점

차트가 길어질 경우, 스크린샷을 찍기가 힘들다.

[Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) 를 이용해서 작성한 차트의 프리뷰를 스크린샷으로 저장, 설계서 등에 붙여넣고 있는데 차트가 위아래로 길어지면 아무래도 한 화면에서 스크린샷을 찍기가 힘들어진다.

### 해결책

[mermaid-cli](https://github.com/mermaid-js/mermaid-cli) 를 이용하니 간단하게 해결 가능했다.

#### 설치

mermaid-js 의 부속품이므로, npm 으로 설치

```
npm install -g @mermaid-js/mermaid-cli
```

node version 을 어느 정도 올려야 한다. 난 `v18.16.0` 이었기에 [nvm](https://idenrai.tistory.com/258) 으로 버전을 그냥 latest 로 올려버렸다.

```
nvm install node
nvm use v24.2.0
```

#### 실행

Mermaid 파일을 변환하는 방식이므로, 변환 대상의 확장자는 `.mmd`로 바꿔야 한다.

기본적인 사용법은 아래와 같다.

```
mmdc -i <변환할 파일명> -o <출력할 파일명>
```

간단하게 png 파일을 출력하고 싶으면 아래와 같이 기재.

```
mmdc -i input.mmd -o output.png
```

#### Example

실제 사용예는 아래와 같다.

내용이 길기에 접어두었음.

더보기

s3\_flowchart.mmd

```
flowchart TD
    direction TB

    %% 요소 정의
    START(처리 시작)

    subgraph 1.파라미터 설정
        A[파라미터 설정]
    end

    subgraph 2.파일 체크
        B{파일 존재 여부}
    end

    subgraph 3.파일 읽기
        C[데이터 읽기]
        D{파일 읽기 성공}
    end

    subgraph 4.데이터 투영
        E[데이터 투영]
        F{데이터 투영 성공}
    end

    subgraph 5.데이터 등록/갱신
        G[데이터 등록·갱신]
        H{데이터 등록·갱신 성공}
    end

    subgraph 6.에러 처리
        ERROR[에러 처리]
    end

    SUCCESS[성공]
    END(처리 종료)

    %% 메인 플로우
    START --> A
    A --> B
    B -- Yes --> C
    B -- No --> END
    C --> D
    D -- Yes --> E
    D -- No --> ERROR
    E --> F
    F -- Yes --> G
    F -- No --> ERROR
    G --> H
    H -- Yes --> SUCCESS
    H -- No --> ERROR
    SUCCESS --> END
    ERROR --> END

    %% 스타일
    classDef success fill:#e6ffe6,stroke:#2ecc40,color:#2ecc40;
    classDef error fill:#ffe6e6,stroke:#e74c3c,color:#e74c3c;
    classDef warning fill:#fffbe6,stroke:#f1c40f,color:#b7950b;

    %% 클래스 정의
    class SUCCESS success;
    class ERROR error;
    class WARNING warning;
```

난 테마 변화 등 필요없이 그냥 있는 그대로 png 로 출력하기만 하면 되니, 아래와 같은 느낌

```
mmdc -i s3_flowchart2.mmd -o s3_flowchart2.png
```

출력 결과는 아래와 같다.

![스크린샷 2025-06-17 16.29.47.png](https://blog.kakaocdn.net/dn/9zVcq/btsOFMq8ABD/LJ9grjWSGXT3zWHwsAdM41/img.png)

#### 실패한 방법

#### Try 1 : Markdown PDF

[Markdown PDF](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf) 를 사용해서 VSCode 에서 Markdown 파일을 PNG 등으로 Export 할 수 있긴 한데, Mermaid 가 프리뷰가 아니라 그냥 코드로 출력되는 현상이 발생한다.

[이런 식](https://github.com/yzane/vscode-markdown-pdf/issues/312#issuecomment-2315955054)으로 Mermaid Server 의 URL을 바꾸면 된다는데 난 안먹히더라.

#### Try 2 : Obsidian

[Obsidian](https://obsidian.md/) 을 통해 Markdown 파일을 pdf 로 Export 하는 방법도 있긴 한데, 이건 길어지면 페이지대로 짤린다.
