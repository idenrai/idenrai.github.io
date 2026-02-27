---
title: "Selenium 환경 설정"
date: 2022-02-21
tags: ["Tech", "Selenium"]
tistory_url: "https://idenrai.tistory.com/255"
---

# Selenium 환경 설정

## Selenium

웹 브라우저 조작을 자동화하기 위한 프레임워크

## 환경구축

### Python 인스톨

버전은 최신이면 됨 (난 3.10.0사용)

#### MacOS의 경우

기본적으로 Python이 깔려 있으나, 되도록이면 Python3을 설치하는 것을 추천.

```
brew install python3
```

### Selenium 인스톨

#### Windows

```
pip install selenium
```

#### Mac

```
python3 -m pip install selenium
```

### Chrome Driver 인스톨

우선 자신의 크롬 버전을 확인 설정에서 아래와 같이 버전 확인 가능


내 경우엔 98.0.4758.102 니까 버전 98을 받으면 된다.

```
pip install chromedriver-binary==98.*
```

원래는 직접 [여기서](https://chromedriver.chromium.org/downloads) 크롬드라이버를 DL해야 하지만, 어떤 친절한 사람이 [이런 걸](https://github.com/danielkaiser/python-chromedriver-binary) 만들어 줬으므로, 그냥 pip으로 해결했다. ※현재는 위의 링크가 죽은 것 같다. [이쪽](https://pypi.org/project/chromedriver-binary/)을 참조.

#### Mac

맥의 경우는 그냥 brew로 설치 가능하다.

```
brew install chromedriver
```

설치 확인

```
chromedriver -v
```

## 구동 확인

### 소스코드

아래의 소스코드를 작성, test.py라는 이름으로 저장해 두자

```
import time

# MacOS의 경우는 import할 필요 없음
import chromedriver_binary

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# WebDriver의 옵션 설정
options = webdriver.ChromeOptions()
# Headless Chrome을 사용하면, 화면을 띄우지 않고 테스트 실시
options.add_argument('--headless')

print('Connecting to remote browser...')

# 옵션을 사용할 경우엔 이런 식으로
# driver = webdriver.Chrome(options=options)

driver = webdriver.Chrome()

# Access
driver.get('https://www.naver.com')

print('first')
print(driver.current_url)
print(driver.title)

# 1. Naver
# 검색창을 찾아 검색어 입력
elm = driver.find_elements(By.ID, 'query')[0]
elm.send_keys('Selenium')

# 검색
# 검색 버튼 Element를 찾아 클릭
btn_elm = driver.find_elements(By.ID, 'search_btn')[0]
btn_elm.click()

# 새 탭 지정 : googl
# Google을 googl로 지정
driver.execute_script(
  "(function() { " +
  "window.open('https://www.google.com/', 'googl');" + 
  "})();"
)

# googl 탭 열기
driver.switch_to.window("googl")

print('googl')
print(driver.current_url)
print(driver.title)

# 검색창을 찾아 검색어 입력
search = driver.find_element(By.XPATH, "//input[@name='q']")
search.send_keys('Selenium')
# 검색
# 검색창에서 엔터키 누르기
search.send_keys(Keys.ENTER)

# 동작 확인을 위해 Sleep
# Selenium을 돌리는 데 있어서, 이런식으로 트릭키한 작업이 필요한 경우가 꽤 많다
# 특히 화면이동이나 검색 등의 확인도, 매번 sleep을 주어야 제대로 돌아간다
time.sleep(5)

# 브라우저 종료
driver.quit()
```

### 실행

저장해 둔 폴더에서

```
test.py
```

또는

```
python test.py
```

#### Mac

```
python3 test.py
```
