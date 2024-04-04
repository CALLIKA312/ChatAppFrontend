import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SignupRequestPayload} from "./signup/signup-request.payload";
import {Observable, throwError} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {LoginRequestPayload} from "./login/login-request.payload";
import {LoginResponse} from "./login/login-response.payload";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/api/auth';

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() username: EventEmitter<string> = new EventEmitter<string>();


  constructor(private httpClient: HttpClient, private router: Router, private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('userId', data.userId);
      this.loggedIn.emit(true);
      return true;
    }));
  }

  logout() {
    this.httpClient.post(this.baseUrl + '/logout',{responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
  }


  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
