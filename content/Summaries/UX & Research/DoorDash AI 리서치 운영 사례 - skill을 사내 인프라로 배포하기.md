---
title: "DoorDash AI 리서치 운영 사례 - skill을 사내 인프라로 배포하기"
source: "https://www.theresearchopsreview.com/p/making-complex-ai-systems-usable-across-teams"
original_note: "[[2026-07-22 What It Takes to Make Complex AI Systems Usable Across Teams - 번역 원문]]"
original_path: "Sources/UX & Research/2026-07-22 What It Takes to Make Complex AI Systems Usable Across Teams - 번역 원문.md"
author: "Kate Towsey"
publish_date: "2026-07-22"
scraped_at: "2026-08-03T20:12:45+0900"
language: "ko"
tags:
  - UX
  - ResearchOps
  - AI_UXR
  - DoorDash
  - 리서치운영
  - AI에이전트
  - MCP
  - skill
---

# DoorDash AI 리서치 운영 사례 - skill을 사내 인프라로 배포하기

원문 노트: [[2026-07-22 What It Takes to Make Complex AI Systems Usable Across Teams - 번역 원문]]  
원문 파일 경로: `Sources/UX & Research/2026-07-22 What It Takes to Make Complex AI Systems Usable Across Teams - 번역 원문.md`

## 한 줄 요약

DoorDash 사례의 핵심은 새로운 AI 기능 자체가 아니라, Cursor·Claude Code·MCP·Python script·Markdown skill을 리서치 전 과정에 연결하고, 이를 사내 skill marketplace와 GitHub 기반 운영 체계로 배포·갱신하는 **AI ResearchOps 인프라화**에 있다.

## 사용자가 남긴 핵심 메모

- 개별 기능은 낯설지 않다. Cursor와 Claude Code에서 사내 자료를 검색하고, 연구 계획·인터뷰 가이드·설문을 만들고, 분석과 공유까지 연결한다.
- Markdown skill, reference 문서, Python script, MCP connector, journaling hook 같은 구성은 AI coding agent를 깊게 쓰는 조직에서는 점차 일반화되고 있다.
- 그래도 사례의 특기할 점은 다음 네 가지다.
  - 연구 전 과정을 하나의 연결된 경험으로 구성했다.
  - LLM이 판단할 부분과 코드로 고정할 부분을 구분했다.
  - skill 배포를 사내 제품처럼 운영했다.
  - 연구팀 밖의 전문성을 skill에 합쳤다.
- 성과를 판단할 자료는 부족하다. 이용자 수, 시간 절감, 품질 변화, 오류율, 유지 비용이 공개되지 않았다.
- 따라서 새로운 AI 사용법보다는, 이미 존재하는 skill과 agent 활용법을 대규모 조직에서 어떻게 배포하고 공동 관리했는지 보여주는 사례로 보는 편이 적절하다.

## 핵심 구조

### 1. 개인 실험을 공유 리서치 인프라로 전환

아티클은 DoorDash의 Nam Pham이 시연한 AI 리서치 시스템을 소개한다. 이 시스템은 DoorDash의 핵심 UX 인프라 일부가 되었고, 리서처뿐 아니라 디자이너와 PM도 리서치 프로세스를 따라갈 수 있게 돕는다.

흐름은 다음과 같다.

- 리서치 범위 설정
- 리서치 계획 수립
- 인터뷰 가이드·설문 등 조사 도구 설계
- Qualtrics 설문 프로그래밍
- 분석
- 공유

중요한 점은 각 기능이 흩어진 자동화가 아니라, 다음 작업을 제안하고 연결하는 **연구 여정형 시스템**으로 구성되었다는 점이다.

### 2. AI skill은 prompt가 아니라 운영 절차에 가깝다

아티클은 유용한 AI skill이 단순 prompt보다 operating procedure에 가깝다고 설명한다. 즉 “이렇게 답해줘”가 아니라, 특정 리서치 과업을 수행하기 위한 입력, 참고 자료, 판단 기준, 실행 script, 검토 절차까지 포함한다.

DoorDash 사례에서 언급된 구성:

- Markdown 기반 skill
- reference file
- Python script
- MCP connector
- AI harness
- AI coding hook
- agent journaling
- skill chaining
- internal skills marketplace

이 구성은 AI를 “답변 생성기”가 아니라, 조직의 리서치 절차를 실행하는 agentic workflow로 다루는 방식이다.

