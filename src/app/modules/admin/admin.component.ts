import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  isAdmin():boolean{
    var role = this.authService.getCurrentRoles();
    if(role=="Admin"){
      return true;
    }
    this.toastrService.error("You are not authorized to access this page");
    window.navigator["/"];
    return false;
     

  }

}
