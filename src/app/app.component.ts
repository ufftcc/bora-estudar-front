import { ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { AuthService } from './core/security/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserResponseBasicDto } from './shared/models/user/user-response-basic-dto';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        MatToolbar,
        MatIconButton,
        MatIcon,
        MatSidenavContainer,
        MatSidenav,
        MatNavList,
        MatListItem,
        RouterLink,
        MatSidenavContent,
        RouterOutlet,
    ],
})
export class AppComponent implements OnInit {
  title = 'bora-estudar-front';
  isLoggedIn = false;
  user: UserResponseBasicDto | undefined = undefined;
  @ViewChild('snav') sidenav!: MatSidenav;
  showBackIcon = false;
  appName: string = 'Bora Estudar UFF';

  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    console.log('App component');
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges();
    });

    this.router.events.subscribe(() => {
      this.showBackIcon = this.router.url !== '/search';

      if(this.router.url === '/create'){
        this.appName = 'Criar Grupo';
      } else {
        this.appName = 'Bora Estudar UFF';
      }
    });
  }

  public logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
        this.close();
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

  navigateToSearch(): void {
    this.router.navigate(['/search']);
  }

  close(){
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
