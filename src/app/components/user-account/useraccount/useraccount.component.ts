import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitem } from '../../../interface/cartitem';
import { User } from '../../../interface/user';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-useraccount',
  standalone: false,
  
  templateUrl: './useraccount.component.html',
  styleUrl: './useraccount.component.css'
})
export class UseraccountComponent {

  listItemsInCart : Cartitem[] = [];
  isThereBooksInCart !: boolean;
  totalPay : number = 0;
  isPay !: Boolean;

  constructor(private router : Router, private service : ServiceService){
    this.service.updateVar();
    const user = this.service.getUser;
    this.listItemsInCart = user.cart;
    this.isPay = false;
    this.updateVar(user);
  }

  onClickHome(){
    this.router.navigate(['/homepage']);
  }
  updateVar(user : User) : void{
    if(user.cart.length === 0){
      this.isThereBooksInCart = false
      this.totalPay = 0;
    }else{
      this.isThereBooksInCart = true;
      this.totalPay = parseFloat(
        user.cart.reduce((total: number, item: Cartitem) => total + parseFloat(item.book.price.replace('$', '')) * item.quantity,0).toFixed(2)
      );
    }
  }

  updateCart(userIndex: number, users: User[], user: User) {
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    this.listItemsInCart = user.cart; 
    this.updateVar(user);
  }

  RemoveItem(indexCart: number){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.email === this.service.emailUser);

    if (userIndex > -1) {
      const user = users[userIndex];
      user.cart.splice(indexCart, 1);
      this.updateCart(userIndex, users, user);
    }  
  }

  onClickAdd(indexCart: number){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.email === this.service.emailUser);
    const user = users[userIndex];
    user.cart[indexCart].quantity++;
    this.updateCart(userIndex, users, user);
  }

  onClickDown(indexCart: number){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.email === this.service.emailUser);
    const user = users[userIndex];

    if (user.cart[indexCart].quantity === 1) {
      this.RemoveItem(indexCart); 
    } else {
      user.cart[indexCart].quantity--;
      this.updateCart(userIndex, users, user);
    }
  }

  onClickPayment(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.email === this.service.emailUser);
    const user = users[userIndex];

    user.cart = [];
    this.updateCart(userIndex, users, user);
    this.isPay = true ;
  }
  onClickXPopUp(){
    this.isPay = false;
  }
}
