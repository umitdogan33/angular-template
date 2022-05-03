import { LoginComponent } from './../../pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';

const routes: Routes = [{path:'register',component:RegisterComponent},{path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
