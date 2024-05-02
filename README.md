# llm-agent

The llm-agent is a TypeScript project designed to facilitate interactions with language models from multiple providers. It supports various LLM API providers that are compatible with the OpenAI API structure, allowing users to manage chat interactions and tool calls effectively.

## Features

- **Provider Flexibility**: Supports multiple providers, including OpenAI, Mistral, Together, and Groq, with a variety of models available.
- **Flexible Configuration**: Customize the behavior of the agent with different models, temperature settings, and predefined system prompts.
- **Message Management**: Maintain a history of chat messages to provide context for consecutive interactions.
- **Tool Call Handling**: Process and respond to tool calls embedded within chat completions.

## Available Providers

The agent can be configured to use various providers that offer API compatibility. Each provider requires specific environment variables to be set:

- **Together**: Requires `TOGETHERAI_API_KEY`.
- **Mistral**: Requires `MISTRAL_API_KEY`.
- **Groq**: Requires `GROQ_API_KEY`.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

```bash
npm install llm-agent
```

## Usage

Import and use the `Agent` class within your TypeScript projects to interact with various language models. Configure the agent as needed for your specific requirements, utilizing a range of APIs from different providers.

```typescript
const agent = new Agent({
  provider: Provider.Groq,
  model: chatModels[Provider.Groq][0] as string,
  temperature: 0.0,
  systemPrompt: "You are a helpful assistant.",
  tools,
  config,
});

(async () => {
  while (true) {
    const input = await ask(">>>");
    const response = await agent.send(input);
    console.log(response);
  }
})();
```
