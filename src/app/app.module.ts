import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/helpers/http.interceptor';
import { LoginComponent } from './auth/components/login/login.component';
import { EmailConfirmComponent } from './auth/components/email-confirm/email-confirm.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatCardModule } from '@angular/material/card';
import { StudyGroupSearchBarComponent } from './study-group/study-group-search-bar/study-group-search.component';
import { StudyGroupFilterDialogComponent } from './study-group/study-group-filter-dialog/study-group-filter-dialog.component';
import { StudyGroupSearchListComponent } from './study-group/study-group-search-list/study-group-search-list.component';
import { StudyGroupSearchItemComponent } from './study-group/study-group-search-item/study-group-search-item.component';
import { SharedModule } from './shared/shared.module';
import { StudyGroupDetailComponent } from './study-group/study-group-detail/study-group-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EmailConfirmComponent,
    StudyGroupSearchBarComponent,
    StudyGroupFilterDialogComponent,
    StudyGroupSearchListComponent,
    StudyGroupSearchItemComponent,
    StudyGroupDetailComponent,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    SharedModule,
  ],
})
export class AppModule {}
