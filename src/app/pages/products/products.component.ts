import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { SalesStatusPipe } from '../../shared/pipes/sale-status.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    SalesStatusPipe
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  isLoading = true;
  selectedCategory: string = '';
  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProductsFromDatabase();
  }

  private loadProductsFromDatabase(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
        this.extractUniqueCategories();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba a termékek betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

  private extractUniqueCategories(): void {
    const allCategories = this.products
      .map(p => p.category)
      .filter((category): category is string => !!category);

    this.categories = [...new Set(allCategories)];
  }

  onCategoryChange(selectedCategory: string): void {
    this.selectedCategory = selectedCategory;
    if (!selectedCategory) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === selectedCategory
      );
    }
  }

  addToCart(product: Product): void {
    const existing = this.cartService.getItems().find(i => i.id === product.id);
    existing ? this.cartService.updateQuantity(product.id, 1) : this.cartService.addToCart(product);
  }
}