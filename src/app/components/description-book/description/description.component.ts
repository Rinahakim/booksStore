import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { Book } from '../../../interface/book';
import { User } from '../../../interface/user';

@Component({
  selector: 'app-description',
  standalone: false,
  
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  book !: Book;
  isLoggedIn !: boolean;
  isAdminLogIn !: boolean;

  constructor(private router : Router, private service : ServiceService){
    this.book = JSON.parse(localStorage.getItem('description') || '[]');
    this.isLoggedIn = this.service.getIsLoggedIn;
    const admin = JSON.parse(localStorage.getItem('Admin') || '{}');
    this.isAdminLogIn = admin.isAdminLogIn;
  }

  onClickToLogin(){
    this.router.navigate(['/login']);
  }
  onClickLogOut(){
      if(this.isAdminLogIn){
        const admin = JSON.parse(localStorage.getItem('Admin') || '{}');
        admin.isAdminLogIn = false;
        this.isAdminLogIn = false;
        localStorage.setItem('Admin', JSON.stringify(admin));
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((user: User) => user.isLoggedIn === true);
      users[userIndex].isLoggedIn = false;
      console.log(users[userIndex]);
      this.isLoggedIn = false;
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/homepage']);
    }

    onClickHome(){
      if(this.isAdminLogIn){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/homepage']);
      }
    }
}
