---
title: "복잡한 AI 시스템을 팀 전반에서 사용할 수 있게 만들려면 무엇이 필요한가"
original_title: "What It Takes to Make Complex AI Systems Usable Across Teams"
source: "https://www.theresearchopsreview.com/p/making-complex-ai-systems-usable-across-teams"
site: "The ResearchOps Review"
author: "Kate Towsey"
publish_date: "2026-07-22"
scraped_at: "2026-08-03T20:12:45+0900"
language: "ko"
translation_note: "영어 원문을 한국어로 번역해 저장함"
tags:
  - UX
  - ResearchOps
  - AI
  - AI_UXR
  - DoorDash
  - 리서치운영
  - 에이전트
summary_note: "[[DoorDash AI 리서치 운영 사례 - skill을 사내 인프라로 배포하기]]"
---

# 복잡한 AI 시스템을 팀 전반에서 사용할 수 있게 만들려면 무엇이 필요한가

- 원문 제목: What It Takes to Make Complex AI Systems Usable Across Teams
- 부제: How DoorDash’s Nam Pham and Their Team Turned AI Research Skills Into Shared Infrastructure for Research, Design, and Product
- 원문 URL: https://www.theresearchopsreview.com/p/making-complex-ai-systems-usable-across-teams
- 저자: Kate Towsey
- 게시일: 2026-07-22
- 게스트: Nam Pham, Senior Researcher at DoorDash; Priya Krishnan, cofounder and COO of Strella
- 번역 메모: 영어 원문을 한국어로 번역해 저장함. Substack 본문 기준으로 구독 유도·스폰서 고지는 최소한으로 보존함.

## 연결된 요약

- [[DoorDash AI 리서치 운영 사례 - skill을 사내 인프라로 배포하기]]

## 사용자 메모

DoorDash UXR팀의 AI 리서치 운영 사례입니다.

개별 기능만 보면 낯선 내용은 많지 않습니다. Cursor와 Claude Code에서 사내 자료를 검색하고, 연구 계획·인터뷰 가이드·설문을 만들고, 분석과 공유까지 연결합니다. Markdown skill, reference 문서, Python script, MCP connector, journaling hook 같은 구성도 AI coding agent를 깊게 쓰는 조직에서는 점차 일반화되고 있습니다.

그래도 특기할 만한 지점은 있습니다.

1. **연구 전 과정을 하나의 연결된 경험으로 구성**
   - 연구 범위 설정 → 계획 → 조사 도구 설계 → 분석 → 공유를 여러 skill로 연결했습니다. 다음 작업을 system이 제안하기 때문에 연구 경험이 적은 designer와 PM도 흐름을 따라갈 수 있습니다.

2. **LLM이 판단할 부분과 코드로 고정할 부분을 구분**
   - 연구 질문 탐색과 방법 제안에는 LLM을 사용합니다. Qualtrics 설문 입력이나 교차 분석처럼 정확한 형식이 필요한 작업은 기존 Python script를 실행합니다. 모델의 재량을 어디까지 허용할지 설계했다는 점이 돋보입니다.

3. **Skill 배포를 사내 제품처럼 운영**
   - GitHub를 정본으로 삼고, 사내 skill marketplace에서 설치와 자동 갱신을 지원합니다. 개인이 만든 skill을 다른 직군이 설치하고, 여러 전문가가 같은 skill을 함께 개선할 수 있습니다. 이 배포·관리 구조가 사례의 가장 큰 특징입니다.

4. **연구팀 밖의 전문성을 skill에 합침**
   - 정량 연구자, designer, engineer 등이 각자의 기준과 코드를 보탰습니다. 한 연구자가 모든 방법론을 직접 작성하는 방식보다 전문 분야별 지식을 공용 자산에 누적하는 구조입니다.

다만 성과를 판단할 자료는 부족합니다. 정확한 이용자 수, 시간 절감, 품질 변화, 오류율, 유지 비용은 공개하지 않았습니다. 시연 중 생성된 설문에서도 문항 순서와 형식 문제가 발견됐습니다.

