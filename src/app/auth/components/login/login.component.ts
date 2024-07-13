import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/security/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninBody } from '../../models/signin-body';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatAnchor } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatAnchor,
        RouterLink,
    ],
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
