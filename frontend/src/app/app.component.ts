import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from './core/services/theme/theme.service';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  constructor(
    private router: Router,
    private theme: ThemeService,
    private common: CommonService
  ) {
    window.scroll(0, 0);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        let checkTheme = this.common.getCookie('theme');

        if (checkTheme == null) {
          theme.setTheme(false);
        }
        theme.getTheme();
      }
    });
  }
}
