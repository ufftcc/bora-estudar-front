import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/security/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupBody } from '../../models/signup-body';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatAnchor } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
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
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  protected signupForm!: FormGroup;
  protected errorMessage = '';
  isLoggedIn = false;
  constructor() {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLogged) => {
      this.isLoggedIn = isLogged;
    });

    // if (this.authService.isLoggedIn$.pipe()) {
    //   this.router.navigateByUrl('/search');
    // }

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.signupForm.valid) return;

    console.log('signup', this.signupForm.value);

    const body: SignupBody = {
      name: this.signupForm.controls['name'].value,
      email: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value,
    };

    this.authService.register(body).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  private onSuccess() {
    this.snackBar.open(
      'Registrado com sucesso! Por favor, acesse seu e-mail para confirmar sua conta.',
      '',
      { duration: 5000 }
    );
    this.signupForm.reset();
    this.router.navigateByUrl('/login');
  }

  private onError() {
    this.snackBar.open('Erro ao cadastrar.', '', { duration: 10000 });
  }

  private reloadPage(): void {
    window.location.reload();
  }
}
