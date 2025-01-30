import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-main-header></app-main-header>
    <router-outlet></router-outlet>
    <app-main-footer></app-main-footer>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
