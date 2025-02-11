import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = false;
  constructor(private common: CommonService) {}
  getTheme() {


    let theme = this.common.getCookie('theme');

    if (theme && theme == 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('darkMode');
      document.body.classList.remove('lightMode');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.body.classList.add('lightMode');
      document.body.classList.remove('darkMode');
    }
  }
  setTheme(darkMode: boolean) {

    //let currentTheme = document.documentElement.getAttribute('data-bs-theme');
    if (darkMode) {
      this.common.setCookie('theme', 'dark', 1000);
    } else {
      this.common.setCookie('theme', 'light', 1000);
    }
    this, this.getTheme();
  }
}
