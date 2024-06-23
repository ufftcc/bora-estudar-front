import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/security/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninBody } from '../../models/signin-body';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  protected loginForm!: FormGroup;
  protected errorMessage = '';
  // isLoggedIn$ = this.authService.isLoggedIn();
  constructor() {}

  ngOnInit(): void {
    // this.authService.isLoggedIn().subscribe((isLogged) => {
    //   this.isLoggedIn$ = isLogged;
    // });

    // if (this.isLoggedIn) {
    //   this.router.navigateByUrl('/search');
    // }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    console.log('Login', this.loginForm.value);

    const body: SigninBody = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.authService.login(body).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/search');
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
      },
    });
  }
}
