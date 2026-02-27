---
title: "Streamlit에서 Dataframe 출력시의 이것저것"
date: 2023-11-24
tags: ["Tech", "Streamlit", "HTML", "markdown", "pandas", "DataFrame", "streamlit"]
tistory_url: "https://idenrai.tistory.com/280"
---

## st.dataframe

Streamlit에서는 기본적으로 데이터프레임 출력 기능이 있다. [st.dataframe](https://docs.streamlit.io/library/api-reference/data/st.dataframe)

```python
st.dataframe(df)
```

### 단점

이걸 쓰기만 해도 화면에 맞추어 데이터프레임을 출력해주며, 확대도 가능한데... 아쉬운 점이 있다.

1.  데이터 내용 전체 표시 linebreak의 적용이 안되어, 한눈에 데이터를 보기 어렵다
2.  데이터 내의 url 링크 url이 있어도 문자열로 인식하므로 링크 부여 불가

이 두가지 문제를 해결하기 위해서는 다른 방법으로 데이터프레임을 출력할 수밖에 없다.

## to\_html

간단히 말하자면 데이터프레임을 html로 변환해서 markdown으로 출력하는 것.

[st.markdown](https://docs.streamlit.io/library/api-reference/text/st.markdown)

구체적인 출력 방식은 아래와 같다.

```python
st.markdown(df.to_html(render_links=True, escape=False), unsafe_allow_html=True)
```

### 참조

#### column linebreak

[https://discuss.streamlit.io/t/how-to-display-long-text-in-streamlit-dataframes-with-automatic-line-breaks/41225](https://discuss.streamlit.io/t/how-to-display-long-text-in-streamlit-dataframes-with-automatic-line-breaks/41225)

#### url link

[https://discuss.streamlit.io/t/how-to-display-a-clickable-link-pandas-dataframe/32612/3](https://discuss.streamlit.io/t/how-to-display-a-clickable-link-pandas-dataframe/32612/3)

### 단점

markdown html 자체가 일단 건드리기가 쉽지 않은 관계로, 몇가지 문제가 발생한다. 일단 내가 신경쓰였던 것은 아래와 같다.

1.  첫번째 칼럼이 라인 수를 의미하는데, 0부터 시작
2.  칼럼 width 조정이 안됨
3.  url 칼럼이 무의미하게 많은 칸을 차지함

(2, 3의 문제는 내가 현재 운용하는 환경에서 특수하게 발생하는 것일 수도 있음)

여하튼 각각 해결책이 있긴 하다.

#### 첫번째 칼럼 문제

아래와 같이 style을 넣어서 해결

```python
st.markdown(
    """
        
            table td:nth-child(1) {
                display: none;
            }
            table th:nth-child(1) {
                display: none;
            }
        
    """,
    unsafe_allow_html=True,
)
```

#### 칼럼 width 조절 문제

이게 제일 골때리는 문제였다. 검색해 보면 아래와 같은 해결책은 여러 가지 있는데, 정작 내 환경에선 적용이 안되더라. [https://discuss.streamlit.io/t/is-there-a-way-to-specify-column-width-for-dataframe-table/333](https://discuss.streamlit.io/t/is-there-a-way-to-specify-column-width-for-dataframe-table/333)

결국 해결한 방법은 여기에 적힌 세 가지 방법 중, 투명한 img 태그를 삽입하는 방법이었다. 이것 외엔 아무것도 안 먹히더라. [https://stackoverflow.com/questions/36121672/set-table-column-width-via-markdown](https://stackoverflow.com/questions/36121672/set-table-column-width-via-markdown)

```python
def add_invisible_img_300(value):
    return f"{value}"

new_df = msg_content.copy()
new_df["name"] = new_df["name"].apply(add_invisible_img_300)
```

이 방법의 치명적인 단점은 두 가지.

-   기존보다 작게는 조절 불가
-   코드와 그 결과물이 더럽다

#### url 칼럼이 무의미하게 많은 칸을 차지하는 문제

그냥 출력하는 경우, url의 길이가 제각기 다르고, 다른 칼럼과 다르게 linebreak가 먹히지 않기에 무의미하게 많은 칸을 차지하게 된다. 어차피 중요한 것은 url이 아니라 링크이므로, 태그를 넣어서 그냥 link라는 문자열에 링크를 부여하였다.

`def wrap_url_with_a_tag(url):     return f'``[link]({url})'  new_df = msg_content.copy() new_df["url"] = new_df["url"].apply(wrap_url_with_a_tag)`
