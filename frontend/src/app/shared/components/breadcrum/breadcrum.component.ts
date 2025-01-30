import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {

  constructor(private common:CommonService) { }
  @Input() title = '';
  @Input() url = '';
  @Input() parentsTitle = ''
  isLoggedIn:boolean=false;
  ngOnInit(): void {
    if(this.common.getCookie('token')){
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }

}
