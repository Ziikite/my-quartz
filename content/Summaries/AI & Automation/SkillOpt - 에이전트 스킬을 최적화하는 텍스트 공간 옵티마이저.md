---
title: "SkillOpt: 에이전트 스킬을 최적화하는 텍스트 공간 옵티마이저"
original_title: "SkillOpt: Executive Strategy for Self-Evolving Agent Skills"
source: "https://arxiv.org/abs/2605.23904"
pdf: "https://arxiv.org/pdf/2605.23904v2"
arxiv_id: "2605.23904v2"
author: "Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang, Ziwei Zhou, Zisu Huang, Yan Li, Xuemei Gao, Qi Dai, Bei Liu, Kai Qiu, Yuqing Yang, Dongdong Chen, Xue Yang, Chong Luo"
publish_date: "2026-05-22"
updated_at: "2026-05-25"
scraped_at: "2026-06-06T08:13:24Z"
language: "ko"
original_note: "[[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]"
tags:
  - summary
  - AI Agents
  - Agent Skills
  - Skill Optimization
  - Prompt Optimization
  - LLM Evaluation
  - Codex
  - Claude Code
---

# SkillOpt: 에이전트 스킬을 최적화하는 텍스트 공간 옵티마이저

- **번역 원문:** [[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]
- **arXiv:** [https://arxiv.org/abs/2605.23904](https://arxiv.org/abs/2605.23904)
- **PDF:** [https://arxiv.org/pdf/2605.23904v2](https://arxiv.org/pdf/2605.23904v2)
- **코드:** [https://aka.ms/SkillOpt](https://aka.ms/SkillOpt)
- **저자:** Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang, Ziwei Zhou, Zisu Huang, Yan Li, Xuemei Gao, Qi Dai, Bei Liu, Kai Qiu, Yuqing Yang, Dongdong Chen, Xue Yang, Chong Luo

## 한 줄 요약

SkillOpt는 에이전트의 `skill.md`를 prompt처럼 한 번 쓰고 끝내는 것이 아니라, rollout feedback, bounded edit, validation gate, rejected-edit memory로 **훈련 가능한 외부 상태**처럼 최적화하는 방법이다.

## 핵심 주장

논문은 agent skill을 “사람이 작성하는 instruction 문서”가 아니라 **frozen agent를 domain에 적응시키는 trainable text artifact**로 본다. Weight update 없이도, skill 문서를 체계적으로 최적화하면 direct chat, Codex, Claude Code 같은 실행 환경에서 큰 성능 향상을 얻을 수 있다는 것이 핵심이다.

## 왜 중요한가

에이전트 성능은 모델 능력만이 아니라 다음 절차에 크게 좌우된다.

- 어떤 evidence를 먼저 찾는가
- tool result를 어떻게 검증하는가
- domain convention을 어떻게 따르는가
- output format을 얼마나 정확히 맞추는가
- 실패를 반복하지 않도록 어떤 state를 유지하는가

SkillOpt는 이런 절차적 지식을 compact한 skill 문서로 학습한다. 따라서 모델을 fine-tuning하지 않고도 agent behavior를 개선할 수 있다.

## SkillOpt 루프

1. **현재 skill로 rollout 실행**
   - target model은 frozen 상태.
   - benchmark task를 실행하고 trajectory와 score를 기록한다.
2. **success/failure minibatch reflection**
   - failure에서 correction rule을 찾고, success에서 보존할 behavior를 찾는다.
3. **bounded add/delete/replace edit 생성**
   - optimizer model이 skill 문서에 대한 제한된 edit을 제안한다.
4. **textual learning rate 적용**
   - 한 step에서 적용 가능한 edit 수를 제한한다.
5. **held-out validation gate**
   - selection split 점수가 엄격히 개선될 때만 edit을 accept한다.
6. **rejected-edit buffer 저장**
   - 실패한 edit과 score drop을 negative feedback으로 사용한다.
7. **slow/meta update**
   - epoch 단위로 장기적으로 안정적인 교훈을 보존한다.
8. **best_skill.md export**
   - 배포 시에는 static skill 문서만 사용한다. 추가 optimizer call은 없다.

## 주요 결과

- 6개 benchmark, 7개 target model, 3개 execution harness에서 평가.
- 총 52개 (model, benchmark, harness) cell에서 SkillOpt가 전부 최고 또는 공동 최고.
- GPT-5.5 direct chat 평균:
  - no skill: 58.8
  - SkillOpt: 82.3
  - 절대 개선: +23.5 point
- GPT-5.5 Codex harness: no skill 대비 +24.8 point
- GPT-5.5 Claude Code harness: no skill 대비 +19.1 point
- per-cell best baseline을 oracle처럼 고른 경우보다도 direct chat에서 +5.4 point 높음.

### GPT-5.5 direct chat benchmark별 개선

- SearchQA: 77.7 → 87.3
- SpreadsheetBench: 41.8 → 80.7
- OfficeQA: 33.1 → 72.1
- DocVQA: 78.8 → 91.2
- LiveMathematicianBench: 37.6 → 66.9
- ALFWorld: 83.6 → 95.5

## 핵심 관찰

### 1. Skill은 prompt보다 “절차적 메모리”에 가깝다

일반 prompt optimization은 문장 자체를 더 잘 쓰는 데 초점이 있다. SkillOpt의 skill은 더 구체적으로 다음을 담는다.

- tool 사용 규칙
- evidence binding 방식
- output formatting 규칙
- domain-specific failure mode
- 반복 실패를 피하는 state management

### 2. Validation gate가 중요하다

LLM이 제안하는 edit은 그럴듯해 보여도 실제 성능을 떨어뜨릴 수 있다. SkillOpt는 selection split에서 엄격히 개선될 때만 edit을 받아들인다. 이 때문에 self-revision이 drift하거나 overfit되는 문제를 줄인다.

### 3. Rejected edit도 학습 자산이다

거절된 edit은 버려지지 않는다. 어떤 edit이 왜 성능을 떨어뜨렸는지를 다음 reflection에 제공해, optimizer가 같은 실수를 반복하지 않게 한다.

### 4. 작은 skill이 큰 효과를 낸다

최종 skill은 379~1,995 token 정도로 작았다. Accepted edit도 benchmark당 1~4개에 불과했다. 즉 성능 향상은 거대한 instruction 덩어리가 아니라, 핵심적인 procedural rule 몇 개에서 나온다.

### 5. Transfer가 가능하다

Codex에서 훈련한 SpreadsheetBench skill이 Claude Code에서 +59.7 point gain을 냈고, 반대 방향도 +43.6 point를 보였다. 이는 skill이 특정 harness command만 외운 것이 아니라 workbook-level procedure 같은 더 일반적인 절차를 학습했음을 시사한다.

## 실무 적용 예시

### 예시 1. 반복 업무용 Hermes/Codex/Claude Code skill 개선

어떤 코딩 에이전트가 테스트 수정 작업에서 자주 실패한다고 하자.

SkillOpt식 접근:

- 실패한 trajectory와 성공한 trajectory를 모은다.
- 실패 패턴을 minibatch 단위로 묶는다.
- skill 문서에 작은 edit만 제안한다.
- held-out task에서 통과율이 오를 때만 반영한다.
- 거절된 edit은 “하지 말아야 할 수정”으로 기록한다.

### 예시 2. Spreadsheet/문서 QA workflow 최적화

스프레드시트 작업에서 모델이 formula dependency를 놓치거나 target range 일부만 수정한다면, skill은 다음과 같은 rule을 학습할 수 있다.

- workbook structure를 먼저 inspect하라.
- formula와 dependent cell을 확인하라.
- recalculation에 기대지 말고 static evaluated value를 적어라.
- 요청된 target range 전체를 검증하라.

### 예시 3. 리서치/문서 요약 agent skill 개선

리서치 agent가 source citation을 자주 누락한다면, SkillOpt식 edit은 다음을 추가할 수 있다.

- claim마다 source span을 먼저 bind한다.
- summary 전에 contradictory evidence를 확인한다.
- final answer에서 citation 없는 단정문을 금지한다.
- validation set에서 hallucination score가 개선될 때만 accept한다.

## 도입 체크리스트

- 최적화할 skill이 하나의 compact 문서로 정의되어 있는가?
- train / selection / test split을 분리했는가?
- rollout trajectory와 scalar score를 기록할 수 있는가?
- failure와 success를 나눠 reflection할 수 있는가?
- edit을 add/delete/replace처럼 bounded operation으로 제한했는가?
- selection score가 개선될 때만 accept하는 gate가 있는가?
- rejected edit을 negative feedback으로 보존하는가?
- 최종 artifact가 사람이 읽고 audit할 수 있을 만큼 작은가?
- 배포 시 추가 optimizer call 없이 static skill만 사용할 수 있는가?

## 바로 써먹을 수 있는 프롬프트

### 1. 실패 trajectory에서 skill edit 뽑기

```text
아래 실패 trajectory들을 보고, 특정 사례에만 맞는 해결책이 아니라 반복 가능한 절차적 규칙을 찾아줘.
기존 skill.md에 추가/삭제/교체할 edit을 각각 제안하되, 최대 3개 edit만 제안해줘.
각 edit마다 기대 효과와 overfit 위험을 함께 써줘.
```

### 2. 성공 trajectory에서 보존할 rule 찾기

```text
아래 성공 trajectory들에서 공통적으로 작동한 행동을 찾아줘.
기존 skill에서 반드시 보존해야 할 절차, output format, verification step을 bullet로 정리해줘.
```

### 3. Candidate skill validation review

```text
아래 candidate skill edit이 validation task에서 성능을 올릴 가능성과 위험을 평가해줘.
- 어떤 failure mode를 해결하는가?
- 기존에 잘 작동하던 behavior를 망가뜨릴 가능성은?
- 더 작은 bounded edit으로 바꿀 수 있는가?
- held-out validation에서 확인해야 할 metric은?
```

### 4. Rejected edit buffer 요약

```text
아래 rejected edit 목록과 score drop을 보고, 반복해서 피해야 할 edit pattern을 정리해줘.
다음 skill update에서 금지하거나 주의해야 할 규칙으로 바꿔줘.
```

## 주의점 / 한계

- SkillOpt는 offline rollout과 optimizer call 비용이 든다.
- Selection split이 deployment distribution을 대표하지 못하면 잘못된 skill을 고를 수 있다.
- Benchmark에서는 잘 작동해도 production workflow에는 privacy, permission, audit, governance가 추가로 필요하다.
- Strong optimizer가 있으면 성능이 더 좋지만, access와 비용 문제가 있다.
- Skill이 작고 읽을 수 있어도, 자동 생성된 rule은 사람이 검토해야 한다.
- Transfer가 가능하더라도 모든 domain/harness에 무조건 안전하게 일반화된다고 보면 안 된다.

## 내 작업에 적용할 아이디어

- Obsidian web-link ingestion skill도 반복 실패 사례를 모아 SkillOpt식으로 개선할 수 있다.
- “영어 링크는 한국어 번역 원문 + 한국어 요약” 같은 사용자 preference를 skill의 explicit rule로 넣고 validation할 수 있다.
- 코딩 에이전트용 skill은 테스트 실패 trajectory를 모아 small bounded edit으로 개선하는 방식이 적합하다.
- 중요한 점은 한 번에 skill을 크게 rewrite하지 말고, 작은 edit → held-out validation → accept/reject 흐름을 만드는 것이다.

## 관련 개념

- [[AI Agents]]
- [[Agent Skills]]
- [[Prompt Optimization]]
- [[Skill Optimization]]
- [[Codex]]
- [[Claude Code]]
- [[Evaluation]]
- [[Human-in-the-loop]]
- [[Tool Use]]
- [[LLM Evaluation]]

## 연결된 노트

- 원문/번역 원문: [[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]
- 같은 주제의 관련 요약:
  - [[SkillOpt 프로젝트 페이지 - frozen agent를 위한 skill optimization]]
