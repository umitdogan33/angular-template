import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService:ToastrService) { }

   showError(error:any){
     if(error.error.errors){
      error.errors.forEach(error => {
        this.toastrService.error("Validation Error" ?? 'Internal Server Error',error);
      });
      return;
     }
     this.toastrService.error(error.error.message?? 'Internal Server Error');

     
   }
}
