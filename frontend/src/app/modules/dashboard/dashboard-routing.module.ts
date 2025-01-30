import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard.component';
import { TaskbyIdComponent } from './taskby-id/taskby-id.component';
import { AuthguardGuard } from 'src/app/core/guards/authguard.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent, canActivate: [AuthguardGuard] },
      {
        path: ':id',
        component: TaskbyIdComponent,
        canActivate: [AuthguardGuard],
      },
      {
        path:'**',
        component:MainComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
