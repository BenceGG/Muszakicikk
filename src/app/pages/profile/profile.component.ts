import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../shared/models/CartItem';
import { Order } from '../../shared/models/Order';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  selectedIndex = 0;

  ProfileObject = [
    {
      id: 1,
      user_name: 'Test User',
      email: 'test.user@example.com',
      avatar: 'J',
    }
  ];

  cart: CartItem[] = [
    { id: 1, name: 'Hp Pavilon 15', price: 299990, quantity: 1 },
    { id: 2, name: 'Poco M6 Pro', price: 80000, quantity: 2 }
  ];

  orders: Order[] = [
    {
      id: 1,
      items: [
        { id: 1, name: 'Samsung Galaxy S24 Ultra', price: 499990, quantity: 1 },
        { id: 2, name: 'MacBook Air M3 (2022)', price: 600000, quantity: 1 }
      ],
      total: 1099990,
      date: '2025-04-10'
    }
  ];

  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';

  showCartContent = false;
  showOrdersContent = false;
  constructor(private dialog: MatDialog) {}

  showCart() {
    this.showCartContent = true;
    this.showOrdersContent = false;
  }

  showOrders() {
    this.showOrdersContent = true;
    this.showCartContent = false;
  }

  ngOnInit(): void {
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  purchase() {
    if (this.cart.length > 0) {
      const dialogRef = this.dialog.open(PurchaseConfirmationDialog, {
        width: '400px',
        data: { total: this.calculateTotal() },
        panelClass: 'custom-dialog-container'
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          alert(`Sikeres vásárlás! Végösszeg: ${this.calculateTotal()} Ft`);
          this.cart = []; 
          this.showCartContent = false; 
        }
      });
    } else {
      alert('A kosár üres!');
    }
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
    private dialogRef: MatDialogRef<PurchaseConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { total: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}