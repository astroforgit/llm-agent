import { Provider } from "../src/types";
import { Agent } from "../src/agent";
import { chatModels } from "../src/models";
import { tools, config } from "./tools";
import { ask } from "../src/utils";

const agent = new Agent({
  provider: Provider.Groq,
  model: chatModels[Provider.Groq][0] as string,
  temperature: 0.0,
  systemPrompt: "You are a helpful assistant.",
  tools,
  config,
  type:"chat"
});

const agentgrap = new Agent({
  provider: Provider.Together,
  model: chatModels[Provider.Together][3] as string,
  temperature: 0.0,
  systemPrompt: "You are a helpful assistant.",
  tools,
  config,
  type:"image",
});

(async () => {
  while (true) {
    const input = await ask(">>>");
    debugger;
    await agentgrap.sendimg("girl dancing in the rain");
    const response = await agent.send(input);
    console.log("resss:",response);
  }
})();
