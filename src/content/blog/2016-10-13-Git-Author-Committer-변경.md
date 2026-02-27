---
title: "Git Author, Committer 변경"
date: 2016-10-13
tags: ["Tech", "Eclipse"]
tistory_url: "https://idenrai.tistory.com/95"
---

Eclipse에서 Git Staging 등을 이용하여 commit을 하려고 보면

Author, Commiter란이 이미 채워져 있고,

이를 내가 직접 변경하여 Commit을 하더라도 금방 원래대로 되돌아 오는 것을 볼 수 있다.

몇 번 같은 짓을 반복하다가, 역시 설정을 바꿔야겠다는 생각이 들어 알아보았다.

Windows→Preferences→Team→git→Configuration→User Settings

New Entry에서 아래의 Setting을 추가

**Name**

Key : user.name

Value : 설정하려는 이름

**E-mail**

Key : user.email

Value : 설정하려는 E-Mail
