import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from './user.service';
import { UserResponsePayload } from './user-response.payload';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordRequestPayload } from "./changePassword-request.payload";
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: UserResponsePayload | undefined;
  username: String = "";
  userForm: FormGroup;

  changePassReq: ChangePasswordRequestPayload;
  private token: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService,
    private router: Router, private userService: UserService,
    private fb: FormBuilder, private localStorage: LocalStorageService,) {

    this.userForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordsMatchValidator });

    this.changePassReq = {
      token: '',
      password: ''
    }
  }


  ngOnInit() {
    this.userService.loadUser().subscribe(data => {
      console.log("User data load successful");
      this.user = data;
    }, error => {
      throwError(error);
    })
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsNotMatch: true };
  }

  changePassword() {
    if (this.userForm.valid) {
      const newPassword = this.userForm.get('newPassword')?.value;
      // this.token = this.localStorage.retrieve('authenticationToken');
      // this.changePassReq.token = this.token;
      // this.changePassReq.password = newPassword;
      this.userService.changePassword(newPassword).subscribe(data =>{
        console.log('Changing password to:', newPassword);
        this.logout();
      }, error => {
        throwError(error);
      }
      );
      
    } else {
      console.log('Invalid form');
    }
  }

  home() {
    this.router.navigateByUrl('/chats');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.toastr.success('Logout Successful');
  };
}
