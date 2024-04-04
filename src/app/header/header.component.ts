import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ToastrService } from 'ngx-toastr'
import { Router } from "@angular/router";
import { ModalService } from './modal/modal.service';
import { ChatListService } from '../chatList/chat-list.service';
import { throwError } from 'rxjs';
import { ShortUserResponsePayload } from '../chatList/shortUser-response.payload';
import { LocalStorageService } from "ngx-webstorage";
import { ChatRequest } from '../chat/chat-request.payload';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent {


  userId!: number;
  chatRequest: ChatRequest;
  users: ShortUserResponsePayload[] = [];
  selectedUser: ShortUserResponsePayload | undefined;

  ngOnInit(): void {
    this.chatListService.loadUsers().subscribe(data => {
      console.log("Load short users list");
      this.users = data;
    }, error => {
      throwError(error);
    });
  }

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService, protected modalService: ModalService,
    private chatListService: ChatListService, private localStorage: LocalStorageService,
  ) {
    this.chatRequest = {
      fromUserId: 0,
      targetUserId: 0
    }
  }

  user() {
    this.router.navigateByUrl('/user');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.toastr.success('Logout Successful');
  };


  startChat() {
    this.userId = this.localStorage.retrieve('userId');
    this.chatRequest.fromUserId = this.userId;
    if (this.selectedUser !== undefined) {
      this.chatRequest.targetUserId = this.selectedUser?.userId;
      this.chatListService.startChat(this.chatRequest).subscribe(data => {
        this.router.navigate(['/chat', data.chatId]);
      });
    } else {
      this.toastr.error('Need to choose target user first');
    }
  }


  selectUser(userId: number, username: string): void {
    for (let index = 0; index < this.users.length; index++) {
      if (userId === this.users[index].userId) {
        this.selectedUser = this.users[index];
        break;
      }
    }
  }

  resetSelection() {
    this.selectedUser = undefined;
  }

  areAllUsersSelected(): boolean {
    return this.selectedUser === undefined;
  }


}
