import { Injectable } from '@angular/core';
import { Book } from '../interface/book';

import { Cartitem } from '../interface/cartitem';
import { User } from '../interface/user';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private isLoggedIn!: boolean;
  emailUser!: string;
  private user!: User; 
  addToCartBooks: Cartitem[] = [];
  books: Book[] = [];
  admin !: User;
  Admin : Object = {email: 'rin1212@gmail.com', password: 'Rin1212!', isAdminLogIn: false}
  // private books: Book[] = [{
    
  //   name: 'The gambler',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/org/2000539856.jpg',
  //   description: 'Archer, seeking a fresh start, heads to California after surviving a murder case. Along the way, he teams up with aspiring actress Liberty Callahan. In Bay Town, Archer uncovers corruption, blackmail, and murder tied to a powerful politician. As bodies pile up, he delves into a dangerous world of brothels, gambling dens, and drug dealers, risking his life to solve the case. Set in post-WWII America, **The Gambler** by David Baldacci delivers a gripping, fast-paced thriller with a sharp and engaging style.',
  //   price: '30.00$',
  //   id: uuidv4(),
  //   author: 'david baldazzi',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'hopeless',
  //   img: 'https://www.booknet.co.il/images/site/products/opt/246624_174_auto.jpg',
  //   description: 'Hopelessly Unredeemable by Sarah Goodman Confino is an uplifting novel about secrets, heartbreak, and a Jewish family’s journey. After her husband announces he wants a divorce, Jenna joins her eccentric grandmother Evelyn on a roots trip to Massachusetts. Evelyn shares a long-hidden love story from her youth, while Jenna finds solace in the company of Joe, a kind local. Amid family revelations and newfound friendships, Jenna gains the strength to move past her pain. This is Confino’s second book translated into Hebrew, following the bestseller Don’t Forget to Write.',
  //   price: '40.99$',
  //   id: uuidv4(),
  //   author: 'sara gutman',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'second chance',
  //   img: 'https://www.booknet.co.il/images/site/products/opt/244599_174_auto.jpg',
  //   description: 'Nell always knew her expiration date. Twenty years ago, a mysterious psychic predicted she wouldn’t live past 40. Embracing this, Nell chose a life of adventures over commitments. On her “final” day, she sends heartfelt confessions to loved ones, gives away everything, and checks into a luxury hotel to await the inevitable. Yet, she wakes up the next morning—alive, broke, and single—left to face the fallout of her brutally honest messages. Charlotte Butterfield, a former magazine editor, now writes from the Cotswolds after years in Dubai.',
  //   price: '33.99$',
  //   id: uuidv4(),
  //   author: 'michal levy',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'Lake of Longing',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/2000539894.jpg',
  //   description: 'The year is 1929, and two families on opposite sides of the world face turmoil. In Soviet-controlled Ukraine, young farmer Isabel Lazar flees her home to save her family, only to lose them en route to Boston. Meanwhile, Boston banker Finn Evans struggles to adjust after the Great Depression shatters his privileged life. Isabel, now destitute, becomes a servant in Finns home, where a forbidden romance blossoms amidst shared hardships. Lake of Longing by Paullina Simons is a powerful tale of courage, hope, and resilience during times of loss. Simons captivating writing has enthralled readers worldwide with works like The Bronze Horseman.',
  //   price: '29.99$',
  //   id: uuidv4(),
  //   author: 'mia nano',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'The silent patient',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/36200060278.jpg',
  //   description: 'Alicia Berensons life seems perfect—shes a famous painter married to a sought-after fashion photographer, living in a luxurious London home. One night, she shoots her husband five times in the face and never speaks again. Dubbed "the silent patient," Alicias refusal to explain the act fuels public fascination, skyrocketing the value of her artwork. Psychologist Theo Faber is determined to uncover her motive, taking on a dangerous journey to reveal her truth and confront his own. This gripping psychological thriller weaves a tale of obsession, betrayal, and hidden motives.',
  //   price: '35.99$',
  //   id: uuidv4(),
  //   author: 'sara gutman',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'Surrounded by idiots',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/62512014333.jpg',
  //   description: 'Behavioral expert Thomas Erikson identifies four main personality types: Reds (dominant), Yellows (optimistic), **Greens** (stable), and Blues (analytical). In Surrounded by Idiots, Erikson offers insights into understanding and effectively communicating with each type to improve relationships and self-awareness.',
  //   price: '31.99$',
  //   id: uuidv4(),
  //   author: 'roy cohen',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'Think and get rich',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/39-4033.jpg',
  //   description: 'Think and Grow Rich by Napoleon Hill is a timeless classic, inspiring millions with its philosophy and practical techniques for achieving financial success and personal fulfillment. Hill presents a step-by-step guide to unlocking the full potential of your mind and overcoming self-imposed limitations. With the belief that "if you can conceive it, you can achieve it," this book empowers readers to turn dreams into reality.',
  //   price: '38.99$',
  //   id: uuidv4(),
  //   author: 'sara gutman',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'Deep in Gaza',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/62512017228.jpg',
  //   description: 'Deep in Gaza by Tomer Tzaban is the personal story of a fighter in the Shimshon undercover unit during the First Intifada. With candid and gripping details, he recounts dangerous missions and the emotional toll of his service. The book offers a rare glimpse into the hidden world of those who risk their lives to protect others.',
  //   price: '32.99$',
  //   id: uuidv4(),
  //   author: 'roy cohen',
  //   popUpChoice: false,
  // },
  // {
  //   name: 'Heroes',
  //   img: 'https://www.booknet.co.il/Images/Site/Products/org/100070002.jpg',
  //   description: 'Deep in Gaza by Tomer Tzaban is the personal story of a fighter in the Shimshon undercover unit during the First Intifada. With candid and gripping details, he recounts dangerous missions and the emotional toll of his service. The book offers a rare glimpse into the hidden world of those who risk their lives to protect others.',
  //   price: '37.99$',
  //   id: uuidv4(),
  //   author: 'roy cohen',
  //   popUpChoice: false,
  // },];

  constructor() {
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.admin = JSON.parse(localStorage.getItem('Admin') || '{}');
    if(!this.admin.email || !this.admin.password){
      localStorage.setItem('Admin', JSON.stringify(this.Admin));
      this.admin = JSON.parse(localStorage.getItem('Admin') || '{}');
    }
   this.updateVar();
  }
  updateVar(){
    this.books = JSON.parse(localStorage.getItem('books') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.user = users.find((user : User) => user.isLoggedIn === true);
    if(this.user){
      this.isLoggedIn = true;
      this.emailUser = this.user.email;
    }else{
      this.isLoggedIn = false;
    }
  }
  get getBooksList(): Book[]{
    return this.books;
  }
  get getIsLoggedIn() : boolean{
    return this.isLoggedIn;
  }
  setIsLoggedIn(isLoggedIn : boolean){
    this.isLoggedIn = isLoggedIn;
  }

  get getUser() : User{
    return this.user;
  }
}