### 3. 모델 재량과 결정론적 실행을 분리

DoorDash 사례에서 특히 중요한 설계 원칙은 LLM이 판단해야 할 부분과 코드로 고정해야 할 부분을 나누는 것이다.

LLM이 잘하는 영역:

- 리서치 질문 탐색
- 문제 범위 정리
- 방법론 제안
- 인터뷰 가이드 초안 작성
- 내부 자료를 바탕으로 맥락 연결
- 다음 단계 추천

코드로 고정해야 하는 영역:

- Qualtrics 설문 입력
- 반복 가능한 교차 분석
- 정해진 형식의 데이터 변환
- SQL/Python 기반 데이터 처리
- 출력 포맷 검증
- hook을 통한 테스트·가드레일 실행

이 분리는 AI ResearchOps에서 매우 중요하다. 모델에게 모든 것을 맡기면 유연하지만 불안정해지고, 모든 것을 코드로 고정하면 확장성이 떨어진다. DoorDash 사례는 “판단은 LLM, 형식과 반복 실행은 script”라는 하이브리드 운영 방식을 보여준다.

## 관찰과 인사이트

### 연구 경험이 적은 직군을 위한 “가이드 레일” 역할

리서처에게는 익숙한 연구 단계도 디자이너나 PM에게는 낯설 수 있다. 시스템이 다음 작업을 제안하고, 단계별 skill을 연결하면 비전문가도 최소한의 연구 흐름을 따라갈 수 있다. 이는 단순 생산성 향상이 아니라 **리서치 문해력의 운영화**에 가깝다.

### skill marketplace가 진짜 차별점이다

개별 연구자가 자기 로컬 환경에서 만든 skill은 쉽게 사라지고, 다른 사람이 재사용하기 어렵다. DoorDash는 GitHub를 정본으로 삼고, 사내 skill marketplace를 통해 설치와 자동 갱신을 지원한다. 이 구조는 skill을 개인 도구가 아니라 조직 제품처럼 관리하게 만든다.

의미:

- 설치 장벽 감소
- 버전 관리 가능
- 업데이트 배포 가능
- 여러 직군의 공동 개선 가능
- 조직 표준 반영 가능
- 특정 개인에게 종속되지 않음

### ResearchOps의 역할이 “도구 관리”에서 “지식/절차 배포”로 확장된다

기존 ResearchOps가 리서치 저장소, 템플릿, 패널, 프로세스 운영에 초점을 두었다면, AI ResearchOps는 여기에 **실행 가능한 절차**를 더한다. 좋은 리서치 방법론이 문서로만 남는 것이 아니라, agent가 따라 할 수 있는 skill, script, connector로 구현된다.

### 전문성은 skill에 누적된다

정량 연구자는 분석 기준과 통계 script를, 디자이너는 산출물 형식과 커뮤니케이션 기준을, 엔지니어는 connector와 배포 구조를, 리서처는 방법론과 품질 기준을 더할 수 있다. 이렇게 되면 skill은 개인의 노하우가 아니라 여러 전문 분야의 합성 자산이 된다.

### 성과 지표 부재는 중요한 한계다

아티클은 사례의 구조와 방향을 잘 보여주지만, 실제 효과를 판단할 수 있는 정량 자료는 부족하다.

공개되지 않은 것:

- 실제 이용자 수
- 시간 절감량
- 리서치 품질 변화
- 오류율
- 유지보수 비용
- skill 업데이트 빈도
- 디자이너/PM의 독립 수행 성공률
- 사람이 수정해야 했던 비율

따라서 이 사례를 “성공이 입증된 베스트 프랙티스”라기보다 “조직형 AI ResearchOps 설계 참고 사례”로 보는 것이 안전하다.

## 실무 적용 예시

### 1. 사내 AI UXR skill 구조

하나의 큰 agent를 만들기보다 리서치 단계별 skill로 나눈다.

예시 skill:

- `research-scoping`: 문제 정의, 의사결정 맥락, 리서치 질문 정리
- `method-selection`: 적합한 방법론 추천, 제약 조건 고려
- `interview-guide`: 인터뷰 가이드 초안 생성
- `survey-design`: 설문 문항·척도·로직 설계
- `qualtrics-programming`: Qualtrics 입력용 포맷 생성/자동화
- `analysis-plan`: 코딩 프레임, 교차 분석, 통계 계획
- `insight-synthesis`: 결과 요약, 제품팀 공유 문서 생성

