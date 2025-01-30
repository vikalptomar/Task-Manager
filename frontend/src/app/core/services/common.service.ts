import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private Cookie: CookieService) {}

  public setCookie(key: string, value: string, expireTime: any) {
    this.Cookie.set(
      key,
      JSON.stringify(value),
      expireTime,
      '/',
    );
    this.getCookie('token');
    return true;
  }

  // public setCookie(key: string, value: string) {

  //   this.Cookie.set(key, JSON.stringify(value));
  //   return true;
  // }

  public getCookie(key: any) {
    const value: any = this.Cookie.get(key);
    // try {
    //   return JSON.parse(value);
    // } catch (e) {
    //   return null;
    // }
    if (value.length > 0) {
   
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  public deleteCookie(key: string) {
    // document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;  domain='localhost'; path=/;`;
  }
}
