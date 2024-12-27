import { Cartitem } from "./cartitem";

export interface User {
    email : string,
    password : string,
    cart: Cartitem[],
    isLoggedIn: Boolean,
    isAdmin: Boolean,
}
