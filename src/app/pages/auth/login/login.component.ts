import { EncryptionService } from './../../../utilities/encryption.service';
import { TokenService } from './../../../services/token.service';
import { StorageService } from './../../../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private tokenService:TokenService,private encService:EncryptionService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    });
  }

  Login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)
     
      this.authService.login(loginModel).subscribe((response)=>{
        let data = response.data;
        console.log(data)
        // this.tokenService.addClientId(data.client);
         this.tokenService.addClientId(this.encService.encrypt(data.client));
        // this.tokenService.addRefreshToken(data.refreshToken);
        this.tokenService.addRefreshToken(this.encService.encrypt(data.refreshToken));
        // this.tokenService.addToken(data.token);
        this.tokenService.addToken(this.encService.encrypt(data.token));
      },(error)=>{
        console.log(error)
      })
    }
  }

}
