import { Injectable } from '@angular/core';

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  products: any[];
  totalAmount: number;
  status: 'Pending' | 'Processed' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    // Data pesanan mock
  ];

  constructor() { }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: number): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  addOrder(order: Order) {
    this.orders.push({ ...order, id: this.generateId(), orderDate: new Date() });
  }

  updateOrder(order: Order) {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index > -1) {
      this.orders[index] = order;
    }
  }

  deleteOrder(id: number) {
    this.orders = this.orders.filter(o => o.id !== id);
  }

  private generateId(): number {
    return this.orders.length > 0 ? Math.max(...this.orders.map(o => o.id)) + 1 : 1;
  }
}
