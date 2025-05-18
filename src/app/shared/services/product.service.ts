import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productCollection;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'Product');
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Omit<Product, 'id'>): Promise<any> {
    return addDoc(this.productCollection, product);
  }

  updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const productRef = doc(this.firestore, `Product/${id}`);
    return updateDoc(productRef, product);
  }

  deleteProduct(id: string): Promise<void> {
    const productRef = doc(this.firestore, `Product/${id}`);
    return deleteDoc(productRef);
  }
}
