import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { Book } from '../../../interface/book';
import { User } from '../../../interface/user';
import { Cartitem } from '../../../interface/cartitem';
import { FormControl, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form !: FormGroup;
  formAddBook !: FormGroup;
  books !: Book[]; 
  isLoggedIn !: boolean;
  isAdminLogIn !: boolean;
  isModalEdit !: boolean;
  isModalAddBook !: boolean
  bookToEdit !: Book;

  displayedBooks: Book[] = [];
  totalItems: number = 0; 
  pageSize: number = 4; 
  currentPage: number = 0;
  
  constructor(private router : Router, private service : ServiceService){
    this.isLoggedIn = this.service.getIsLoggedIn;
    const admin = JSON.parse(localStorage.getItem('Admin') || '{}');
    this.isAdminLogIn = admin.isAdminLogIn;
    this.isModalEdit = false;
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.totalItems = this.books.length;
    this.updateDisplayedBooks();
    this.service.updateVar();
  }

  updateDisplayedBooks() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedBooks = this.books.slice(startIndex, endIndex);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateDisplayedBooks();
  }
  
  onClickToLogin(){
    this.router.navigate(['/login']);
  }
  onClickDescription(book : Book){
    localStorage.setItem('description', JSON.stringify(book));
    this.router.navigate(['/description']);
  }
  onClickAddCart(book : Book, event: MouseEvent){
    event.stopPropagation();
    this.service.updateVar();
    if(this.service.getIsLoggedIn || this.isAdminLogIn ){
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((user: User) => user.email === this.service.emailUser);
      
      if (userIndex > -1) {
        const user = users[userIndex];
        const existingItemIndex = user.cart.findIndex((cartItem : Cartitem)=> cartItem.book.id === book.id);
        if(existingItemIndex > -1){
          user.cart[existingItemIndex].quantity++;
        }else{
          const quantity = 1
          user.cart.push({book, quantity});
        }
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
    else{
      const guestList = JSON.parse(localStorage.getItem('guest') || '[]');
      if(guestList.length > 0){
        const existingItem = guestList.find((item : Cartitem) => item.book.name === book.name);
        if (existingItem) {
          existingItem.quantity++;
        }else{
          guestList.push({ book, quantity: 1 });
        }
      }else {
        guestList.push({ book, quantity: 1 });
      }
      localStorage.setItem('guest', JSON.stringify(guestList));
    }
  }
  onClickToCart(){
    if(this.service.getIsLoggedIn){
      this.router.navigate(['/useraccount']);
      return;
    }
    this.router.navigate(['/cart']);
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

  onClickChoice(book :Book ,event: MouseEvent){
    event.stopPropagation();
    book.popUpChoice = true;
  }

  onClickClose(book :Book ,event: MouseEvent){
    event.stopPropagation();
    book.popUpChoice = false;
  }

  onClickEdit(book: Book,event: MouseEvent){
    event.stopPropagation();
    this.isModalEdit = true;
    this.bookToEdit = book;
    book.popUpChoice = false;

    this.form = new FormGroup({
      img: new FormControl(this.bookToEdit.img),
      description: new FormControl(this.bookToEdit.description),
      bookName: new FormControl(this.bookToEdit.name),
      author: new FormControl(this.bookToEdit.author),
      price: new FormControl(this.bookToEdit.price),
    });
  }
  onClickEditClose(){
    this.isModalEdit = false;
  }

  onClickDelete(bookToDelete: Book,event: MouseEvent){
    event.stopPropagation();
    const books = JSON.parse(localStorage.getItem('books') || '[]')
    const updatedBooks = books.filter((book: Book) => book.id !== bookToDelete.id);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    this.isModalEdit = false;
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
  }

  onClickSaveChanges(){
    this.bookToEdit.img = this.form.get('img')?.value;
    this.bookToEdit.name = this.form.get('bookName')?.value;
    this.bookToEdit.author = this.form.get('author')?.value;
    this.bookToEdit.description = this.form.get('description')?.value;
    this.bookToEdit.price = this.form.get('price')?.value;
    
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const bookIdx = books.findIndex((book: Book) => book.id === this.bookToEdit.id);
    books[bookIdx] = this.bookToEdit
    localStorage.setItem('books', JSON.stringify(books));

    this.isModalEdit = false;
  }

  onClickAddBook(){
    this.isModalAddBook = true;
    this.formAddBook  = new FormGroup({
      img: new FormControl(''),
      description: new FormControl(''),
      bookName: new FormControl(''),
      author: new FormControl(''),
      price: new FormControl(''),
    });
  }

  onClickSave(){
    const books = JSON.parse(localStorage.getItem('books') || '[]')
    const newBook = {
      name: this.formAddBook.get('bookName')?.value, 
      img: this.formAddBook.get('img')?.value,
      description: this.formAddBook.get('description')?.value, 
      author: this.formAddBook.get('author')?.value,
      price: this.formAddBook.get('price')?.value,
      id: uuidv4(),
    }
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.isModalAddBook = false;
  }

  onClickProfile(){
    this.router.navigate(['/profile']);
  }

  onSearch(event : Event){
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    const filteredBooks = this.books.filter((book: Book) =>
      book.name.toLowerCase().startsWith(searchTerm)
    );
      this.totalItems = filteredBooks.length;
    this.books = filteredBooks;
    this.updateDisplayedBooks();

    // const inputElement = event.target as HTMLInputElement;
    // const books = JSON.parse(localStorage.getItem('books') || '[]');
    // this.books = books.filter((book: Book) =>
    //   book.name.toLowerCase().startsWith(inputElement.value.toLowerCase())
    // );
    // this.books = books.filter((book: Book) => book.name.toLowerCase().includes(inputElement.value.toLowerCase()));
  }
}

