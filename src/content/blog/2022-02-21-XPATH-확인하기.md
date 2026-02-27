---
title: "XPATH 확인하기"
date: 2022-02-21
tags: ["Tech", "Selenium", "XPath", "Chrome"]
tistory_url: "https://idenrai.tistory.com/257"
---

# XPATH 확인하기

## 서론

Selenium에서는 id나 name등, 여러가지 방법을 통해 타겟 특정이 가능하다.

이러한 특정 방법 중 하나가 XPATH인데, 솔직히 그냥 써먹기엔 이게 최고인 것 같다.

대충 이런 식으로 써먹으면 되는데...

```
driver.find_element(By.XPATH, "/html/body/div/header/nav/ul[2]/div/div/a").click()
```

보기엔 뭔가 길어보이고 알아보기 힘들지만...

이것만큼 확실하게 타겟을 지정하는 방법은 없을 뿐더러, 사실 그냥 마우스 클릭만으로 얻을 수 있다.

## XPATH 취득 방법 (Chrome)

### XPATH를 알고 싶은 요소를 우클릭

우클릭 후, 검사 클릭.


이 글을 자동 클릭하여, 내용으로 화면이 이동하도록 하고 싶다.

### DevTools에 표시된 요소 확인

이 경우에는 strong 을 선택한 것으로 나온다.


다만 내가 원하는 것은 화면 이동이므로, strong 의 바로 위 요소인 a 태그를 얻도록 한다.

### 원하는 요소의 XPATH 얻기

여기서 「전체 XPATH 복사」를 선택하면, HTML태그부터 시작하는 해당 요소의 XPATH를 얻을 수 있다.

/html/body/div\[2\]/div/main/div/div\[1\]/article\[1\]/div/a

### 해당 XPATH를 이용하기

아래와 같이 요소를 취득, Click등을 통해 조작할 수 있다.

```
driver.find_element(By.XPATH, "/html/body/div[2]/div/main/div/div[1]/article[1]/div/a").click()
```
