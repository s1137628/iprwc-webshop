import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  email: string = '';
  password: string = '';
  newEmail: string = '';
  newPassword: string =  '';
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private loginService: LoginService, private fb: FormBuilder) {}

  ngOnInit(){
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    const credentials = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.loginService.login(credentials);
  }

  onRegister() {
    this.loginService.register(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(() => {
      });
  }
  
}
