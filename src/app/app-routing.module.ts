import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { EmailConfirmComponent } from './auth/components/email-confirm/email-confirm.component';
import { StudyGroupSearchComponent } from './study-group/study-group-search/study-group-search.component';
import { PasswordRecoveryComponent } from './auth/components/password-recovery/password-recovery.component';
import { authGuard, loggedInGuard } from './core/security/guard/auth.guard';

const routes: Routes = [
  { path: 'password-recovery', component: PasswordRecoveryComponent, canActivate: [loggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
  // prettier-ignore
  { path: 'register', component: RegisterComponent, canActivate: [loggedInGuard]},
  // prettier-ignore
  { path: 'confirm', component: EmailConfirmComponent, canActivate: [loggedInGuard] },
  {
    path: '',
    canActivate: [authGuard],
    children: [{ path: 'search', component: StudyGroupSearchComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
