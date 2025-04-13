import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product} from '../../shared/models/Product';
import { SalesStatusPipe } from '../../shared/pipes/sale-status.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    SalesStatusPipe,
    MatDividerModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  Product: Product[] = [
    { id: 1, name: 'Canon Eos 2000D', brand: 'Canon', category: 'fényképezőgép', price: 120000, image: 'assets/images/canon-eos-2000d.jpg', rating: 80, purchased: 120 },
    { id: 2, name: 'Canon Eos R6', brand: 'Canon', category: 'fényképezőgép', price: 799990, image: 'assets/images/canon-eos-2000d.jpg', rating: 90, purchased: 200 },
    { id: 3, name: 'Dell XPS 13', brand: 'Dell', category: 'laptop', price: 650000, image: 'assets/images/canon-eos-2000d.jpg', rating: 85, purchased: 36 },
    { id: 4, name: 'Hp Pavilon 15', brand: 'HP', category: 'laptop', price: 299990, image: 'assets/images/canon-eos-2000d.jpg', rating: 75, purchased: 150 },
    { id: 5, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'mobiltelefon', price: 499990, image: 'assets/images/canon-eos-2000d.jpg', rating: 95, purchased: 120 },
    { id: 6, name: 'Iphone 15 Pro', brand: 'Apple', category: 'mobiltelefon', price: 500000, image: 'assets/images/canon-eos-2000d.jpg', rating: 98, purchased: 300 },
    { id: 7, name: 'Sony Alpha A7 III', brand: 'Sony', category: 'fényképezőgép', price: 900000, image: 'assets/images/canon-eos-2000d.jpg', rating: 99, purchased: 30 },
    { id: 8, name: 'Nikon Z6', brand: 'Nikon', category: 'fényképezőgép', price: 849000, image: 'assets/images/canon-eos-2000d.jpg', rating: 90, purchased: 200 },
    { id: 9, name: 'Lenovo IdeaPad 3', brand: 'Lenovo', category: 'laptop', price: 250000, image: 'assets/images/canon-eos-2000d.jpg', rating: 70, purchased: 445 },
    { id: 10, name: 'MacBook Air M3 (2022)', brand: 'Apple', category: 'laptop', price: 600000, image: 'assets/images/canon-eos-2000d.jpg', rating: 83, purchased: 150 },
    { id: 11, name: 'Poco M6 Pro', brand: 'Poco', category: 'mobiltelefon', price: 80000, image: 'assets/images/canon-eos-2000d.jpg', rating: 73, purchased: 500 },
    { id: 12, name: 'Xiaomi Redmi Note 13 Pro 5G', brand: 'Xiaomi', category: 'mobiltelefon', price: 90000, image: 'assets/images/canon-eos-2000d.jpg', rating: 88, purchased: 600 },
  ];

  categories = ['fényképezőgép', 'laptop', 'mobiltelefon'];

  filteredProducts = this.Product;

  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';
  
  onCategoryChange(selectedCategory: string) {
    this.filteredProducts = this.Product.filter(product => product.category === selectedCategory);
  }

  cart: any[] = []; 
  
  addToCart(product: any) {
    this.cart.push(product);
    console.log('Kosár tartalma:', this.cart);
  }

  selectedIndex: number = 0;

  ngOnInit(): void {
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }
}