import { CartItem } from "./CartItem";
import { Order } from "./Order";

export interface User {
    id: string;
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    cart: CartItem [];
    order: Order [];
  }