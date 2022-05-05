import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  key:string = environment.encryptionKey;
  constructor() { }

  encrypt(value:string):string{
    if(value!=null ||value != undefined || value != ""){
     return CryptoJS.AES.encrypt(value, this.key);
  }
    return null;
}

  decrypt(value:string):string{
    if(value==null ||value == undefined || value == ""){
      return null;
  }
   return CryptoJS.AES.decrypt(value, this.key).toString(CryptoJS.enc.Utf8);
  }
}
