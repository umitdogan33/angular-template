import { ToastrService } from 'ngx-toastr';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDisableGuard implements CanActivate {
  constructor(private tokenService:TokenService,private toastrService:ToastrService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.tokenService.getClientId() != null && this.tokenService.getRefreshToken() != null && this.tokenService.getToken() != null){
        return true;
      }
      
      this.toastrService.error("giriş yapınız");
      this.router.navigate(['/auth/login']);
      return false;
      
  }
  
}
