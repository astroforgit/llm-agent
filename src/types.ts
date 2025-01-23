export enum Provider {
  OpenAI = "openai",
  Together = "together",
  Mistral = "mistral",
  Groq = "groq",
   
}

export type ToolConfig = {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: {
        [key: string]: {
          type: string;
          description: string;
          items?: string[];
        };
      };
      required: string[];
    };
  };
};

export type Tools = {
  [key: string]: (params: any) => string | Promise<string>;
};
