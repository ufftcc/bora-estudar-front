import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/security/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class EmailConfirmComponent implements OnInit {
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        this.authService.confirmEmail(token).subscribe(
         {
          next: (data) => {
            console.log('data');
            console.log(data);

            this.message = data;

            if (data.toLowerCase().includes('confirmado')) {
              setTimeout(() => this.router.navigate(['/login']), 5000);
            }
          },
          error: (err) => {

            console.log('erro porque?');
            console.error(err);
            this.message =
              'Confirmation failed. The link might be expired or invalid.';
          },
        });
      } else {
        this.message = 'Invalid confirmation link.';
      }
    });
  }
}
