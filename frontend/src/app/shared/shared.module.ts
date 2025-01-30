import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumComponent } from './components/breadcrum/breadcrum.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [MainHeaderComponent, MainFooterComponent, BreadcrumComponent],
  imports: [CommonModule, NgbModule, RouterModule, FormsModule, NgToastModule],
  exports: [MainFooterComponent, MainHeaderComponent, BreadcrumComponent],
})
export class SharedModule {}
