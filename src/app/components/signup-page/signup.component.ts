import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { ServiceService } from '../../services/service.service';
import { Cartitem } from '../../interface/cartitem';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  form !: FormGroup
  isFoundInUsers = false;

  constructor(private router : Router, private service : ServiceService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.newPasswordValidator]),
      repeatPassword: new FormControl('', [Validators.required])
    },{validators:[this.passwordValidator]});
  }

  onSubmit(){
    const email = this.form.get('Email')?.value;
    const password = this.form.get('password')?.value;
    const cart: Cartitem[] = [];

    const users = JSON.parse(localStorage.getItem("users") || '[]');

    if(users.some((user: User) => user.email === this.form.get('Email')?.value))
    {
      this.isFoundInUsers = true;
    }
    else{
      const isLoggedIn = false;
      const admin = JSON.parse(localStorage.getItem('Admin') || '{}')
      const isAdmin = (admin.email === email) ? true : false;
      users.push({email, password, cart, isLoggedIn, isAdmin});
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/login']);
    }
  }
  onClickLogin(){
    this.router.navigate(['/login']);
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

  passwordValidator(control: any): ValidationErrors | null  {
    const password: string = control.get('password')?.value;
    const repeatPassword: string = control.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      return {mismatch: true};  
    }
    return null;
  }
}
