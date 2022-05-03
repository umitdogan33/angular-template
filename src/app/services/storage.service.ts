import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cookieService: CookieService) { }

  add(key:string,value:any){
    this.cookieService.put(key,value);
  }

  delete(key:string){
    this.cookieService.remove(key);
  }

  update(key:string,newValue:any){
    this.cookieService.remove(key);
    this.cookieService.put(key,newValue);
  }

  get(key:string):string{
    return this.cookieService.get(key);
  }
}
