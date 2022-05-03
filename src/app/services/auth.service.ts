import { EncryptionService } from './../utilities/encryption.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelperService: JwtHelperService = new JwtHelperService();
  currentUserId: number;
  currentRoles: string;
  NewPath= environment.localApiUrl+"Auth/"
  constructor(private tokenService:TokenService,private httpClient:HttpClient,private encService:EncryptionService) {}
  
  
  token = this.encService.decrypt(this.tokenService.getToken());

  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>("https://localhost:5001/api/Auth/login",user);
  }

  Register(user:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
  return this.httpClient.post<SingleResponseModel<TokenModel>>(this.NewPath+"register",user) 
}



setCurrentUserId() {
  var decoded = this.getDecodedToken()
  var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
  this.currentUserId = Number(decoded[propUserId]);
}
setRoles() {
  var decoded = this.getDecodedToken()
  var propUserId = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
  this.currentRoles = String(decoded[propUserId]);
}
getCurrentRoles(): string {
  console.log(this.currentRoles);
  
  return this.currentRoles
}
getCurrentUserId(): number {
  return this.currentUserId
}
getDecodedToken() {
  try {
    return this.jwtHelperService.decodeToken(this.token);
  }
  catch (Error) {
    return null;
  }
}
async setUserStats() {
  if (this.loggedIn()) {
    this.setCurrentUserId()
    this.setRoles()
  }
}

logout() {
  this.tokenService.deleteToken();
  this.tokenService.deleteRefreshToken();
  this.tokenService.deleteClientId();
}
loggedIn(): boolean {
  let isExpired = this.jwtHelperService.isTokenExpired(this.token);
  return !isExpired;
}

tokenIsExpired(): boolean{
  if(this.token == undefined || this.token == null){
    return false;
  }
  console.log("authservicetoken",this.token)
  let isExpired = this.jwtHelperService.isTokenExpired(this.token);
  return isExpired;
}
}
