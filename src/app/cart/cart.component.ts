import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
    this.cartService.updateNumberAndPrice();
    this.calTotal();
  }

  product: any = {
    id: 0,
    img: '',
    name: '',
    description: '',
    detail: '',
    price: 0,
  };

  cart: any = {
    id: 0,
    product: this.product,
  };

  sub_total: number = 0;
  total: number = 0;
  discount: number = 20;
  service_charges: number = 4;

  cartList: any[] = [];

  calTotal() {
    this.cartService.getCart().subscribe((response) => {
      this.cartList = response;

      this.sub_total = this.cartList.reduce(
        (accumulator: any, cart: any) => accumulator + cart.product.price,
        0
      );
      this.total =
        this.sub_total -
        (this.sub_total + this.service_charges) * (this.discount / 100);
    });
  }

  // Cart
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

  findIdCart(id: any): void {
    this.cartService.findIdCart(id).subscribe((res) => {
      this.cart = res;
    });
  }

  addCart(product: any): void {
    let cartTmp;

    if (this.cartList.length !== 0) {
      cartTmp = this.cartList[0];
      for (let i = 1; i < this.cartList.length; i++) {
        if (this.cartList[i].id > cartTmp.id) {
          cartTmp = this.cartList[i];
        }
      }
      this.cart.id = ++cartTmp.id;
    } else {
      this.cart.id++;
    }

    this.cart.product = product;
    this.cartService.addCart(this.cart).subscribe(
      (respone) => {
        this.getCart();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCart(id: any): void {
    this.cartService.updateCart(id, this.cart).subscribe((res) => {
      this.getCart();
    });
  }

  removeCart(id: any): void {
    this.cartService.removeCart(id).subscribe((res) => {
      this.getCart();
    });
  }
}
