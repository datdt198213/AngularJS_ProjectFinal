import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  product: any = {
    id: 0,
    img: '',
    arrayImg: [],
    name: '',
    description: '',
    detail: '',
    price: 0,
    rate: 0,
    quantity: 0,
    review: 0,
    category: ''
  };

  cart: any = {
    id:0,
    product: this.product
  }

  mass: number = 1;
  productID: number = 0;
  tmpPrice: number = 0;
  productList: any[] = [];
  cartList: any[] = [];

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productID = this.activeRoute.snapshot.params['id'];
    this.findId(this.productID);
    this.getProductList();
    $(window).scrollTop(0);
  }

  increaseMass() {
    if (this.mass === 99) {
      this.mass = 99;
    } else {
      this.mass++;
      this.product.price = this.tmpPrice * this.mass;
    }
  }

  decreaseMass() {
    if (this.mass === 1) {
      this.mass = 1;
    } else {
      this.mass--;
      this.product.price = this.tmpPrice * this.mass;
    }
  }

  getURL(id: any) {
    return (
      "url('" + this.productList.find((product) => product.id === id).img + ')'
    );
  }

  getURLByIndex(index: any) {
    console.log(this.product.arrayImg[index]);
    return "url('" + this.product.arrayImg[index] + ')';
  }

  getProductList(): void {
    this.productService.getProduct().subscribe((response) => {
      this.productList = response;
    });
  }

  addProductToCart(event: any): void {
    this.cartService.getCart().subscribe((res) => {
      this.cartList = res;
      const check_duplicate = this.cartList.find(
        (cart) => (cart.product.id = this.product.id)
      );
      const array_id = this.cartList.map((cart) => cart.id);
      let id_cart = 0;

      if (check_duplicate) {
        id_cart = Math.max.apply(Math, array_id);
        id_cart++;
      }

      this.cart.id = id_cart;
      this.cart.product = this.product;

      this.cartService.addCart(this.cart).subscribe(() => {
        this.cartService.buttonAdd.next(event);
      });
    });
  }

  findId(id: any): void {
    this.productService.findIdProduct(id).subscribe((res) => {
      this.product = res;
      this.tmpPrice = this.product.price;
    });
  }

  add(): void {
    this.productService.addProduct(this.product).subscribe(
      (respone) => {
        this.getProductList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update(id: any): void {
    this.productService.updateProduct(id, this.product).subscribe((res) => {
      this.getProductList();
    });
  }

  remove(id: any): void {
    this.productService.removeProduct(id).subscribe((res) => {
      this.getProductList();
    });
  }

  clear(): void {
    this.product = '';
  }
}
