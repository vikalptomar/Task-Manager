import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  url = `${environment.domainUrl}api/user`;

  constructor(private http: HttpClient,private common:CommonService) {}

  isLogin(){

    const token=this.common.getCookie('token');
    if(token.length>0){
      return true
    }

    return false
  }

  signup(data: any) {
    return this.http.post(`${this.url}/signup`, data);
  }

  login(data:any){
    return this.http.post(`${this.url}/login`, data);
  }
}
