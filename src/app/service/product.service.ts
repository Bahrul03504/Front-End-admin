import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Kemeja Pria',
      category: 'Pakaian',
      price: 150000,
      description: 'Kemeja pria lengan panjang bahan katun.',
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Sepatu Wanita',
      category: 'Sepatu',
      price: 200000,
      description: 'Sepatu wanita model terbaru nyaman dipakai.',
      imageUrl: 'https://via.placeholder.com/150'
    }
    // Tambahkan produk lain sesuai kebutuhan
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id === id) || { id: 0, name: '', category: '', price: 0, description: '', imageUrl: '' };
  }

  addProduct(product: Product) {
    this.products.push({ ...product, id: this.generateId() });
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.products[index] = product;
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  private generateId(): number {
    return Math.max(...this.products.map(p => p.id)) + 1;
  }
}
