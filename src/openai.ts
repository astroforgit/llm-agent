import OpenAI from "openai";
import { getConfig } from "./utils";
import { Provider } from "./types";
import { chatModels } from "./models";
import { ChatCompletion, ChatCompletionTool } from "openai/resources";
 

export async function chat(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  tools?: ChatCompletionTool[],
  provider = Provider.OpenAI,
  model?: string
): Promise<ChatCompletion.Choice> {
 
  console.log("_________",getConfig(provider))
  const client = new OpenAI(getConfig(provider));
  if (!model) {
    model = chatModels[provider][0] as string;
  }
  //if (chatModels[provider].indexOf(model) === -1) {
  //  throw new Error(`Model ${model} is not available for provider ${provider}`);
  //}

  const result = await client.chat.completions.create({
    model,
    messages,
    tools,
    tool_choice: tools ? "auto" : undefined,
  });

  return result.choices[0];
}
