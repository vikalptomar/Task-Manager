import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private common: CommonService, private router: Router) {}

  ngOnInit(): void {
    if (this.common.getCookie('token')) {
      this.router.navigate(['/task']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
