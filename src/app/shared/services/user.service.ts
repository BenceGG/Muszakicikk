import { Injectable, inject } from '@angular/core';
import { 
  Firestore, doc, getDoc, updateDoc, runTransaction 
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { Order } from '../models/Order';
import { CartItem } from '../models/CartItem';

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);

  constructor(private authService: AuthService) {}

  getUserProfile(): Observable<{ 
    user: User | null,
    cart: CartItem[],
    order: Order[],
    stats: {
      cartItems: number,
      purchaseCount: number,
      totalSpent: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) return of({ 
          user: null, 
          cart: [], 
          order: [],
          stats: { cartItems: 0, purchaseCount: 0, totalSpent: 0 }
        });
        return from(this.fetchUserWithDetails(user.uid));
      })
    );
  }

  private async fetchUserWithDetails(userId: string) {
    try {
      const userRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userRef);
      
      if (!userSnapshot.exists()) return {
        user: null,
        cart: [],
        order: [],
        stats: { cartItems: 0, purchaseCount: 0, totalSpent: 0 }
      };

      const userData = userSnapshot.data() as User;
      
      // Dátum konverzió
      const orders: Order[] = (userData.order || []).map(order => ({
        ...order,
        date: (order.date && typeof (order.date as any).toDate === 'function') ? (order.date as any).toDate() : order.date // Firestore Timestamp -> Date or keep as Date
      }));

      const cart: CartItem[] = userData.cart || [];

      const stats = {
        cartItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        purchaseCount: orders.length,
        totalSpent: orders.reduce((sum, order) => 
          sum + order.items.reduce((acc, item) => 
            acc + (item.price * item.quantity), 0), 0)
      };

      return { 
        user: { ...userData, id: userId }, 
        cart, 
        order: orders, 
        stats 
      };
    } catch (error) {
      console.error('Hiba:', error);
      return {
        user: null,
        cart: [],
        order: [],
        stats: { cartItems: 0, purchaseCount: 0, totalSpent: 0 }
      };
    }
  }

  async addUserOrder(userId: string, newOrder: Order): Promise<void> {
    const userRef = doc(this.firestore, 'Users', userId);
    
    await runTransaction(this.firestore, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error('Felhasználó nem található!');

      const currentOrders = userDoc.data()?.['order'] || [];
      transaction.update(userRef, { 
        order: [...currentOrders, newOrder],
        cart: []
      });
    });
  }

  async updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, 'Users', userId);
    await updateDoc(userRef, data);
  }
}
