---
title: "규모 있는 깊이의 오류: AI 진행 인터뷰가 할 수 있는 것과 없는 것"
original_title: "The fallacy of depth at scale"
source: "https://saeidehbakhshi.substack.com/p/the-fallacy-of-depth-at-scale"
author: "Saeideh Bakhshi"
publication: "Research toolbox"
publish_date: "2026-05-28T13:52:19.471Z"
scraped_at: "2026-06-06T08:03:40Z"
language: "ko"
original_note: "[[2026-05-28 The fallacy of depth at scale - 한국어 번역]]"
tags:
  - summary
  - UX Research
  - AI-moderated interviews
  - Research Methods
  - Survey Methods
  - Quantitative UX Research
---

# 규모 있는 깊이의 오류: AI 진행 인터뷰가 할 수 있는 것과 없는 것

- **원문/번역본:** [[2026-05-28 The fallacy of depth at scale - 한국어 번역]]
- **웹 링크:** [https://saeidehbakhshi.substack.com/p/the-fallacy-of-depth-at-scale](https://saeidehbakhshi.substack.com/p/the-fallacy-of-depth-at-scale)
- **저자/출처:** Saeideh Bakhshi, *Research toolbox*

## 한 줄 요약

AI 진행 인터뷰는 “자발적으로 나온 언어에 규모 있게 후속 질문을 붙이는” 새로운 능력이지만, 설문이 제공하는 분모, 심층 인터뷰의 관찰, 사람 인터뷰어의 맥락 감지는 대체하지 못한다.

## 핵심 주장

리서치 방법론은 “싸고 얕은 것 ↔ 비싸고 깊은 것”이라는 하나의 선 위에 있지 않다. 각 방법은 서로 다른 primitive를 갖고 있고, 그 primitive가 답할 수 있는 질문을 결정한다. AI로 확장 가능해졌다고 해서 방법들이 서로 대체 가능해지는 것은 아니다.

## 네 가지 질문과 맞는 방법

- **얼마나 많이, 누구에게서?**
  - 적합한 방법: 설문
  - 이유: 고정된 도구와 분모가 있어 비율과 비교가 가능하다.
- **무슨 일이 어떤 순서로, 왜 일어났는가?**
  - 적합한 방법: 사람 진행 심층 인터뷰
  - 이유: 행동, 맥락, 순서, 체감 경험을 따라갈 수 있다.
- **우리가 생각하지 못한 이유는 무엇인가?**
  - 적합한 방법: 자유 응답 / open text
  - 이유: 사용자의 언어로 예상 밖의 이유를 드러낸다.
- **말한 이유 아래에 무엇이 있는가를 큰 규모에서 probing하고 싶은가?**
  - 적합한 방법: AI 진행 인터뷰
  - 이유: 자유 응답에 후속 질문을 붙여 discovery + disambiguation을 확장할 수 있다.

## 중요한 구분

### “풍부함”은 하나가 아니다

글은 사람들이 “depth”라고 부르는 것을 최소 여섯 가지로 나눈다.

- 데이터 포인트당 깊이
- 모달리티: 체크박스, 텍스트, 화면 관찰 등
- 적응성: 응답자에 맞춰 질문이 바뀌는가
- 구조화된 타당성: 측정값으로 읽을 수 있는가
- 표본 포괄성: 누가 데이터에 들어오는가
- 해석 통제: 의미가 어디서, 어떻게 만들어지는가

AI 진행 인터뷰는 depth와 adaptivity를 올릴 수 있지만, validity, inclusiveness, interpretation control을 자동으로 보장하지 않는다.

### 규모는 구조적 편향을 고치지 않는다

편향은 크게 두 종류다.

- **표본 문제:** 무응답, 유창성, 인지적 접근성, 동기, 자기선택, 도달 가능성
- **도구/해석 문제:** 응답 편향, 인터뷰어 효과, confabulation, 코딩 주관성, 응답 의존적 probing, verbosity bias, model-on-model synthesis

표본 편향은 데이터의 원천에 있고, 도구 편향은 처리 방식에 있다. 그래서 응답 수를 늘려도 오류가 평균적으로 상쇄되지 않는다. 천 건의 AI 진행 인터뷰는 여전히 분모를 만들지 못하고, 관찰되지 않은 행동을 보이게 만들지 못한다.

## 실무 적용 예시

### 예시 1. 이탈 이유 파악

팀이 “왜 사용자가 돌아오지 않는가?”를 묻는다면 먼저 질문을 쪼개야 한다.

- 가격, 경쟁 제품, 온보딩 문제의 비중을 알고 싶다 → 설문
- 이탈까지 어떤 사건이 이어졌는지 알고 싶다 → 심층 인터뷰
- 예상하지 못한 이탈 사유를 찾고 싶다 → 자유 응답 분석
- “더 이상 가치가 없다”는 말 아래 무엇이 있는지 규모 있게 캐고 싶다 → AI 진행 인터뷰

### 예시 2. AI 진행 인터뷰 결과를 읽을 때

AI 인터뷰에서 “1000명 중 다수가 가격을 언급했다”는 결과가 나왔다고 해서 가격 문제가 전체 이탈자의 유병률이라고 해석하면 안 된다.

확인해야 할 것:

- 응답한 사람은 누구인가?
- 짧게 답한 사람과 길게 답한 사람이 같은 깊이의 probing을 받았는가?
- 모델이 어떤 카테고리 정의와 프롬프트로 분류했는가?
- 원자료를 사람이 읽었는가?
- 관찰 행동 없이 말만으로 결론을 내리고 있지는 않은가?

### 예시 3. AI 인터뷰를 써도 되는 상황

- 자유 응답보다 한 단계 더 깊은 discovery가 필요할 때
- 많은 사람에게 동일한 probing policy를 적용하고 싶을 때
- stated reason을 명확히 하거나 분기별 패턴을 찾고 싶을 때
- 단, 측정값이 아니라 탐색적 자료로 사용할 때

### 예시 4. AI 인터뷰를 쓰면 위험한 상황

- “몇 퍼센트가 이 이유 때문에 이탈했는가?”를 답해야 할 때
- 실제 행동 관찰이 필요한 과업 흐름 문제
- 참가자가 말로 설명하기 어려운 경험
- high-stakes 의사결정에서 사람이 원자료를 읽지 않는 경우
- 모델이 수집한 데이터를 모델이 다시 요약하고, human review가 없는 경우

## 체크리스트

AI 진행 인터뷰를 도입하기 전에 확인할 질문:

- 지금 알고 싶은 것은 prevalence인가, mechanism인가, discovery인가?
- 분모가 필요한 질문을 AI 인터뷰로 답하려고 하고 있지 않은가?
- 짧게 답하는 참가자에게도 충분한 probing이 일어나도록 설계되어 있는가?
- 모델의 probing policy와 category definition을 감사할 수 있는가?
- model-on-model synthesis를 사람이 검토하는 단계가 있는가?
- 행동 관찰이 필요한 문제를 언어 데이터만으로 판단하고 있지 않은가?
- 결과를 “측정”이 아니라 “탐색”으로 명확히 라벨링하고 있는가?

## 바로 써먹을 수 있는 프롬프트

### 1. 방법 선택 프롬프트

```text
다음 리서치 질문을 prevalence, mechanism, hypothesis generation, discovery at scale 중 어디에 가까운지 분류해줘.
각 질문에 가장 적합한 방법론과, 그 방법으로 답할 수 없는 것을 함께 적어줘.
```

### 2. AI 인터뷰 결과 검토 프롬프트

```text
아래 AI-moderated interview 요약을 검토해줘.
1) 측정값처럼 해석하면 안 되는 주장
2) 표본 편향 가능성
3) probing policy 때문에 생겼을 수 있는 왜곡
4) 원자료 확인이 필요한 부분
5) 추가로 설문/심층 인터뷰/관찰이 필요한 질문
을 구분해서 표시해줘.
```

### 3. “분모 없음” 경고 프롬프트

```text
아래 자유 응답 또는 AI 인터뷰 분석에서 prevalence처럼 표현된 문장을 찾아줘.
각 문장을 탐색적 패턴 언어로 바꾸고, 실제 비율을 알기 위해 필요한 설문 설계를 제안해줘.
```

## 주의점 / 한계

- AI 진행 인터뷰는 자유 응답보다 깊을 수 있지만, 사람 인터뷰어가 알아차리는 망설임, 행동, 침묵, 맥락을 포착하지 못한다.
- 말 잘하는 참가자가 더 좋은 후속 질문을 받는 구조가 생길 수 있다.
- scale은 표본 편향과 도구 편향을 자동으로 해결하지 않는다.
- 모델이 수집한 전사본을 모델이 요약하면 fluent하고 central tendency에 가까운 결과로 수렴할 위험이 있다.
- “많이 언급됨”은 “많은 사람이 그 이유를 가짐”과 다르다.

## 관련 개념

- [[UX Research]]
- [[Research Methods]]
- [[Survey Methods]]
- [[AI-moderated interviews]]
- [[Qualitative Research]]
- [[Quantitative UX Research]]
- [[ResearchOps]]
- [[Human-in-the-loop]]
- [[Evaluation]]