따라서 새로운 AI 사용법을 소개한 사례보다는, 이미 존재하는 skill과 agent 활용법을 대규모 조직에서 어떻게 배포하고 공동 관리했는지 보여주는 사례로 보는 편이 적절합니다.

## 번역 원문

> ResearchOps에 관한 날카로운 생각을 이메일로 받아보라는 구독 안내가 포함되어 있었다. 스폰서 덕분에 무료라고 설명한다.

---

**Nam Pham**은 DoorDash의 시니어 UX 리서처다. DoorDash에서 혼합 방법론 리서치를 활용해 0에서 1로 가는 제품을 만든다. 최근에는 새로운 카테고리로서의 외식 경험을 구축하고, 더 저렴한 DoorDash 다이닝 경험을 만드는 일을 하고 있다. 또한 연구 평가 관행을 개발하면서, 팀이 AI와 대규모 언어 모델(LLM) 제품을 만들 때 사용자—복잡하고 인간적인 현실을 가진 사용자—가 계속 중심에 있도록 돕고 있다. DoorDash 이전에는 Realtor.com에서 주택 소유자와 판매자 제품 리서치를 이끌었다. Parsons School of Design에서 공부했으며, 참여적 디자인에 대한 깊은 믿음을 갖게 되었다.

*How to AI UXR*은 Strella의 지원을 받는다. Strella는 AI 기반 고객 리서치 플랫폼으로, 질문에서 실행 가능한 인사이트까지 몇 시간 안에 도달할 수 있도록 인터뷰 구축, 진행, 종합을 돕는다.

---

# 이번 대화에서 다루는 내용

AI 리서치 시스템은 점점 더 쉽게 만들 수 있게 되고 있다. 하지만 그런 시스템이 신뢰할 수 있고, 제대로 유지보수되며, 만든 사람 한 명과 그 사람의 로컬 드라이브를 넘어 배포될 수 있게 하려면 어떻게 해야 할까?

이번 에피소드에서 Nam Pham은 강력한 AI 리서치 시스템을 시연한다. 진행자가 본 것 중 가장 진보적인 시스템 중 하나이며, 현재 DoorDash의 핵심 UX 인프라의 일부가 되었다. 이 시스템은 DoorDash의 리서처, 디자이너, 프로덕트 매니저가 리서치 프로세스를 따라갈 수 있게 돕는다. 범위 설정과 계획 수립에서 시작해 조사 도구 설계, 설문 프로그래밍, 분석, 공유까지 이어진다. 또한 Nam과 DoorDash 동료들이 전통적인 도구 스택을 skills, harnesses, hooks, scripts, connectors, 사내 “skills marketplace”와 결합해, 팀이 리서치에 도움 되는 AI skill을 공유하고 업데이트하는 방식도 이야기한다.

이번 에피소드의 핵심 메시지는 이것이다. AI는 혼자서 무언가를 만들 수 있게 해주지만, 엔지니어링, 디자인, 분석, 다른 직군과 협업할 때 한 사람과 그 사람의 로컬 머신을 넘어 작동하는 시스템을 전달할 수 있다.

#### How to AI UXR Map

이 시리즈는 *How to AI UXR* map에서 공유된 인사이트를 기반으로 한다. 이 5페이지짜리 맵은 주요 트렌드를 도식화하고, 자신의 AI 성숙도 수준을 파악할 수 있게 도우며, 각자의 리서치 시스템에 적용하거나 변형할 수 있는 실용적인 실제 적용 사례를 제안한다.

