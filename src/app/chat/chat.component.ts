import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageResponsePayload } from './message-response.payload';
import { ChatService } from './chat.service';
import { ChatResponse } from './chat-response.payload';
import { MessageRequestPayload } from './message-request.payload';
import { Observable, Subject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.css'],
})
export class ChatComponent implements OnInit {
    value = '';
    mrp: MessageRequestPayload;
    chatId!: number;
    public messages: MessageResponsePayload[] = [];
    public companionUsername: String = "";
    public userId!: number;
    public chat!: ChatResponse;


    constructor(private authService: AuthService, private toastr: ToastrService,
        private activateRoute: ActivatedRoute, private chatService: ChatService, private router: Router, private localStorage: LocalStorageService) {
        this.mrp = {
            userId: 0,
            chatId: 0,
            content: ''
        };
    }

    home() {
        this.router.navigateByUrl('/chats');
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
        this.toastr.success('Logout Successful');
      };

    timeToString(timeStamp: Date): String {
        let s = "";
        s = + timeStamp.getHours + ":" + timeStamp.getMinutes + " " + timeStamp.getDay + "." + timeStamp.getMonth + "." + timeStamp.getFullYear;
        console.log(s);
        return s;
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            this.chatId = params['id']
        });
        this.userId = this.localStorage.retrieve('userId');

        this.chatService.loadChatById(this.chatId).subscribe(data => {
            console.log('Success load chat');
            this.chat = data;
            this.messages = data.messages;
            for (let i = 0; i < data.userIds.length; i++) {
                if (data.userIds[i] != this.userId) {
                    this.companionUsername = data.usernames[i];
                }
            }
        }, error => {
            throwError(error);
        });
    }


    sendMessage() {
        if(this.value === '' || this.value === ' ' || this.value === undefined) return;
        this.mrp.chatId = this.chatId;
        this.mrp.userId = this.userId;
        this.mrp.content = this.value;
        this.value = '';
        console.log(this.mrp);
        this.chatService.sendMessage(this.mrp).subscribe(data => {
            window.location.reload();
            //this.router.navigate(['/chat', this.chatId]);
        }, error => {
            console.log(error);
        });       

    };

}