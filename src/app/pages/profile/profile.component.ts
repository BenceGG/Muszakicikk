import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../shared/services/user.service';
import { CartService } from '../../shared/services/cart.service';
import { User } from '../../shared/models/User';
import { CartItem } from '../../shared/models/CartItem';
import { Order } from '../../shared/models/Order';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatBadgeModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cart: CartItem[] = [];
  orders: Order[] = [];
  isLoading = true;
  private subscription: Subscription | null = null;
  showCartContent = false;
  showOrdersContent = false;
  editMode = false;
  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  showCart(): void {
    this.showCartContent = true;
    this.showOrdersContent = false;
  }

  showOrders(): void {
    this.showOrdersContent = true;
    this.showCartContent = false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getUserInitials(): string {
    if (!this.user || !this.user.name) return '?';
    const firstInitial = this.user.name.firstname?.charAt(0).toUpperCase() ?? '';
    const lastInitial = this.user.name.lastname?.charAt(0).toUpperCase() ?? '';
    return firstInitial + lastInitial;
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.cart = data.cart;
        this.orders = data.order;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba:', error);
        this.isLoading = false;
      }
    });
  }

  enableEdit(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.loadUserProfile();
  }

  async saveProfile(): Promise<void> {
    if (!this.user) return;
    try {
      await this.userService.updateUserProfile(this.user.id, this.user);
      this.editMode = false;
      this.loadUserProfile();
    } catch (err) {
      console.error('Profil mentési hiba:', err);
      alert('Nem sikerült menteni a profilt!');
    }
  }

  loadCart(): void {
    this.cart = this.cartService.getItems();
  }

  calculateTotal(): number {
    return this.cart?.reduce((total, item) =>
      total + ((item.price ?? 0) * item.quantity), 0) || 0;
  }

  purchase(): void {
    if (this.cart.length === 0) {
      alert('A kosár üres!');
      return;
    }

    const dialogRef = this.dialog.open(PurchaseConfirmationDialog, {
      width: '400px',
      data: { total: this.calculateTotal() }
    });

    dialogRef.afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed && this.user) {
        try {
          const order: Order = {
            id: Date.now().toString(),
            items: this.cart,
            total: this.calculateTotal(),
            date: new Date()
          };

          await this.userService.addUserOrder(this.user.id, order);
          await this.cartService.clearCart();
          this.cart = [];
        } catch (error) {
          console.error('Vásárlási hiba:', error);
          alert('Hiba történt a vásárlás során!');
        }
      }
    });
  }
}

@Component({
  selector: 'purchase-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Vásárlás megerősítése</h1>
    <div mat-dialog-content>
      <p>Biztosan szeretnéd végrehajtani a vásárlást?</p>
      <p><strong>Végösszeg:</strong> {{ data.total }} Ft</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Mégse</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Megerősítés</button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class PurchaseConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<PurchaseConfirmationDialog>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: { total: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}