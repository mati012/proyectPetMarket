import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  addToCart() {
    const newItem: CartItem = {
      id: this.cartItems.length + 1,
      name: `Producto Carrito ${this.cartItems.length + 1}`,
      price: `$${(this.cartItems.length + 1) * 10}.00`,
      quantity: 1,
    };

    this.cartService.addToCart(newItem).subscribe((item) => {
      this.cartItems.push(item);
      this.calculateTotal();
    });
  }

  updateItemQuantity(item: CartItem, increment: boolean) {
    item.quantity += increment ? 1 : -1;

    if (item.quantity <= 0) {
      this.removeFromCart(item.id);
    } else {
      this.cartService.updateCartItem(item).subscribe((updatedItem) => {
        const index = this.cartItems.findIndex((i) => i.id === updatedItem.id);
        this.cartItems[index] = updatedItem;
        this.calculateTotal();
      });
    }
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price * item.quantity;
    }, 0);
  }
}
