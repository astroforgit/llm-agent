import readline from "readline";
import { Provider } from "./types";

export const getConfig = (provider: Provider) => {
  if (provider === "together") {
    return {
      apiKey: process.env.TOGETHERAI_API_KEY,
      baseURL: "https://api.together.xyz/v1",
    };
  } else if (provider === "mistral") {
    return {
      apiKey: process.env.MISTRAL_API_KEY,
      baseURL: "https://api.mistral.ai/v1",
    };
  } else if (provider === "groq") {
    return {
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    };
  }
  return undefined;
};

let rl: readline.ReadLine | null = null;

export const ask = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    if (!rl) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
      });
    }

    if (!question.endsWith(" ")) {
      question += " ";
    }

    rl?.question(question, (answer) => {
      resolve(answer);
    });
  });
};
