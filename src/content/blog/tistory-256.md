---
title: "쿠키를 이용한 로그인 및 테스트 예시"
date: 2022-02-21
tags: ["Tech", "Selenium", "로그인", "쿠키", "셀레니움"]
tistory_url: "https://idenrai.tistory.com/256"
---

# 쿠키를 이용한 로그인 및 테스트 예시

## 문제

셀레니움을 이용하여, 화면 구동 테스트를 자동화하고 싶었다.

평소엔 자동 로그인을 이용해 URL만 쳐도 바로 페이지 이동이 되는데, 셀레니움으로 해당 페이지를 열고자 하면 매번 로그인에서 막히더라.

그래서 로그인 시 쿠키를 저장하여, 이 쿠키를 이용한 자동 로그인이 되도록 해 보았다.

## 구현

### 쿠키 확인 및 저장 기능

아래의 코드는 쿠키가 존재하는지를 확인 후, 쿠키가 없으면 로그인 화면을 띄워 수동 로그인을 하게 만든다.

수동 로그인 시 해당 로그인 정보를 쿠키로 저장, 이후의 시도에서는 자동으로 로그인이 되게 만든다.

다만 저장된 쿠키는 일정 시간이 지나면 무효화되므로, 로그인이 안되면 일단 쿠키 파일을 한번 지우고 다시 이 코드를 돌려서 쿠키를 만들어 줘야 한다.

```
import chromedriver_binary
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pickle
import glob
import time

#쿠키가 있는지 체크
find_cookie = False
cookie_files = glob.glob('cookies.pkl')
if len(cookie_files) > 0:
    find_cookie = True

login_with_cookie = False
url = 'https://test.dev.com/dashboard'

while(not login_with_cookie):
    # 쿠키 정보를 이용해 로그인
    if find_cookie:

        driver = webdriver.Chrome()
        cookies = pickle.load(open("cookies.pkl", "rb"))
        driver.get(url)
        for cookie in cookies:
            driver.add_cookie(cookie)
        driver.get(url)
        login_with_cookie = True
    # 쿠키가 없을 경우, 수동으로 로그인하여 쿠키 정보 보존
    # 보존 후에는 브라우저 종료 (브라우저 종료 후, 다시 열어서 쿠키 정보를 사용하여 로그인)
    else:
        driver = webdriver.Chrome()
        driver.get(url)
        while(not find_cookie):
            cookies = driver.get_cookies()
            if len(cookies)>0:
                find_cookie = True
        pickle.dump(cookies , open("cookies.pkl","wb"))
        driver.close()
        driver.quit()
```

## 자동 로그인 및 테스트 예시

### 초기 화면 표시 검사 및 화면 이동 검사

위의 코드를 통해 로그인 정보 쿠키를 만들었다는 전제하에 아래 코드를 통해 화면 검사를 실시한다.

```
import time
import unittest
import pickle
import glob
import chromedriver_binary
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class DashboardTest(unittest.TestCase):
    # 로그인
    def setUp(self):
        #쿠키 읽어오기
        cookies = pickle.load(open("../cookies.pkl", "rb"))
        #브라우저 기동
        self.browser = webdriver.Chrome()
        #대기
        time.sleep(5)
        #게시판 접속
        self.browser.get("https://test.dev.com/dashboard")
        for cookie in cookies:
            self.browser.add_cookie(cookie)
        #화면 최대화
        self.browser.maximize_window()

    # 종료
    def tearDown(self):
        self.browser.quit()

    # 1. 로그인 확인
    def test_1_1_login_check(self):
        print("1. 화면 초기표시")
        print("1-1. 게시판 화면에 초기접속됨을 확인")
        self.browser.get("https://test.dev.com/dashboard")
        #URL체크
        #URL에 dashboard가 들어가면 OK
        print(self.browser.current_url)
        self.assertIn('dashboard', self.browser.current_url)
        #대기
        time.sleep(3)

    # 2. 유저 관리 화면으로 이동
    def test_2_1_move_user_management(self):
        print("2-1. 유저 관리 화면으로 이동")
        self.browser.get("https://test.dev.com/dashboard")
        #URL체크
        print(self.browser.current_url)
        #화면 표시될 때까지 대기
        time.sleep(5)

        #유저 아이콘 클릭
        self.browser.find_elements(By.XPATH, "/html/body/div/header/nav/ul[2]/div/div/a")[0].click()
        time.sleep(1)

        #유저 관리 목록의 버튼을 XPATH로 취득
        menus = self.browser.find_elements(By.XPATH, "/html/body/div/header/nav/ul[2]/div/div/div/div/button")
        print(menus)
        # [관리화면으로 이동]버튼 클릭
        menus[0].click()

        # 대기
        time.sleep(10)
        # 이동한 화면의 URL에 user/management가 들어가면 OK
        print(self.browser.current_url)
        self.assertIn('user/management', self.browser.current_url)
        #대기
        time.sleep(3)

if __name__ == '__main__':
    unittest.main(verbosity=2)
```
