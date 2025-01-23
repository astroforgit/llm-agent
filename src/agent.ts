import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from "openai/resources";
import { Provider, Tools, ToolConfig } from "./types";
import { chat } from "./openai";

export class Agent {
  provider: Provider;
  model?: string;
  temperature: number;
  systemPrompt: string;
  historyLimit: number;
  config?: ToolConfig[];
  tools?: Tools;
  messages: ChatCompletionMessageParam[];
  type:string;

  constructor({
    provider,
    model = undefined,
    temperature = 0,
    systemPrompt,
    historyLimit = -1,
    config = undefined,
    tools = undefined,
    type = "chat",
  }: {
    provider: Provider;
    model?: string;
    temperature: number;
    systemPrompt: string;
    historyLimit?: number;
    config?: ToolConfig[];
    tools?: Tools;
    type:string;
  }) {
    this.type = type;
    this.provider = provider;
    this.model = model;
    this.temperature = temperature;
    this.systemPrompt = systemPrompt;
    this.historyLimit = historyLimit;
    this.config = config;
    this.tools = tools;
    this.messages = this.systemPrompt
      ? [{ role: "system", content: this.systemPrompt }]
      : [];
  }

  async processToolCalls(toolCalls: ChatCompletionMessageToolCall[]) {
    if (!toolCalls) {
      return;
    }
    for (const toolCall of toolCalls) {
      const tool = this.tools?.[toolCall.function.name];
      if (!tool) {
        throw new Error(`Tool ${toolCall.function.name} not found`);
      }
      const result = await tool(JSON.parse(toolCall.function.arguments));
      this.messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: result,
      });
    }
  }

  async sendimg(input: string): Promise<any> {
    const { message } = await chat(
      this.messages,
      this.config,
      this.provider,
      this.model
    );

    return message.content;
  }

  async send(input: string, skipInput = false): Promise<any> {
    if (!skipInput) {
      if (!input) {
        throw new Error("Input is required");
      }
      this.messages.push({ role: "user", content: input });
    }
    console.log("!!!",this.messages);

    const { message } = await chat(
      this.messages,
      this.config,
      this.provider,
      this.model
    );
    this.messages.push(message);
    if (message.tool_calls) {
      await this.processToolCalls(message.tool_calls);
      return await this.send("", true);
    }
    return message.content;
  }
}
