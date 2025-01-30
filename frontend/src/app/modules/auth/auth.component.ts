import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <app-auth-header></app-auth-header>
    <router-outlet></router-outlet>
    <app-auth-footer></app-auth-footer>
  `,
  styles: [],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
