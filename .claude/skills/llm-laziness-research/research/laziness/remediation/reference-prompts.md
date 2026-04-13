# Reference Prompts

Ready-to-use prompt templates for enforcing complete outputs. Append to any prompt or include in system instructions.

---

## General Purpose

```
You must provide the FULL, complete, and exhaustive output for this task.
Do not summarize, abbreviate, or truncate for brevity.

You are strictly forbidden from using placeholders. Never use comments like
"// ... rest of code here", "[continue here]", or bare ellipses standing
in for omitted content. If the output is 500 lines, produce all 500 lines.

If you approach your output limit, stop at a clean breakpoint and indicate
where to resume. Do not rush to a conclusion or compress remaining sections.
```

---

## Code Generation

```
Write the complete, production-ready implementation. Every function, every
import, every edge case handler must be present in the output.

Do not use placeholder comments (// TODO, // implement here, // similar
to above). Do not describe what code should do — write the actual code.

If you need multiple files, produce each file in full. If repetition is
unavoidable, write it anyway. Completeness over concision.
```

---

## Document / Analysis

```
Produce the full document. Do not use section stubs, placeholder headings,
or "expand as needed" markers. Every section listed in the outline must be
written out completely.

If you are unsure whether to include a section, include it. Completeness
is more important than precision about scope.
```

---

## Multi-Part Tasks

```
This task has [N] parts. Complete each part in full before moving to the next.
Do not acknowledge parts without completing them. Do not write "Part 2 would
cover..." — write Part 2.

After completing all parts, do a completeness check: list each part and
confirm it was fully addressed. If any part is incomplete, complete it now.
```

---

## Stakes Framing (EmotionPrompt technique)

```
This is a high-stakes task that requires your full attention and complete output.
Take a deep breath. Work through this step by step. Do not skip any steps.
The quality and completeness of your output is critical.
```
