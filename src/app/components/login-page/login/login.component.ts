import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interface/user';
import { ServiceService } from '../../../services/service.service';
import { Cartitem } from '../../../interface/cartitem';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form !: FormGroup;
  isNeedToSignUp: boolean = false;
  user !: User;

  constructor(private router : Router, private service : ServiceService){}
  ngOnInit(): void {
    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }
  
  onSubmit() {
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    const user = users.find((user: User) => user.email === this.form.get('Email')?.value);

    if(user && this.checkIfAdminLog()){
      user.isLoggedIn = true;
      this.service.setIsLoggedIn(true);
      localStorage.setItem('users', JSON.stringify(users));
      this.service.updateVar();
      this.updateUserCart();
      this.router.navigate(['/admin']);
      return;
    }
  
    if(user && (!this.router.url.includes('admin')) && user && 
      user.isAdmin === false && user.password === this.form.get('password')?.value)
    {
      user.isLoggedIn = true;
      this.service.setIsLoggedIn(true);
      localStorage.setItem('users', JSON.stringify(users));
      this.service.updateVar();
      this.updateUserCart();
      this.router.navigate(['/homepage']);
    }
    else {
      this.service.setIsLoggedIn(false);
      this.isNeedToSignUp = true;
    }
  }

  checkIfAdminLog():boolean{
    const admin = JSON.parse(localStorage.getItem('Admin') || '{}')
    if(this.router.url.includes('admin/login') && this.form.get('Email')?.value === admin.email && 
      this.form.get('password')?.value === admin.password){
      const admin = JSON.parse(localStorage.getItem('Admin') || '{}');
      admin.isAdminLogIn = true;
      localStorage.setItem('Admin', JSON.stringify(admin));
      return true;
    }
    return false;
  }

  onClickSignUp(){
    this.router.navigate(['/signup']);
  }

  updateUserCart(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUserIdx = users.findIndex((user: User) => user.isLoggedIn === true);
    const currentUser = users[currentUserIdx];
    const guestCart = JSON.parse(localStorage.getItem('guest') || '[]');

    console.log(currentUser);
    guestCart.forEach((guestItem: Cartitem) => {
      const cart = currentUser.cart.find((existingItem: Cartitem) => existingItem.book.name === guestItem.book.name);
      if (cart) {
        cart.quantity += guestItem.quantity;
      } else {
        currentUser.cart.push(guestItem);
      }
    });

    users[currentUserIdx] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('guest');
  }
}
