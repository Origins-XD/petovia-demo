---
name: llm-laziness-research
description: Research on why LLMs produce incomplete outputs (truncation, placeholder code, skipped sections) and techniques to prevent it. Covers root causes (RLHF brevity bias, training data patterns, cognitive shortcuts), parameter tuning (temperature, top-p), prompt engineering (syntax binding, XML structure), architectural patterns (MCP, lazy-loaded skills), and ready-to-use prompt templates for enforcing complete outputs.
---

# LLM Output Truncation Research

A structured analysis of why large language models produce incomplete outputs, and documented methods to restore full-fidelity generation. All findings are drawn from controlled experiments, published studies, and field-tested engineering practices.

## Source

Research from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/tree/main/research) — background research that informed the skills in that project.

## Directory Structure

- [Root Causes](research/laziness/root-causes/) — Economic, architectural, and behavioral mechanisms driving truncation
- [Remediation](research/laziness/remediation/) — Documented techniques for overriding default truncation behavior
- [Findings](research/laziness/findings/) — Controlled experiment data and academic references

## Quick Anti-Truncation Reference

### Fastest Fix: Explicit Prompt Binding

Append to any prompt:

```
You must provide the FULL, complete, and exhaustive output for this task.
Do not summarize, abbreviate, or truncate for brevity.
You are strictly forbidden from using placeholders. Never use comments like
"// ... rest of code here", "[continue here]", or bare ellipses.
If the output is 500 lines, produce all 500 lines.
```

### Code Generation Enforcement

```
Write the complete, production-ready implementation. Every function, every
import, every edge case handler must be present in the output.
Do not use placeholder comments (// TODO, // implement here, // similar to above).
Do not describe what code should do — write the actual code.
```

### Key Findings Summary

| Root Cause | Mechanism | Fix |
|------------|-----------|-----|
| RLHF brevity bias | Models rewarded for short summaries | Explicit length demands in prompt |
| Training data patterns | Placeholder code in Stack Overflow / GitHub | Forbid placeholder syntax explicitly |
| Cognitive shortcuts | Models take shortcuts on "easy" tasks | Stakes framing ("critical to my career") |
| Consumer middleware | Apps add software truncation layer | Use API directly (not consumer UI) |
| Context window asymmetry | Output cap much smaller than input | Break work into chunks at clean breakpoints |

### Emotional/Stakes Framing (from EmotionPrompt research)

| Technique | Documented Effect |
|-----------|-------------------|
| "I will tip you $200 for a perfect solution" | Up to 45% increase in output quality |
| "Take a deep breath and solve step by step" | Accuracy improvement from 34% to 80% |
| "This task is critical to my career" | Average 10% performance increase |

### Skill File Architecture (prevents context dilution)

Skills with precise YAML descriptions are loaded on-demand, reducing context bloat:

| Description Quality | Discovery Success Rate |
|--------------------|----------------------|
| Vague | ~68% |
| Specific with keywords | ~90% |
