---
title: "Windows계정과 Git 연결시의 fatal: Authentication failed for 'https://...'"
date: 2020-01-20
tags: ["Tech", "Git", "윈도우", "fatal:"]
tistory_url: "https://idenrai.tistory.com/214"
---

Windows계정과 Git이 연결되어 있는 상황에서 Windows계정의 패스워드를 변경하였더니, 이후 Git에서 Push를 할 때 아래와 같은 메시지가 출력되었다.

```
fatal: Authentication failed for 'https://...'
```

---

이하의 대응으로 해결되었다. **①제어판에서 자격 정보 관리자로 이동** コントロール パネル\\すべてのコントロール パネル項目\\資格情報マネージャー **②Windows 자격 증명→일반 자격 증명에서 Git 자격 증명 찾기** Windows 資格情報→汎用資格情報에서 Git 자격 증명을 찾기 **③Git 자격 증명의 패스워드를 변경** 이 때, PW는 앞서 변경한 Windows의 패스워드로 설정할 것
