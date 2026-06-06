---
title: "SkillOpt 프로젝트 페이지: frozen agent를 위한 skill optimization"
original_title: "SkillOpt | Executive Strategy for Self-Evolving Agent Skills"
source: "https://microsoft.github.io/SkillOpt/"
repository: "https://github.com/microsoft/SkillOpt"
paper: "https://arxiv.org/abs/2605.23904"
video: "https://youtu.be/JUBMDTCiM0M"
author: "Microsoft Research"
scraped_at: "2026-06-06T08:17:20Z"
language: "ko"
original_note: "[[SkillOpt Project Page - 한국어 번역]]"
related_notes:
  - "[[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]"
  - "[[SkillOpt - 에이전트 스킬을 최적화하는 텍스트 공간 옵티마이저]]"
tags:
  - summary
  - SkillOpt
  - AI Agents
  - Agent Skills
  - Skill Optimization
  - Microsoft Research
---

# SkillOpt 프로젝트 페이지: frozen agent를 위한 skill optimization

- **번역 원문:** [[SkillOpt Project Page - 한국어 번역]]
- **관련 논문 번역:** [[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]
- **관련 논문 요약:** [[SkillOpt - 에이전트 스킬을 최적화하는 텍스트 공간 옵티마이저]]
- **웹 링크:** [https://microsoft.github.io/SkillOpt/](https://microsoft.github.io/SkillOpt/)
- **GitHub:** [https://github.com/microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)
- **Paper:** [https://arxiv.org/abs/2605.23904](https://arxiv.org/abs/2605.23904)
- **Video:** [https://youtu.be/JUBMDTCiM0M](https://youtu.be/JUBMDTCiM0M)

## 한 줄 요약

SkillOpt 프로젝트 페이지는 논문의 핵심을 시각적으로 압축해, `skill.md`를 frozen agent의 **훈련 가능한 외부 절차 상태**로 보고 rollout → reflection → bounded edit → validation gate → export로 개선하는 방법을 설명한다.

## 논문 노트와의 차이

이 페이지는 arXiv 논문보다 훨씬 짧고, 다음을 빠르게 보여주는 landing page 성격이다.

- 핵심 아이디어
- SkillOpt loop
- 주요 결과 수치
- ablation이 보여주는 control의 역할
- ALFWorld skill evolution 예시
- transfer 결과
- code/paper/video 링크

자세한 방법론과 실험 해석은 [[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]와 [[SkillOpt - 에이전트 스킬을 최적화하는 텍스트 공간 옵티마이저]]에 더 많이 정리되어 있다.

## 페이지 구조

1. **Hero / Main result**
   - 52/52 setting에서 best or tied-best.
   - 7개 target model, 6개 benchmark, Codex + Claude Code harness.
2. **Core Idea**
   - weight가 아니라 procedure를 훈련한다.
   - skill은 agent의 external state다.
3. **Method**
   - rollout evidence, minibatch reflection, bounded edit, rejected edit memory.
4. **Main Results**
   - GPT/Qwen model과 direct chat, Codex, Claude Code에서 gain 제시.
5. **Ablations**
   - learning rate, rejected buffer, update memory가 실제로 성능 안정화에 기여함.
6. **Skill Evolution**
   - ALFWorld에서 failure가 concrete operating rule로 바뀌는 과정.
7. **Transfer**
   - exported `best_skill.md`가 model/harness/benchmark를 넘어 재사용 가능함.
8. **Citation**
   - arXiv BibTeX.

## 핵심 관찰

### 1. “Train the procedure, not the weights”가 페이지 전체의 중심 문장

프로젝트 페이지는 SkillOpt를 fine-tuning 대안으로 포지셔닝한다. Target model과 harness는 고정하고, evidence gathering, tool use, verification, output formatting을 담당하는 절차 문서만 개선한다.

### 2. Landing page는 SkillOpt의 작동 방식을 더 직관적으로 보여준다

논문은 수식과 실험을 자세히 다루지만, 이 페이지는 네 단계로 기억하기 좋게 정리한다.

- Rollout
- Reflect
- Edit
- Gate

여기에 final `best_skill.md` export가 붙는다.

### 3. Ablation 메시지가 명확하다

SkillOpt는 “LLM에게 알아서 skill을 고치게 하는 것”이 아니다. 안정성을 만드는 control들이 중요하다.

- bounded edit이 destructive rewrite를 막음
- held-out gate가 drift를 막음
- rejected buffer가 negative feedback을 제공함
- slow/meta update가 장기 교훈을 보존함

### 4. Skill evolution 예시가 실무적으로 유용하다

ALFWorld 예시는 skill edit이 추상적 조언이 아니라 concrete operating rule로 바뀐다는 것을 보여준다.

예:

- 이미 본 location을 다시 확인하지 말라.
- numbered searched set을 유지하라.
- 한 location type에서 반복 실패하면 search를 넓혀라.

이런 rule은 코딩 agent, 리서치 agent, 파일 작업 agent에도 그대로 응용할 수 있다.

### 5. 배포 단위는 결국 “1 file”이다

Transfer section의 중요한 메시지는 target model이 optimizer memory를 소비하지 않는다는 점이다. 배포되는 것은 compact한 `best_skill.md` 하나다. 따라서 training cost는 offline에서 지불하고, runtime에는 skill 문서만 붙이면 된다.

## 실무 적용 예시

### 예시 1. Obsidian 링크 수집 skill 개선

현재 반복 작업인 “링크 수집 → 한국어 번역 원문 → 한국어 요약 → Obsidian 저장”도 SkillOpt식으로 관리할 수 있다.

- 실패 trajectory: 원문 일부 누락, 영어가 남음, folder naming 불일치
- success trajectory: metadata/frontmatter가 잘 들어간 사례
- edit: skill에 “영어 source는 preserved source도 한국어로 번역” 같은 bounded rule 추가
- gate: 저장된 note checklist를 통과할 때만 accept

### 예시 2. 코딩 agent skill 개선

테스트 실패 수정에서 자주 반복되는 failure mode를 모아 skill을 작게 업데이트한다.

- tool output을 안 읽고 추측함
- test를 일부만 실행함
- formatting/lint를 마지막에 확인하지 않음

각 failure에 대해 skill.md에 1~3개 bounded edit만 추가하고, held-out task에서 성공률이 오를 때만 반영한다.

### 예시 3. Research agent의 citation discipline 개선

리서치 요약 agent가 source-grounding을 자주 놓치면 다음 rule을 skill에 추가할 수 있다.

- claim을 쓰기 전에 source span을 먼저 bind한다.
- citation 없는 강한 주장 금지.
- contradictory evidence section을 반드시 확인.
- validation set에서 citation accuracy가 좋아질 때만 accept.

## 체크리스트

- skill을 하나의 compact 문서로 정의했는가?
- target model과 harness를 고정했는가?
- scored rollout을 저장할 수 있는가?
- success/failure minibatch를 분리할 수 있는가?
- edit budget이 있는가?
- held-out validation gate가 있는가?
- rejected edit을 negative feedback으로 보존하는가?
- slow/meta update처럼 장기 교훈을 보존하는 장치가 있는가?
- 최종 artifact가 `best_skill.md` 같은 1개 파일로 배포되는가?

## 바로 써먹을 수 있는 프롬프트

### 1. SkillOpt식 skill update 제안

```text
아래 success/failure trajectory 묶음을 보고, 현재 skill.md에 적용할 bounded edit을 제안해줘.
조건:
- add/delete/replace 중 하나로 표현
- 최대 3개 edit
- 특정 사례 이름을 넣지 말고 재사용 가능한 procedure로 작성
- 각 edit의 validation 기준 포함
```

### 2. Rejected edit을 negative feedback으로 바꾸기

```text
아래 rejected edit과 score drop 기록을 보고, 다음 update에서 피해야 할 harmful direction을 정리해줘.
금지 규칙, 주의 규칙, 대체 edit 방향으로 나눠줘.
```

### 3. Skill deployment audit

```text
아래 final skill.md를 audit해줘.
1) 너무 specific해서 overfit된 rule
2) 서로 충돌하는 rule
3) 배포 시 위험한 tool-use rule
4) 더 짧게 합칠 수 있는 rule
5) validation metric으로 추적해야 할 behavior
를 표시해줘.
```

## 주의점 / 한계

- 프로젝트 페이지는 논문 요약 landing page라서 방법론 상세와 실험 세부는 arXiv 논문을 봐야 한다.
- 수치 일부는 웹페이지의 summary table 기준이며, 논문 본문 table과 세부 aggregation 방식이 다를 수 있다.
- SkillOpt는 offline training cost가 필요하다.
- validation split이 실제 배포 환경을 대표하지 못하면 skill이 잘못 최적화될 수 있다.
- 자동 생성 skill은 compact해도 사람이 audit해야 한다.

## 관련 개념

- [[SkillOpt]]
- [[Agent Skills]]
- [[AI Agents]]
- [[Prompt Optimization]]
- [[Skill Optimization]]
- [[Codex]]
- [[Claude Code]]
- [[Evaluation]]
- [[Human-in-the-loop]]
- [[Tool Use]]

## 연결된 노트

- 원문/번역 원문: [[SkillOpt Project Page - 한국어 번역]]
  - 원문 파일 경로: `Sources/AI & Automation/SkillOpt Project Page - 한국어 번역.md`
- 같은 주제의 관련 요약:
  - [[SkillOpt - 에이전트 스킬을 최적화하는 텍스트 공간 옵티마이저]]

