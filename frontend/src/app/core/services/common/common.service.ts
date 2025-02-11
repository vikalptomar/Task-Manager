import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private Cookie: CookieService) {}
  public setCookie(key: string, value: string, expireTime: any) {
    this.Cookie.set(key, JSON.stringify(value), {
      expires: expireTime,
      path: '/',
      domain: environment.domain,
      sameSite: 'Lax',
    });
    return true;
  }

  public getCookie(key: any) {
    let value: any = this.Cookie.get(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  //public getCookie(key:any){
  //   let value: any=this.cookie
  // }

  public deleteCookie(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;  domain=${environment.domain}; path=/;`;
    // document.cookie = `${key}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=${environment.domain}; path=';`;
  }
}
