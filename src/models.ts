import { Provider } from "./types";

export const chatModels: Record<Provider, string[]> = {
  [Provider.OpenAI]: [
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo-1106",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-instruct",
    "gpt-4-0125-preview",
    "gpt-4-1106-preview",
    "gpt-4",
    "gpt-4-32k",
  ],
  [Provider.Mistral]: [
    "open-mistral-7b",
    "open-mistral-8x7b",
    "mistral-small",
    "mistral-medium",
    "mistral-large",
  ],
  [Provider.Together]: [
    "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "mistralai/Mistral-7B-Instruct-v0.1",
    "togethercomputer/CodeLlama-34b-Instruct",
  ],
  [Provider.Groq]: [
    "llama3-70b-8192",
    "llama3-8b-8192",
    "mixtral-8x7b-32768",
    "gemma-7b-it",
  ],
};
