import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user/user-auth.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  errorMessage: boolean = false;
  message: any;
  loading: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private common: CommonService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}
  login() {
    if (
      this.loginForm.value.email !== '' &&
      this.loginForm.value.password !== ''
    ) {
      this.loading = true;
      this.userAuthService
        .login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe((val: any) => {

          this.loading = false;
          this.message = val.message;
          if (val.successCode === 1) {
            this.common.setCookie('token', val.accessToken, 10);
            this.router.navigate(['/task']);
          } else {
            this.errorMessage = true;
          }
        });
    } else {
      if (
        this.loginForm.value.email === '' &&
        this.loginForm.value.password === ''
      ) {
        this.message = 'Enter email and password';
        this.errorMessage = true;
      } else if (this.loginForm.value.email === '') {
        this.message = 'Enter email';
        this.errorMessage = true;
      } else if (this.loginForm.value.password === '') {
        this.message = 'Enter password';
        this.errorMessage = true;
      }
    }
  }
}
