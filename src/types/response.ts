export interface ChatResponse {
  choices: {
    finish_reason: string;
    index: number;
    message: {
      content: string;
      role: "user" | "assistant" | "system" | "function";
    };
  }[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface Message {
  role: "system" | "user" | "assistant" | "function";
  content: string;
}
