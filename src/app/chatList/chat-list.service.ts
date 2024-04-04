import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";
import { Observable, Subject, throwError } from "rxjs";
import { ChatForMain } from "./chat-list.payload";
import { HttpHeaders } from '@angular/common/http';
import { ShortUserResponsePayload } from "./shortUser-response.payload"; 
import { ChatRequest } from "../chat/chat-request.payload";
import { ChatResponse } from "../chat/chat-response.payload";
import { environment } from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})

export class ChatListService {
  private baseUrl = environment.apiUrl + '/api/chat';
  private token: string = '';


  private chatUpdated = new Subject<void>();
  chatUpdated$ = this.chatUpdated.asObservable();
  updateChatList() {
    this.chatUpdated.next();
  }


  constructor(private httpClient: HttpClient, private router: Router,
     private localStorage: LocalStorageService) {
  }

  loadChatsByToken(): Observable<ChatForMain[]> {
    this.token = this.localStorage.retrieve('authenticationToken');
    const body = {
      token: 'Bearer ' + this.token
    }
    return this.httpClient.post<ChatForMain[]>(this.baseUrl + '/loadChatsByToken', body);
  }

  loadUsers(): Observable<ShortUserResponsePayload[]> {
    this.token = this.localStorage.retrieve('authenticationToken');
    const body = {
      token: 'Bearer ' + this.token
    }
    return this.httpClient.post<ShortUserResponsePayload[]>(environment.apiUrl + '/api/user/loadUsers', body);
  }

  startChat(chatRequest : ChatRequest): Observable<ChatResponse>{
    return this.httpClient.post<ChatResponse>(this.baseUrl + '/create', chatRequest);
  }

  deleteChat(id: number){
    return this.httpClient.post(this.baseUrl + '/delete', id);
  }


}
