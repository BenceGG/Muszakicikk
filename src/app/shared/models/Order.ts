import { CartItem } from "./CartItem";

export interface Order {
    id: number;
    items: CartItem[];
    total: number;
    date: string;
  }