import { CartItem } from "./CartItem";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}