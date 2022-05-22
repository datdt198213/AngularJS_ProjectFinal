import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { HeartService } from '../service/heart.service';

declare var hideListItem: any;
declare var showListItem: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  product: any = {
    id: 0,
    img: '',
    name: '',
    description: '',
    detail: '',
    price: 0,
    category: '',
  };

  cart: any = {
    id: 0,
    product: this.product,
  };

  heart: any = { id: 0, product: this.product };

  heartList: any[] = [];
  cartList: any[] = [];

  constructor(
    public cartService: CartService,
    public heartService: HeartService
  ) {}

  ngOnInit(): void {

    this.getCart();
    this.cartService.updateNumberAndPrice();
    this.getHeart();
    this.heartService.updateNumberAndPrice();

    this.cartService.buttonObservable.subscribe(() => {
      this.getCart();
      this.cartService.updateNumberAndPrice();
    });

    this.heartService.buttonObservable.subscribe(() => {
      this.getHeart();
      this.heartService.updateNumberAndPrice();
    });
  }

  getUrlCart(id: any) {
    return (
      "url('" + this.cartList.find((cart) => cart.id === id).product.img + "')"
    );
  }

  getCart(): void {
    this.cartService.getCart().subscribe((response) => {
      this.cartList = response;
    });
  }

  getUrlHeart(id: any) {
    return (
      "url('" + this.heartList.find((cart) => cart.id === id).product.img + "')"
    );
  }

  getHeart(): void {
    this.heartService.getHeartList().subscribe((response) => {
      this.heartList = response;
    });
  }

  removeCart(id: any): void {
    this.cartService.removeCart(id).subscribe((res) => {
      this.getCart();
      this.cartService.updateNumberAndPrice();
    });
  }

  removeHeart(id: any): void {
    this.heartService.remove(id).subscribe((res) => {
      this.getHeart();
      this.heartService.updateNumberAndPrice();
    });
  }
}
