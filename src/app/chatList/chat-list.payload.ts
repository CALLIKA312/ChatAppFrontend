import {MessageResponsePayload} from "../chat/message-response.payload";

export interface ChatForMain {
  chatId: number;
  companionUsername: string;
  lastMessage: string;
  timestamp: Date;
}
