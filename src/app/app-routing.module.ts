import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ChatListComponent } from "./chatList/chatList.component";
import { ChatComponent } from "./chat/chat.component"
import { AuthGuard } from './auth/guard/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chats', component: ChatListComponent, canActivate: [AuthGuard] },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: '/chats' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
