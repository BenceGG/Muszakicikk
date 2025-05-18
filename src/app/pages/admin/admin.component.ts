import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  newProduct: Omit<Product, 'id'> = { name: '', brand: '', category: '', price: 0, image: '', rating: 0, purchased: 0 };
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).then(() => {
      this.newProduct = { name: '', brand: '', category: '', price: 0, image: '', rating: 0, purchased: 0 };
    });
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
  }

updateProduct(): void {
  if (!this.editingProduct) return;
  
  const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
  if (index > -1) {
    this.products[index] = { ...this.editingProduct };
  }
  this.editingProduct = null;
}

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id);
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }
}
