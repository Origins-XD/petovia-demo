# Architectural Patterns

## Lazy-Loaded Skills

The standard pattern for managing large context requirements across AI agents is lazy-loaded prompt engineering through skill files.

A skill is a folder containing a `SKILL.md` file with:

- **YAML front-matter:** Contains `name` and a precise `description`. This metadata acts as the discovery hook — the agent reads only this during initialization (~100 tokens per skill).
- **Markdown body:** Full workflows, rules, and instructions. Loaded on-demand only when the agent determines the skill is relevant.

This architecture yields a documented 35% reduction in average context usage and prevents context dilution.

Discovery reliability depends on the specificity of the YAML description:

| Description Quality | Discovery Success Rate |
|:---|:---:|
| Vague ("Helps with designing APIs") | ~68% |
| Specific ("Design RESTful HTTP APIs with OpenAPI specs, focusing on versioning, error codes, and backward compatibility") | ~90% |

## Model Context Protocol (MCP)

MCP is an open standard (pioneered by Anthropic, adopted by Google and OpenAI) that enables real-time, bidirectional connections between LLMs and external data sources.

### Architecture Components

- **Host:** The AI application (IDE, terminal tool, chatbot) containing the LLM engine.
- **Client:** Internal bridge within the host that handles protocol communication.
- **Server:** External service exposing databases, APIs, or documentation to the client.
- **Transport:** JSON-RPC 2.0 messages over stdio (local) or HTTP (remote).

### How It Reduces Truncation

MCP replaces context-window stuffing with on-demand retrieval. Instead of loading entire codebases, documentation sets, or database schemas into the prompt, the model queries only what it needs via MCP tools. This keeps the working context lean and eliminates the preemptive compression that occurs when models sense they are approaching output limits.

## Developer Platform vs Consumer Interface

Always prefer API/developer access over consumer interfaces for tasks requiring complete outputs:

| Access Type | Truncation Risk | Notes |
|------------|----------------|-------|
| Consumer UI (ChatGPT, Gemini) | HIGH | Middleware adds software truncation |
| API direct access | LOW | Full context window, no hidden limits |
| AI Studio / Playground | LOW | Full parameter control |
