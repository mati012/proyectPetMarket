import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../cart.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.getTotalPrice().subscribe(total => {
      this.totalPrice = total;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  pay() {
  
    alert('¡Gracias por tu compra!');
    this.cartService.clearCart();
  }

}
