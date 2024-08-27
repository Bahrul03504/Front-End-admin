import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Customer' | 'Seller';
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Andi Wijaya',
      email: 'andi@example.com',
      role: 'Customer',
      phone: '081234567890',
      address: 'Jl. Merdeka No. 10, Jakarta'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      email: 'siti@example.com',
      role: 'Seller',
      phone: '081298765432',
      address: 'Jl. Sudirman No. 20, Bandung'
    }
    // Tambahkan pengguna lain sesuai kebutuhan
  ];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User {
    return this.users.find(u => u.id === id)!;
  }  

  addUser(user: User) {
    this.users.push({ ...user, id: this.generateId() });
  }

  updateUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

  private generateId(): number {
    return Math.max(...this.users.map(u => u.id)) + 1;
  }
}
