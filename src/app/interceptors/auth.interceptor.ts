import { EncryptionService } from './../utilities/encryption.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import * as CryptoJS from 'crypto-js'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token:string;
  refreshToken:string;
  constructor(private authService:AuthService,private tokenService:TokenService,private encService:EncryptionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this.token = this.tokenService.getToken();
     this.refreshToken = this.tokenService.getRefreshToken();
    let newRequest  : HttpRequest<any>
    let refreshTokenRequest  : HttpRequest<any>
    if(this.authService.tokenIsExpired()==true){
      let newRefreshTokenValue = encodeURI(this.refreshToken);
      refreshTokenRequest = request.clone({
        method:"POST",
        url:"https://localhost:5001/api/auth/refresh",
        setParams : {'RefreshToken':newRefreshTokenValue, 'Client':this.tokenService.getClientId()},
      })

      next.handle(refreshTokenRequest).subscribe((data)=>{
        if (data instanceof HttpResponse) {
          let newData = data.body.data;
          this.tokenService.addToken(newData.token);
          this.tokenService.addRefreshToken(newData.refreshToken);
        }
      },(error) =>{
        this.tokenService.deleteClientId();
        this.tokenService.deleteToken();
        this.tokenService.deleteRefreshToken();
      })
    }
    let decryptTokenData = this.encService.decrypt(this.token)
    newRequest = request.clone({
      headers:request.headers.set("Authorization","Bearer " + decryptTokenData)
    })
    console.log(decryptTokenData)
    return next.handle(newRequest);
  }
  }
