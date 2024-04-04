import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { WebsocketService } from "../websocket.service";
import { MessageRequestPayload } from "./message-request.payload"
import { Observable, Subject, throwError } from "rxjs";
import { MessageResponsePayload } from "./message-response.payload";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatResponse } from './chat-response.payload';
import { environment } from '../../environments/environment';


@Injectable()
export class ChatService {

  private baseUrl =  environment.apiUrl + '/api';

  public messages: MessageResponsePayload[] = [];
  public chat!: ChatResponse;

  constructor(private httpClient: HttpClient, private router: Router, private websocketService: WebsocketService) {
  }

  loadMessagesByChat(chatId: number): Observable<MessageResponsePayload[]> {
    const body = {
      chatId: chatId
    }
    return this.httpClient.post<MessageResponsePayload[]>(this.baseUrl + '/message/loadMessagesByChat', body);
  }


  loadChatById(chatId: number): Observable<ChatResponse> {
    const body = {
      chatId: chatId
    }
    return this.httpClient.post<ChatResponse>(this.baseUrl + '/chat/loadChatById', body);
  }

  sendMessage(mrp: MessageRequestPayload) {
    console.log("message send " + mrp.content);
    return this.httpClient.post(this.baseUrl + '/message/sendMessage', mrp, { responseType: 'text' });
  }

  


}
