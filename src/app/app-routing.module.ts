import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { EmailConfirmComponent } from './auth/components/email-confirm/email-confirm.component';
import { StudyGroupSearchBarComponent } from './study-group/study-group-search-bar/study-group-search.component';
import { PasswordRecoveryComponent } from './auth/components/password-recovery/password-recovery.component';
import { authGuard, discordAssociateGuard, loggedInGuard } from './core/security/guard/auth.guard';
import { StudyGroupDetailComponent } from './study-group/study-group-detail/study-group-detail.component';
import { StudyCreateGroupComponent } from './study-group/study-create-group/study-create-group.component';
import { MyStudyGroupComponent } from './study-group/my-study-group/my-study-group.component';
import { StudyUpdateGroupComponent } from './study-group/study-update-group/study-update-group.component';
import { StudyGroupAssociateComponent } from './study-group/study-group-associate/study-group-associate.component';

const routes: Routes = [
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    canActivate: [loggedInGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
  // prettier-ignore
  { path: 'register', component: RegisterComponent, canActivate: [loggedInGuard]},
  // prettier-ignore
  { path: 'confirm', component: EmailConfirmComponent, canActivate: [loggedInGuard] },
  {
    path: '',
    component: LoginComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'search', component: StudyGroupSearchBarComponent },
      { path: 'create', component: StudyCreateGroupComponent },
      { path: 'detail/:groupId', component: StudyGroupDetailComponent },
      { path: 'my-study-group', component: MyStudyGroupComponent },
      { path: 'edit', component: StudyUpdateGroupComponent },
      { path: 'associate', component: StudyGroupAssociateComponent },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
