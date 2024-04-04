import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ChatListService } from "./chat-list.service";
import { CommonModule } from '@angular/common';
import { ChatForMain } from "./chat-list.payload";
import { Subscription, throwError } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';


@Component({
  selector: 'app-chats',
  templateUrl: 'chatList.component.html',
  styleUrls: ['chatList.component.css'],
})
export class ChatListComponent implements OnInit {

  public chats: ChatForMain[] = [];
  private subscription!: Subscription;

  constructor(private authService: AuthService, private chatListService: ChatListService, private commonModule: CommonModule) {
  }

  ngOnInit(): void {
    this.chatListService.loadChatsByToken().subscribe((data: any) => {
      this.chats = data;
    });
  }

  deleteChat(id: number) {
    let result = confirm("Delete chat?");
    if (result) {
      this.chatListService.deleteChat(id).subscribe(data => {
        console.log("Chat deleted");
        window.location.reload();
      }, error => {
        window.location.reload();
        throwError(error);
      });
    }
  }


  generateRandomColor(): string {
    const minValue = 218;
    const randomComponent = () => Math.floor(Math.random() * (255 - minValue + 1)) + minValue;
  
    const red = randomComponent();
    const green = randomComponent();
    const blue = randomComponent();
  
    return `rgb(${red}, ${green}, ${blue})`;
  }
  
}
