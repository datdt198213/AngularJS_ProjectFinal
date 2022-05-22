import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';
import { SeasonService } from '../service/season.service';
import { UserService } from '../service/user.service';
import * as $ from 'jquery';
import { HeartService } from '../service/heart.service';

declare var heartToggle: any;
declare var showSuccessToast: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
    category: '',
  };

  user: any = {
    id: 0,
    img: '',
    comment: '',
    name: '',
    rate: 0,
  };

  season: any = {
    id: 0,
    img: '',
    description: '',
    time: '',
  };

  cart: any = {
    id: 0,
    product: this.product,
  };

  heart: any = {
    id: 0,
    product: this.product,
  };

  productList: any[] = [];
  productListJuice: any[] = [];
  productListVegetable: any[] = [];
  productListMeat: any[] = [];
  productListHerb: any[] = [];
  userList: any[] = [];
  seasonList: any[] = [];
  cartList: any[] = [];
  heartList: any[] = [];

  constructor(
    public userService: UserService,
    private cartService: CartService,
    public productService: ProductService,
    public seasonService: SeasonService,
    public heartService: HeartService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.getUser();
    this.getSeason();
  }

  counter(i: number) {
    return new Array(i);
  }

  //Product
  getUrlProduct(id: any) {
    return (
      "url('" + this.productList.find((product) => product.id === id).img + "')"
    );
  }

  setProduct(product: any) {
    this.product = product;
  }

  getProductList(): void {
    this.productService.getProduct().subscribe((response) => {
      this.productList = response;

      for (let p of this.productList) {
        if (p.category == 'Juices') {
          this.productListJuice.push(p);
        }
      }

      for (let p of this.productList) {
        if (p.category == 'Vegetable') {
          this.productListVegetable.push(p);
        }
      }

      for (let p of this.productList) {
        if (p.category == 'Meat') {
          this.productListMeat.push(p);
        }
      }

      for (let p of this.productList) {
        if (p.category == 'Herb') {
          this.productListHerb.push(p);
        }
      }
    });
  }

  addProductToCart(event: any): void {
    this.cartService.getCart().subscribe((res) => {
      this.cartList = res;

      const array_id = this.cartList.map((cart) => cart.id);
      let idCart = Math.max.apply(Math, array_id);
      idCart++;

      this.cart.id = idCart;
      this.cart.product = this.product;

      this.cartService.addCart(this.cart).subscribe(() => {
        showSuccessToast();
        this.cartService.buttonAdd.next(event);
      });
    });
  }

  getCart(): void {
    this.cartService.getCart().subscribe((response) => {
      this.cartList = response;
    });
  }

  // User
  getUrlUser(id: any) {
    return "url('" + this.userList.find((user) => user.id === id).img + "')";
  }

  getUser(): void {
    this.userService.getUser().subscribe((response) => {
      this.userList = response;
    });
  }

  // Season
  getUrlSeason(id: any) {
    return "url('" + this.seasonList.find((user) => user.id === id).img + "')";
  }

  getSeason(): void {
    this.seasonService.getSeason().subscribe((response) => {
      this.seasonList = response;
    });
  }

  // Heart
  getHeart(): void {
    this.heartService.getHeartList().subscribe((res) => {
      this.heartList = res;
    });
  }

  // JS
  heartClick(e: any) {
    heartToggle(e.srcElement);
    this.heartService.getHeartList().subscribe((res) => {
      this.heartList = res;

      const array_id = this.heartList.map((heart) => heart.id);

      let idHeart = Math.max.apply(Math, array_id);
      idHeart++;

      this.heart.id = idHeart;
      this.heart.product = this.product;

      this.heartService.addHeart(this.heart).subscribe(() => {
        this.heartService.buttonAdd.next(e);
      });
    });
  }
}
