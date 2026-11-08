---
name: indexing-awareness
description: 프로젝트의 구조 인덱스와 종속성 추적을 통해 RAG와 유사한 컨텍스트 획득을 실현하는 스킬
---

# Indexing Awareness Skill

Antigravity는 리포지토리의 사전 인덱싱을 수행하지 않으므로, 에이전트가 **자율적으로** 프로젝트 구조를 파악하고 종속성을 검색해야 합니다.
이 스킬은 Cursor의 RAG(사전 인덱스 + 관련 컨텍스트 검색)를 유사하게 재현하는 스크립트 모음을 제공합니다.

## Triggers (자동 실행 타이밍)

에이전트는 아래 상황에서 해당하는 스크립트를 **자발적으로** 실행해야 합니다.
사용자의 지시를 기다리지 말고, `indexing-codebase.md` 규칙에 따라 자율적으로 판단하십시오.

| 상황 | 실행할 스크립트 |
|---|---|
| 처음 보는 프로젝트 또는 새로운 태스크 시작 시 | `index-structure.sh` |
| 파일의 변경, 추가, 삭제를 수행하기 전 | `trace-dependencies.sh <대상 파일>` |
| 미지의 함수, 클래스, 심볼을 참조하기 전 | `trace-dependencies.sh <심볼명>` |
| 규칙, 워크플로우, 스킬 구성을 변경한 후 | `verify-structure.sh` |

## Scripts

### 1. index-structure.sh (구조 인덱스)

프로젝트의 디렉토리 구조, 파일 유형, 크기를 인덱싱합니다.

```bash
# 실행 권한 부여 (최초 1회)
chmod +x .agent/skills/indexing-awareness/scripts/index-structure.sh

# 프로젝트 전체 인덱싱
./.agent/skills/indexing-awareness/scripts/index-structure.sh

# 탐색 깊이 지정 (기본값: 4)
./.agent/skills/indexing-awareness/scripts/index-structure.sh --depth 6

# 특정 디렉토리만 인덱싱
./.agent/skills/indexing-awareness/scripts/index-structure.sh --dir src/
```

### 2. trace-dependencies.sh (종속성 추적)

파일 또는 심볼의 종속성을 **양방향**으로 검색합니다.

```bash
chmod +x .agent/skills/indexing-awareness/scripts/trace-dependencies.sh

# 파일 모드: 종속성의 양방향 추적
./.agent/skills/indexing-awareness/scripts/trace-dependencies.sh src/utils/auth.ts

# 심볼 모드: 정의된 위치와 사용된 위치 검색
./.agent/skills/indexing-awareness/scripts/trace-dependencies.sh handleLogin

# 검색 범위 제한
./.agent/skills/indexing-awareness/scripts/trace-dependencies.sh UserService src/
```

**파일 모드 출력 (File Mode Output):**
- 📥 Forward Dependencies — 해당 파일이 무엇을 import/require 하고 있는지
- 📤 Reverse Dependencies — 해당 파일을 누가 import/require 하고 있는지
- 🔍 Config/Doc References — 설정 파일이나 문서에서의 참조 내역

**심볼 모드 출력 (Symbol Mode Output):**
- 📌 Definitions — 정의된 위치 (function, class, const, def, fn 등)
- 📎 Usages — 사용된 위치 (word boundary 매치)
- 📦 Import References — import/require/from 구문에서의 참조 내역

### 3. verify-structure.sh (문서 무결성 체크)

`.agent/` 내의 규칙, 워크플로우, 스킬과 `README.md`의 기재 내용이 일치하는지 무결성을 검증합니다.

```bash
chmod +x .agent/skills/indexing-awareness/scripts/verify-structure.sh
./.agent/skills/indexing-awareness/scripts/verify-structure.sh
```

## Troubleshooting

- **`trace-dependencies.sh`의 결과에 노이즈가 많을 때**: 두 번째 인수로 검색 범위를 좁히십시오.
- **`index-structure.sh`의 출력이 너무 길 때**: `--depth 2`로 트리 깊이를 제한하십시오.
- **`verify-structure.sh`에서 "Missing in README" 오류 발생 시**: `README.md`에 적절한 설명을 추가하십시오.
