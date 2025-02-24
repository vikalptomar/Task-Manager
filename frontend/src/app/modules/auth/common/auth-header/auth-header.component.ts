import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
  isCollapsed = true;
  url: string = '';
  routerUrl: any;
  isDarkMode = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private common: CommonService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.url = ev.url;
      }
    });
  }

  ngOnInit(): void {
    let theme = this.common.getCookie('theme');
    if (theme && theme == 'dark') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
  }

  ngAfterContentInit() {
    this.url = this.router.url;
  }
  theme() {
    let theme = this.common.getCookie('theme');

    if (theme && theme == 'dark') {
      this.isDarkMode = false;
    } else {
      this.isDarkMode = true;
    }
    this.themeService.setTheme(this.isDarkMode);
  }
}
