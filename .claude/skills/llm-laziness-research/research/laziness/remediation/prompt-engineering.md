# Prompt Engineering Techniques

## Psychological Pattern Matching

LLMs do not have emotions or understand monetary incentives. However, specific linguistic patterns in the prompt activate different quality distributions in the model's latent space. Research has documented measurable effects:

| Technique | Documented Effect |
|:---|:---|
| "I will tip you $200 for a perfect solution" | Up to 45% increase in output quality and length |
| "Take a deep breath and solve step by step" | Accuracy improvement from 34% to 80% on logic tasks |
| "This task is critical to my career" | Average 10% performance increase |

These phrases work because they are statistically correlated with high-effort, rigorously reviewed content in the training data (academic papers, enterprise codebases, legal documents). The attention mechanism prioritizes the high-quality data distributions associated with these patterns.

## Explicit Syntax Binding

Conversational requests allow the model to exercise discretion about output length and detail. Structural binding removes this discretion by explicitly prohibiting truncation patterns.

Effective binding requires two components:

1. **Mandatory tool execution:** Forbid the model from generating answers solely from training weights. Require it to execute search, computation, or code before answering.
2. **Evidence blocks:** Require the model to output raw data (URLs, code execution results, data fragments) before producing its narrative response. This forces the model to read its own retrieved evidence, reducing hallucination probability to near zero.

## XML-Structured Prompts

Enterprise systems use strict XML tagging to separate prompt components:

1. **System instructions** — Persona definition, quality expectations, explicit prohibitions on filler content.
2. **Context block** (`<context>`) — Passive background data: architecture details, configurations, existing code.
3. **Data block** (`<data>`, `<logs>`, `<config>`) — Active information the model must process against the context.

## Verification Loops

After the model produces output, append a verification instruction:

```
Review your output. Identify any sections where you used placeholders,
ellipses, or "similar to above" shortcuts. Rewrite those sections
with complete, production-ready content.
```

This metacognitive step catches the most common truncation patterns before the response reaches the user.
