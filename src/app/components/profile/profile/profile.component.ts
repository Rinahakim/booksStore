import { Component } from '@angular/core';
import { User } from '../../../interface/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Cartitem } from '../../../interface/cartitem';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user !: User
  currentEmail !: string;
  currentPassword !: string;
  clickEditEmail !: boolean;
  form !: FormGroup;
  form_pass !: FormGroup;
  isFoundInUsers !: boolean;
  clickEditPassword !: boolean;

  constructor(private router: Router, private service : ServiceService){
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    this.user = users.find((user : User) => user.isLoggedIn === true);
    this.clickEditEmail = false;
    this.clickEditPassword = false;
    this.currentEmail = this.user.email;
    this.currentPassword = this.user.password;

    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email])
    });
    this.form_pass = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.newPasswordValidator])
    });
  }

  onSubmit(){
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    const email = this.form.get('Email')?.value;

    if(users.some((user: User) => user.email === email))
    {
      this.isFoundInUsers = true;
    }
    else{
      const userIdx = users.findIndex((user: User) => user.email === this.service.emailUser);
      users[userIdx].email = email;
      if(users[userIdx].isAdmin){
        const admin = JSON.parse(localStorage.getItem('Admin') || '{}')
        admin.email = email;
        localStorage.setItem('Admin', JSON.stringify(admin));
      }
      this.currentEmail = email;
      localStorage.setItem('users', JSON.stringify(users));
      this.clickEditEmail = false;
    }
  }

  onSubmitPass(){
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    const password = this.form_pass.get('password')?.value;


    if(users.some((user: User) => user.password === password))
    {
      this.isFoundInUsers = true;
    }
    else{
      const userIdx = users.findIndex((user: User) => user.isLoggedIn === true);
      users[userIdx].password = password;
      if(users[userIdx].isAdmin){
        const admin = JSON.parse(localStorage.getItem('Admin') || '{}')
        admin.password = password;
        localStorage.setItem('Admin', JSON.stringify(admin));
      }
      this.currentPassword = password;
      localStorage.setItem('users', JSON.stringify(users));
      this.clickEditPassword = false;
    }
  }

  newPasswordValidator(control: any): ValidationErrors | null {
      const password: string = control.value;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);
      if(!hasUpperCase || !hasDigit || !hasNonAlphanumeric){
        return {weakpassword: true};
      }
      return null;
    }

  onClickBack(){
    if(this.user.isAdmin){
      this.router.navigate(['/admin']);
    }else{
      this.router.navigate(['/homepage']);
    }
  }

  onClickEditEmail(){
    this.clickEditEmail = true;
  }

  onClickEditPassword(){
    this.clickEditPassword = true;
  }

  onClickCloseEditMail(){
    this.clickEditEmail = false;
  }

  onClickCloseEditPass(){
    this.clickEditPassword = false;
  }

  onClicDeleteAccount(){
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    if(this.user.isAdmin){
      localStorage.removeItem('Admin');
    }
    const updateUsers = users.filter((user: User) => user.email !== this.user.email);
    localStorage.setItem('users', JSON.stringify(updateUsers));
    this.router.navigate(['/homepage']);
  }
}
