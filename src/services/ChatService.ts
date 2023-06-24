import { ChatResponse, Message } from "@/types/response";

export class ChatService {
  endpoint: string;
  baseUrl: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.baseUrl = process.env.NEXT_PUBLIC_OPENAI_ENDPOINT as string;
  }

  async getMessage(messageContext: Message[]) {
    try {
      const res = await fetch(`${this.baseUrl}${this.endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messageContext,
        }),
      });
      console.log("request sent");

      if (!res.ok) {
        throw new Error(
          "Failed to get response from server. Please try again."
        );
      }
      const data: ChatResponse = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
