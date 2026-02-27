---
title: "Windows10에서의 Docker와 VirtualBox간 충돌"
date: 2017-05-17
tags: ["Tech", "Environment Setting"]
tistory_url: "https://idenrai.tistory.com/132"
---

@markdown

코딩용으로 VirtualBox에 64비트 우분투가 들어있는 상태에서

jupyter notebook을 사용하고자 Windows10에서 Docker Windows Installer를 받아 설치하였다.

그 와중에 들은 말, "역시 리눅스에서 설치하는 게 낫겠다."

알겠다 하고 바로 VirtualBox의 우분투를 실행하는데...

\`\`\`

Failed to open a session for the virtual machine Kwon.

VT-x is not available (VERR\_VMX\_NO\_VMX).

Result Code: E\_FAIL (0x80004005)

Component: ConsoleWrap

Interface: IConsole {872da645-4a9b-1727-bee2-5585105b9eed}

\`\`\`

계속 이모양이다.

일단 이래저래 시도해보았지만 다 안되었고, Windows의 Docker를 지웠지만 상황은 마찬가지.

Docker를 깔면서 Hyper-V가 자동으로 켜져서 64비트 VirtualBox를 실행 불가능하게 된 것 같다.

자세한 이유는 \[이곳\](http://yeongeon.tistory.com/entry/A-crash-docker-with-virtualBox)을 참조하도록 하고...

\[이 방법\](http://www.fixedbyvonnie.com/2014/11/virtualbox-showing-32-bit-guest-versions-64-bit-host-os/#.WRwMimjyhPZ)으로 Windows Features에서 Hyper-V를 끄고 나니 되더라.
