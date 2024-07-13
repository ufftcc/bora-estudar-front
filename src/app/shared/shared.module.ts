import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
    imports: [CommonModule, AngularMaterialModule, HeaderComponent],
    exports: [HeaderComponent],
})
export class SharedModule {
}
