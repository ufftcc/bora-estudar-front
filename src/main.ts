import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { SharedModule } from './app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AngularMaterialModule } from './app/angular-material.module';
import { AppRoutingModule } from './app/app-routing.module';
import { httpInterceptorProviders } from './app/core/helpers/http.interceptor';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, AngularMaterialModule, BrowserModule, FormsModule, ReactiveFormsModule, MatCardModule, SharedModule),
        httpInterceptorProviders,
        provideHttpClient(withInterceptorsFromDi()),
        provideNoopAnimations(),
    ]
})
  .catch(err => console.error(err));
