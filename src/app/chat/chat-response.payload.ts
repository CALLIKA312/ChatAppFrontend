import { MessageResponsePayload } from "./message-response.payload";

export interface ChatResponse {
    chatId: number;
    userIds: number[];
    usernames: string[];
    messages: MessageResponsePayload[];
  }
  