[맵 다운로드](https://www.theresearchopsreview.com/i/198184716/download-the-map)

이번 에피소드에서 다루는 내용은 다음과 같다.

- DoorDash가 개인의 AI 실험을 공유 리서치 인프라로 전환한 방법
- agentic research system을 리서처, 디자이너, 프로덕트 매니저가 사용할 수 있게 만들기 위해 필요한 것
- 유용한 AI skill이 왜 prompt보다 운영 절차에 더 가까운지
- 리서치 저장소, 회사 시스템, Slack의 내부 지식이 리서치 계획 수립을 어떻게 형성할 수 있는지
- Markdown, reference file, Python script, 결정론적 코드가 LLM 출력을 더 신뢰 가능하게 만드는 이유
- 리서처가 다른 일을 계속하는 동안 AI가 Qualtrics 설문을 프로그래밍할 수 있는 방식과, 여전히 사람의 검토가 필요한 지점
- AI skill을 공유하고 업데이트하기 위한 사내 “skills marketplace”가 채택, 유지보수, 공유 표준을 어떻게 지원하는지
- 엔지니어링, 디자인, 분석, 정량 리서치와의 협업이 가능성을 어떻게 바꿨는지
- Nam이 인내를 강조하는 이유: agent를 가르치고, 동료와 함께 테스트하고, 어디서 실패하는지 관찰하며, 시스템을 지속적·협력적으로 개선해야 한다는 점

에피소드 중간에는 리서처들이 탐색하고 사용하는 도구를 만드는 리더로서 Strella의 공동창업자 겸 COO인 [Priya Krishnan](https://www.linkedin.com/in/priya-krishnan-7/)이 대화에 대한 자신의 관점을 공유한다.

# 언급된 것들

- [Cursor](https://cursor.com/): AI coding agent
- [Claude Code](https://claude.com/product/claude-code): 또 다른 AI coding agent
- [Glean](https://www.glean.com/): 업무용 AI 플랫폼
- **MCP(Model Context Protocol) connector**: AI agent가 외부 도구, 데이터베이스, 서드파티 애플리케이션에 안전하게 접근할 수 있도록 하는 범용 플러그앤플레이 소프트웨어 브리지
- **Markdown**: #, *, - 같은 간단한 기호로 문서를 구조화하는 가벼운 일반 텍스트 포맷 언어. AI와 관련해서는 인간의 의도와 기계 처리를 연결하고, LLM이 복잡한 정보를 계산 자원을 낭비하지 않고 쉽게 이해·정리·출력할 수 있게 한다.
- **Python**: 컴퓨터에 명확한 지시를 내리는 데 사용되는 프로그래밍 언어. 영어와 비슷한 단어를 기계가 이해하기 쉬운 형식으로 바꾸는 번역자처럼 작동한다.
- **SQL(Structured Query Language)**: 관계형 데이터베이스와 소통하고, 관리하고, 데이터를 검색하는 데 쓰이는 표준화된 프로그래밍 언어
- **AI harness**: 도구 실행, 메모리, 안전 가드레일 같은 주변 소프트웨어 인프라. AI 모델을 안전하게 제어하고, 여러 단계의 과업을 자율적으로 실행할 수 있게 한다.
- **AI coding hook**: AI assistant의 워크플로 특정 지점에서 실행되는 자동화된 사용자 정의 script. 가드레일을 적용하거나, 테스트를 실행하거나, 코드를 포맷할 수 있다.
- **Agent journaling**: AI coding agent가 내부 추론, 도구 실행, 단계별 진행 상황에 대한 연속적이고 상세한 로그를 유지하는 과정. 개발자가 의사결정과 워크플로를 감사, 디버깅, 이해할 수 있게 돕는다.
- **Skill chaining**: AI agent가 여러 특정 기능이나 도구를 순차적으로 연결하는 과정. 한 행동의 출력을 다음 행동의 입력으로 사용해 복잡한 다단계 목표를 달성한다.

# 게스트 연결

- [Nam Pham](https://www.linkedin.com/in/namph/), DoorDash Senior Researcher
- [Priya Krishnan](https://www.linkedin.com/in/priya-krishnan-7/), Strella cofounder and COO

---

*How to AI UXR*은 Strella의 지원을 받는다. Strella는 AI 기반 고객 리서치 플랫폼으로, 질문에서 실행 가능한 인사이트까지 몇 시간 안에 도달할 수 있도록 인터뷰 구축, 진행, 종합을 돕는다.
