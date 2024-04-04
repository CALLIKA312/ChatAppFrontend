import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { UserResponsePayload } from "./user-response.payload";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = environment.apiUrl + '/api/user';
    private token: string = '';

    constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
        

    }

    loadUser(): Observable<UserResponsePayload> {
        this.token = this.localStorage.retrieve('authenticationToken');
        const body = {
            token: 'Bearer ' + this.token
        }
        return this.httpClient.post<UserResponsePayload>(this.baseUrl + '/loadUser', body);
    }

    changePassword(password: string){
        this.token = this.localStorage.retrieve('authenticationToken');
        const body = {
            token: 'Bearer ' + this.token,
            password: password
        }       
        return this.httpClient.post(environment.apiUrl + '/api/auth/changePassword', body, { responseType: 'text' });

    }
}
