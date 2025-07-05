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
import { StudyGroupAssociateCallbackComponent } from './study-group/study-group-associate/study-group-associate-callback/study-group-associate-callback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'confirm',
    component: EmailConfirmComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'associate',
    children: [
      {
        path: 'callback',
        component: StudyGroupAssociateCallbackComponent,
        canActivate: [authGuard],
      },
      {
        path: '',
        component: StudyGroupAssociateComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'search',
    component: StudyGroupSearchBarComponent,
    canActivate: [authGuard, discordAssociateGuard],
  },
  {
    path: 'create',
    component: StudyCreateGroupComponent,
    canActivate: [authGuard, discordAssociateGuard],
  },
  {
    path: 'detail/:groupId',
    component: StudyGroupDetailComponent,
    canActivate: [authGuard, discordAssociateGuard],
  },
  {
    path: 'my-study-group',
    component: MyStudyGroupComponent,
    canActivate: [authGuard, discordAssociateGuard],
  },
  {
    path: 'edit',
    component: StudyUpdateGroupComponent,
    canActivate: [authGuard, discordAssociateGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
