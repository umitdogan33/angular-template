import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }


  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  controlPassword(){
    let password = this.registerForm.get('password').value;
    let confirmPassword = this.registerForm.get('confirmPassword').value;
    if(password != confirmPassword){
      this.registerForm.get('confirmPassword').setErrors({'mismatch':true});
      alert("Password and Confirm Password must be same");
    }

  }
}
