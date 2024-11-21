import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private totalPrice = new BehaviorSubject<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isLocalStorageAvailable()) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems.next(JSON.parse(savedCart));
        this.calculateTotal();
      }
    }
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  getTotalPrice() {
    return this.totalPrice.asObservable();
  }

  addToCart(product: any) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      this.cartItems.next([...currentItems, newItem]);
    }

    this.saveToLocalStorage();
    this.calculateTotal();
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveToLocalStorage();
    this.calculateTotal();
  }
  

  clearCart() {
    this.cartItems.next([]);
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('cart');
    }
    this.totalPrice.next(0);
  }

  private calculateTotal() {
    const total = this.cartItems.getValue().reduce((sum, item) => {
      const price = parseFloat(
        item.price.replace('$', '').replace('.', '').replace(',', '')
      );
      return sum + price * item.quantity;
    }, 0);
    this.totalPrice.next(total);
  }

  private saveToLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.getValue()));
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
    } catch {
      return false;
    }
  }
}
