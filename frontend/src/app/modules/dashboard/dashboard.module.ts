import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { TaskbyIdComponent } from './taskby-id/taskby-id.component';
import { SearchPipe } from 'src/app/common/pipe/search.pipe';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    TaskbyIdComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    NgToastModule,
    NgbModule,
    FormsModule,
  ],
})
export class DashboardModule {}
