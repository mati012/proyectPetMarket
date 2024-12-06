import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'https://petmarketbucket.s3.us-east-1.amazonaws.com/cart.json'; 

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addToCart(item: CartItem): Observable<CartItem> {
   
    return new Observable((observer) => {
      observer.next(item);
      observer.complete();
    });
  }

  updateCartItem(item: CartItem): Observable<CartItem> {
  
    return new Observable((observer) => {
      observer.next(item);
      observer.complete();
    });
  }

  removeFromCart(itemId: number): Observable<number> {
   
    return new Observable((observer) => {
      observer.next(itemId);
      observer.complete();
    });
  }
}
