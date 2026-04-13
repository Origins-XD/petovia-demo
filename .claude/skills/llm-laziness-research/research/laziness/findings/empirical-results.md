# Empirical Results

## 2025 Controlled Experiments

A controlled study published in December 2025 measured output truncation across several frontier models, including GPT-4 variants and DeepSeek. Three experiments were conducted:

### Experiment A: Multi-Part Instruction Compliance

Models were given complex prompts with multiple explicit requirements (formatting constraints, length requirements, mandatory sections). Results:

- No model fully satisfied both length requirements and all sub-part instructions natively
- Models frequently omitted mandatory output sections
- Required formatting constraints were routinely skipped
- Explicit length requirements were consistently undershot

### Experiment B: Decoding Suboptimality

Tested whether truncated outputs resulted from suboptimal token selection (the model "knowing" the right answer but selecting a worse token). Results:

- Limited evidence of decoding suboptimality on simple reasoning tasks
- The model's greedy, truncated output generally aligned with its highest-confidence solution
- **Truncation is a deliberate behavioral choice, not a decoding failure**

### Experiment C: Context Degradation

Tested whether models lose track of instructions during long, multi-turn conversations. Results:

- Surprising resilience against context degradation during 200-turn conversational tests
- Models maintained key facts and instructions significantly better than hypothesized
- **Context loss is not the primary cause of truncation**

## Key Takeaway

Truncation is an **alignment artifact** — a learned behavior from RLHF training — not a capability limitation. Models that truncate have the capability to produce complete outputs; they have simply been trained to prefer shorter ones. Overriding this requires explicit, structural prompt constraints.
