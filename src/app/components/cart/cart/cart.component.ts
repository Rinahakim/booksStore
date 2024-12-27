import { Component } from '@angular/core';
import { Book } from '../../../interface/book';
import { ServiceService } from '../../../services/service.service';
import { Router } from '@angular/router';
import { Cartitem } from '../../../interface/cartitem';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  listBooksInCart !: Cartitem[];
  isThereBooksInCart !: boolean;
  counterBook !: number;
  totalPay !: number;

  constructor(private service : ServiceService, private router : Router){
    this.listBooksInCart = JSON.parse(localStorage.getItem('guest') || '[]');
    if(!this.listBooksInCart)
    {
      this.isThereBooksInCart = false;
    }else{
      this.isThereBooksInCart = true;
      this.totalPay = parseFloat(this.listBooksInCart.reduce((total, item: Cartitem) => total + (parseFloat(item.book.price.replace('$', '')) * item.quantity), 0).toFixed(2));
    }
  }

  onClickToLogin(){
    this.router.navigate(['/login']);
  }
  RemoveItem(cartItem: Cartitem){
    if(cartItem.quantity > 1){
      cartItem.quantity--;
    }
    else{
      this.listBooksInCart = this.listBooksInCart.filter(item => item.book.id !== cartItem.book.id)
    }
    localStorage.setItem('guest', JSON.stringify(this.listBooksInCart));

    if(this.listBooksInCart.length === 0)
    {
      this.isThereBooksInCart = false;
    }
    this.totalPay = parseFloat(this.listBooksInCart.reduce((total, item: Cartitem) => total + (parseFloat(item.book.price.replace('$', '')) * item.quantity), 0).toFixed(2));
  }
}
