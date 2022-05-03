import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor(private stroageService:StorageService) { }

  addToken(token:string){
    this.stroageService.add('token',token);
  }

  deleteToken(){
    this.stroageService.delete('token');
  } 

  getToken():string{
    return this.stroageService.get("token");
  }

  addRefreshToken(token:string){
    this.stroageService.add('refreshtoken',token);
  }

  deleteRefreshToken(){
    this.stroageService.delete('refreshtoken');
  } 

  getRefreshToken(){
    return this.stroageService.get("refreshtoken")
  }

  addClientId(clientId:string){
    this.stroageService.add('clientid',clientId);
  }

  deleteClientId(){
    this.stroageService.delete('clientid');
  } 

  getClientId():any{
    return this.stroageService.get("clientid");
  }
}
