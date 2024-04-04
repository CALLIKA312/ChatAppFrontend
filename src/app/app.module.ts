import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RouterModule } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { TokenInterceptor } from './auth/token-interceptor';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


import { WebsocketService } from "./websocket.service";
import { ChatService } from "./chat/chat.service";

import { AppComponent } from './app.component';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ChatListComponent } from './chatList/chatList.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { ModalComponent } from './header/modal/modal.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatListComponent,
    HeaderComponent,
    ChatComponent,
    ModalComponent,
    UserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,



    RouterModule.forRoot([
      { path: 'login', component: LoginComponent }
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ChatService,
    WebsocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
