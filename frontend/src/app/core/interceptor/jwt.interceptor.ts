import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { UserAuthService } from '../services/user/user-auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private common: CommonService,
    private authService: UserAuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.common.getCookie('token');
    if (authToken) {
      const modifiedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