각 skill에는 다음을 포함한다.

- 목적
- 사용 조건
- 입력 형식
- 참고 문서
- 예시
- 금지 사항
- 필요한 script
- 검증 체크리스트

### 2. LLM과 script의 역할 분담

- LLM:
  - 모호한 질문을 구조화한다.
  - 리서치 방법을 제안한다.
  - 내부 문서에서 관련 맥락을 찾는다.
  - 초안을 만든다.
  - 다음 단계를 추천한다.
- Script:
  - 설문 플랫폼 입력 포맷을 생성한다.
  - 문항 번호·로직·척도를 검증한다.
  - 데이터 교차 분석을 반복 실행한다.
  - 출력 스키마를 검사한다.
  - 결과물을 정해진 템플릿으로 내보낸다.

### 3. Skill marketplace 운영 모델

조직에서 skill을 확산하려면 저장소와 배포 구조가 필요하다.

- GitHub repository를 정본으로 사용
- skill별 owner 지정
- PR 기반 리뷰
- changelog 작성
- 자동 업데이트 지원
- 사내 marketplace에서 설치 가능하게 제공
- 사용 로그와 실패 사례 수집
- 비리서처용 설명과 예시 제공
- deprecated skill 관리

## 운영 체크리스트

- [ ] 리서치 전체 여정을 단계별 skill로 나눴는가?
- [ ] 각 skill이 다음 단계와 연결되는가?
- [ ] LLM 판단 영역과 deterministic script 영역을 분리했는가?
- [ ] Qualtrics/SurveyMonkey/Typeform 같은 도구 입력은 사람이 검토할 수 있게 했는가?
- [ ] 내부 리서치 저장소, Slack, 데이터베이스 접근 권한을 MCP나 connector로 안전하게 제한했는가?
- [ ] agent journaling으로 실행 로그와 실패 지점을 남기는가?
- [ ] skill 배포와 업데이트가 개인 로컬 파일에 묶이지 않는가?
- [ ] 정량 연구자, 디자이너, 엔지니어, 리서처가 각각 기여할 수 있는 구조인가?
- [ ] adoption, time saved, error rate, rework, quality review 결과를 추적하는가?
- [ ] 비전문가가 사용할 때 생길 수 있는 리서치 품질 리스크를 문서화했는가?

## 한계와 주의점

- 사례 본문은 구조와 방향을 보여주지만, 성과 검증 데이터는 공개하지 않는다.
- 시연 중 생성된 설문에도 문항 순서와 형식 문제가 있었다는 사용자 메모가 있으므로, 자동 생성물을 그대로 운영에 넣어서는 안 된다.
- AI skill을 marketplace로 배포하면 확산은 쉬워지지만, 잘못된 절차도 빠르게 확산될 수 있다.
- skill이 많아질수록 owner, 버전, 의존성, 폐기 기준을 관리해야 한다.
- 비리서처가 리서치 flow를 따라갈 수 있다는 점은 장점이지만, 방법론적 판단까지 자동화하면 품질 리스크가 생긴다.
- 사내 자료와 Slack 연결은 편리하지만 권한, 개인정보, 민감 정보 노출 통제가 필수다.

## 관련 노트

- [[2026-07-22 What It Takes to Make Complex AI Systems Usable Across Teams - 번역 원문]]
- [[How to AI UXR - AI-Augmented ResearchOps 맵]]
- [[Ureka 제작기 - 조직의 인사이트를 자산화하는 GraphRAG 구조]]
- [[넥슨 인사이트 파인더 - AI 기반 유저 리서치 파이프라인]]
- [[디자이너의 AI 활용 사례 - 완성이 아니라 탐색과 검증을 빠르게 만드는 워크플로]]
- [[AI UX를 어떻게 측정할 것인가 - 측정 구성개념과 진단 지표]]
- [[질적 연구와 AI - 인간 해석과 자동화 사이의 경계]]
- [[SkillOpt 프로젝트 페이지 - frozen agent를 위한 skill optimization]]

## 다시 꺼내 쓸 때의 키워드

- DoorDash AI UXR
- AI ResearchOps
- skill marketplace
- research skill chaining
- LLM과 deterministic script 분리
- Cursor와 Claude Code 기반 리서치 운영
- MCP connector와 사내 지식 검색
- 리서치 절차의 agentic workflow화
