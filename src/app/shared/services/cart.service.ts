import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';

@Injectable(
  { providedIn: 'root' } // This makes the service available application-wide
)
export class CartService {
  private items: CartItem[] = [];

  addToCart(product: Product): void {
    const existingItem = this.items.find(item => item.id === product.id);
    existingItem ? existingItem.quantity++ : this.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  updateQuantity(itemId: string, change: number): void {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeFromCart(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
  }

  getItems(): CartItem[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }

}

