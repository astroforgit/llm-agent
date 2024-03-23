import { Provider } from "../src/types";
import { Agent } from "../src/agent";
import { chatModels } from "../src/models";
import { tools, config } from "./tools";
import { ask } from "../src/utils";

const agent = new Agent({
  provider: Provider.OpenAI,
  model: chatModels[Provider.OpenAI][0] as string,
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
