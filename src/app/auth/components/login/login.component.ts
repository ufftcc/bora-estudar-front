import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/security/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninBody } from '../../models/signin-body';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatAnchor } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatSnackBarModule,
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

  private snackBar = inject(MatSnackBar);

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

    const body: SigninBody = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.authService.login(body).subscribe({
      next: (data: any) => {
        console.error('login', data);
        const idUsuario = data.id.toString();
        localStorage.setItem('idUsuario', idUsuario);
        let isDiscordAssociate = data.isDiscordAssociate;
        console.error('isDiscordAssociate', isDiscordAssociate);
        // this.router.navigateByUrl('/search');

        if (isDiscordAssociate === true) {
          this.router.navigateByUrl('/search');
        } else {
          this.router.navigateByUrl('/associate');
        }
      },
      error: (error) => {
        this.snackBar.open('Email ou Senha inválidos!', 'X', {
          duration: 4000
        });
      },
    });
  }
}
