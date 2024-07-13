import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AuthService } from './core/security/auth/auth.service';
import { Router } from '@angular/router';
import { UserResponseBasicDto } from './shared/models/user/user-response-basic-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  title = 'bora-estudar-front';
  isLoggedIn = false;
  user: UserResponseBasicDto | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    console.log('App component');
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges();
    });
  }

  public logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getUser() {
    this.authService.getUser().subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
