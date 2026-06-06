---
title: "SkillOpt 프로젝트 페이지: 자기 진화 에이전트 스킬을 위한 실행 전략"
original_title: "SkillOpt | Executive Strategy for Self-Evolving Agent Skills"
source: "https://microsoft.github.io/SkillOpt/"
repository: "https://github.com/microsoft/SkillOpt"
paper: "https://arxiv.org/abs/2605.23904"
video: "https://youtu.be/JUBMDTCiM0M"
related_project: "https://microsoft.github.io/SkillLens/"
author: "Microsoft Research"
scraped_at: "2026-06-06T08:17:20Z"
language: "ko"
translation_note: "영어 프로젝트 웹페이지를 한국어로 번역해 저장함"
tags:
  - source
  - Microsoft Research
  - SkillOpt
  - AI Agents
  - Agent Skills
  - Skill Optimization
  - Prompt Optimization
---

# SkillOpt 프로젝트 페이지: 자기 진화 에이전트 스킬을 위한 실행 전략

- **원문:** [https://microsoft.github.io/SkillOpt/](https://microsoft.github.io/SkillOpt/)
- **Code Repo:** [https://github.com/microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)
- **Paper:** [https://arxiv.org/abs/2605.23904](https://arxiv.org/abs/2605.23904)
- **Video:** [https://youtu.be/JUBMDTCiM0M](https://youtu.be/JUBMDTCiM0M)
- **Related project:** [SkillLens](https://microsoft.github.io/SkillLens/)
- **관련 논문 번역 노트:** [[2605.23904 SkillOpt - Self-Evolving Agent Skills - 한국어 번역]]

---

## Frozen agent를 위한 text-space optimization

# SkillOpt

**자기 진화 에이전트 스킬을 위한 실행 전략.** SkillOpt는 compact한 natural-language skill document를 frozen language agent의 trainable state로 취급한다. 그런 다음 rollout, reflection, bounded edit, held-out validation gate를 통해 그 문서를 학습한다.

- [Core Idea](#core-idea)
- [Method](#method)
- [Results](#main-results)
- [Code Repo](https://github.com/microsoft/SkillOpt)
- [Paper](https://arxiv.org/abs/2605.23904)
- [Video](https://youtu.be/JUBMDTCiM0M)

관련 프로젝트인 **[SkillLens](https://microsoft.github.io/SkillLens/)**는 model-generated agent skill을 연구하는 Microsoft Research의 companion project page다.

## 주요 수치

- **Main result:** 52/52
  - 모든 model × benchmark 및 harness × benchmark setting에서 최고 또는 공동 최고.
- **Target models:** 7
- **Benchmarks:** 6
- **Harnesses:** Codex + Claude Code

## Project Video

### SkillOpt in motion

SkillOpt가 natural-language skill을 trainable artifact로 다루는 방식을 짧게 시각적으로 설명한다. 핵심 흐름은 다음과 같다.

1. roll out
2. reflect
3. edit
4. validate
5. export

- **Video:** [https://youtu.be/JUBMDTCiM0M](https://youtu.be/JUBMDTCiM0M)

## Paper Teaser

### 핵심 루프 한눈에 보기

Teaser는 SkillOpt training loop를 요약한다.

- rollout evidence
- optimizer-side reflection
- bounded skill edits
- validation gating
- exported reusable skill

![SkillOpt teaser figure](https://microsoft.github.io/SkillOpt/skillopt-assets/teaser-1.png)

논문 figure는 target model, optimizer model, bounded edits, validation gate, exported best skill의 관계를 보여준다.

---

# 01 / Core Idea

## Weight가 아니라 procedure를 훈련하라

SkillOpt는 skill document 자체를 optimization target으로 만든다. target model, backend, harness는 고정되어 있고, evidence gathering, tool use, verification, output formatting을 안내하는 procedure가 진화한다.

### Skill은 agent의 external state다

Model을 fine-tuning하거나 prompt를 수동으로 유지보수하는 대신, SkillOpt는 frozen agent를 scored batch 위에서 실행한다. 별도의 optimizer model은 structured edit을 제안하고, validation performance가 개선될 때에만 candidate를 accept한다.

핵심 구성요소:

- **Frozen target model**
- **Optimizer model**
- **Add / delete / replace edits**
- **Held-out gate**

SkillOpt의 기본 단계:

- **Rollout:** target model이 current skill로 task를 실행하고 scored trajectory를 기록한다.
- **Reflect:** optimizer가 success/failure minibatch를 분석해 reusable procedure를 찾는다.
- **Edit:** candidate add/delete/replace operation을 merge하고 budget 아래 rank한다.
- **Gate:** candidate skill은 held-out selection performance를 개선할 때에만 유지된다.

---

# 02 / Method

## Natural-language skill을 위한 training loop

이 루프는 의도적으로 learning algorithm을 닮았다. Rollout evidence는 forward pass처럼 작동하고, reflection은 language-level backward pass처럼 작동하며, textual learning rate는 skill이 한 번에 얼마나 멀리 움직일 수 있는지를 제한한다.

### Evidence

Rollout batch는 messages, tool calls, verifier feedback, task metadata, final scores를 포착한다.

### Minibatches

Failure와 success를 따로 reflection한다. 이렇게 하면 edit이 반복 오류를 교정하면서도 이미 작동하는 behavior를 보존할 수 있다.

### Bounded Edits

Edit budget은 textual learning rate처럼 작동한다. 넓은 rewrite가 유용한 rule을 덮어쓰지 못하게 하면서, 새 procedure를 학습할 만큼의 plasticity는 유지한다.

### Memory

Rejected edits, slow update, optimizer-side meta skill은 deployment artifact를 불필요하게 부풀리지 않으면서 longer-horizon feedback을 제공한다.

![SkillOpt pipeline](https://microsoft.github.io/SkillOpt/skillopt-assets/pipeline-1.png)

Pipeline은 frozen target model이 current skill로 실행하고, optimizer model이 bounded edit을 제안하며, held-out validation이 candidate를 new current skill로 만들지 결정하는 과정을 보여준다.

---

# 03 / Main Results

## SkillOpt는 GPT와 Qwen target model을 개선한다

웹페이지의 main-result table은 target model과 execution harness 전반에서 no-skill execution과 final SkillOpt skill의 held-out test split gain을 비교한다.

- **GPT-5.5 / Direct chat:** 평균 +23.5
  - SearchQA +9.6
  - Sheet +38.9
  - Office +39.0
  - DocVQA +12.4
  - LiveMath +29.3
  - ALFWorld +11.9
- **GPT-5.4 / Direct chat:** 평균 +12.8
- **GPT-5.4-mini / Direct chat:** 평균 +12.7
- **GPT-5.4-nano / Direct chat:** 평균 +24.9
- **GPT-5.2 / Direct chat:** 평균 +16.6
- **Qwen3.5-4B / Direct chat:** 평균 +19.2
- **Qwen3.6-35B-A3B / Direct chat:** 평균 +9.1
- **GPT-5.5 / Codex:** 평균 +21.8
- **GPT-5.5 / Claude Code:** 평균 +18.6

### Method comparison

SkillOpt는 모든 benchmark에서 가장 강한 baseline을 넘어선다.

---

# 04 / Ablations

## Control들이 실제로 작동한다

논문은 skill learning을 안정적으로 만드는 optimizer component를 분리해 검증한다.

- 충분한 evidence
- bounded textual update
- rejected-edit feedback
- slow update
- optimizer-side memory

Ablation 결과 예시:

- **Learning rate / lr=4 default:** SearchQA 87.1, Spreadsheet 77.5, LiveMath 61.3
- **Learning rate / without lr:** SearchQA 84.6, Spreadsheet 75.7, LiveMath 57.3
- **Rejected buffer / with buffer:** SearchQA 87.1, Spreadsheet 77.5, LiveMath 61.3
- **Rejected buffer / without buffer:** SearchQA 85.5, Spreadsheet 72.9, LiveMath 58.9
- **Update memory / meta skill + slow update:** SearchQA 87.1, Spreadsheet 77.5, LiveMath 61.3
- **Update memory / without both:** SearchQA 86.3, Spreadsheet 55.0, LiveMath 59.7

### Ablation이 말하는 것

**Bounded.** Textual learning rate는 destructive rewrite를 막으면서 새 procedure를 배울 만큼의 plasticity를 유지한다.

**Gated.** Held-out selection은 reflection을 unconditional self-editing이 아니라 propose-and-test optimization으로 바꾼다.

**Buffered.** Rejected edit은 negative feedback이 되어 optimizer가 harmful direction을 반복하지 않게 돕는다.

![Epoch checkpoint trends](https://microsoft.github.io/SkillOpt/skillopt-assets/epoch-trends-1.png)

Epoch checkpoint trend는 selection-best checkpoint를 train rollout score 및 unseen test performance와 비교한다.

---

# 05 / Skill Evolution

## Typical run은 failure를 concrete operating rule로 바꾼다

ALFWorld run은 GPT-5.4-mini를 frozen target model로, GPT-5.5를 optimizer model로 사용한다. Plot은 train rollout과 held-out selection score를 추적하며, 각 stage에서 제안된 skill edit을 inspect할 수 있다.

### ALFWorld train-selection evolution

- Selection score는 68.6%에서 81.4%로 상승한다.
- Rejected edit은 downward candidate point로 보인다.
- Accepted edit은 held-out selection이 개선될 때에만 current skill이 된다.
- Step 3은 slow update로 rescued된다.
- Step 4는 train score는 높지만 selection에서 실패한다.

### Epoch 3 slow update

- **Train rollout:** 80.0%
- **Selection gate:** 81.4%

Longitudinal comparison은 regression 없이 세 가지 개선을 발견했고, 더 넓은 search-memory update가 new best skill이 되었다.

Slow update의 예:

- generic target receptacle instance를 valid로 count하라.
- strict numbered searched set을 유지하고, 이미 관찰한 location을 다시 확인하지 말라.
- 한 location type에서 여러 번 실패하면 search를 넓혀라.

### Run setup

- Target model: GPT-5.4-mini
- Optimizer model: GPT-5.5
- 시작점: compact ALFWorld instruction file
- 방식: text space에서 edit

### Selection rule

Candidate edit은 held-out selection이 current best score를 개선할 때에만 accept된다.

### Outcome

Selected skill은 final ALFWorld test hard score를 70.9%에서 85.8%로 개선했다.

---

# 06 / Transfer

## Exported skill은 reusable artifact처럼 동작한다

SkillOpt는 compact한 `best_skill.md`를 export한다. 논문은 이 artifact가 추가 target-side optimization 없이 model size, execution harness, nearby benchmark 사이에서 transfer되는지 테스트한다.

- **Cross-model:** +15.2
  - GPT-5.4 LiveMath skill이 GPT-5.4-nano의 LiveMathBench로 transfer됨.
- **Cross-harness:** +31.8
  - Codex-trained SpreadsheetBench skill이 Claude Code로 transfer됨.
- **Self-optimizer:** +10.4
  - GPT-5.4-nano가 자기 자신을 optimizer로 사용해 SpreadsheetBench baseline 대비 개선.
- **Deployment:** 1 file
  - target model은 final skill만 consume하며, optimizer memory는 사용하지 않는다.

강한 optimizer model은 가장 큰 gain을 제공하지만, 이 loop가 단순히 더 강한 model에서 약한 model로 distillation하는 것만은 아니다. Matched target-as-optimizer setting에서도 update가 constrained, buffered, validated될 때 유용한 edit을 발견할 수 있다.

---

# 07 / BibTeX

SkillOpt가 유용하다면 arXiv preprint를 인용하라.

```bibtex
@misc{yang2026skilloptexecutivestrategyselfevolving,
      title={SkillOpt: Executive Strategy for Self-Evolving Agent Skills}, 
      author={Yifan Yang and Ziyang Gong and Weiquan Huang and Qihao Yang and Ziwei Zhou and Zisu Huang and Yan Li and Xuemei Gao and Qi Dai and Bei Liu and Kai Qiu and Yuqing Yang and Dongdong Chen and Xue Yang and Chong Luo},
      year={2026},
      eprint={2605.23904},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2605.23904}, 
}
```
