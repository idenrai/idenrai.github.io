---
description: "행동 전 코드베이스를 탐색하고 종속성을 분석하는 인덱싱 전략"
---

# Project Structure Awareness (프로젝트 구조 인식)

**Activation:** This rule is **ALWAYS ON** for all files (`**/*`).

> **Positioning:** `senior-engineer-conduct.md`의 원칙을 프로젝트 구조의 **인덱싱 및 종속성 검색**에 구체화한 규칙입니다.
> 원칙적인 행동 규범은 `senior-engineer-conduct.md`를 참조하세요. 이 규칙은 **구체적인 행동 절차**만을 정의합니다.

## 1. Index Before Act (행동 전 인덱싱)
- 새로운 작업을 시작할 때, **가장 먼저 프로젝트 구조를 파악**합니다. 추측으로 작업을 시작하지 마세요.
- 구체적인 방법:
    - `ls`, `find`, `tree`로 디렉토리 구조 확인
    - **`indexing-awareness` 스킬의 `index-structure.sh` 실행**
- 진입점(`main`, `App`, `index`, `routes` 등)을 특정하고 아키텍처(레이어, 도메인 경계)와 기술 스택을 파악하세요.

## 2. Grep, Don't Guess (추측하지 말고 검색할 것)
- **존재하지 않는 함수, 타입, 모듈을 지어내지 마세요.** 확신이 없다면 `grep`으로 실제 존재 여부를 확인하세요.
- 구체적인 방법:
    - `grep -rnI "symbol_name" --include="*.ext" .`
    - **`indexing-awareness` 스킬의 `trace-dependencies.sh <파일 또는 심볼>` 실행**
- 변경 대상 파일의 **Forward(참조 대상)** 및 **Reverse(참조하는 곳)** 양쪽을 모두 확인한 후 편집하세요.
- 순환 참조 위험이 있는 종속성을 추가할 경우, 사전에 경고하세요.

## 3. Verify After Change (변경 후 검증)
- 파일의 추가, 삭제, 이름 변경 후, 이전 경로 또는 이름에 대한 참조가 남아있지 않은지 `grep`으로 확인하세요.
- 규칙, 워크플로우, 스킬의 구성을 변경한 경우, **`verify-structure.sh`로 문서 무결성을 검증하세요**.