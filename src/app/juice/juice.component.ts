import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { PaginationService } from '../service/pagination.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-juice',
  templateUrl: './juice.component.html',
  styleUrls: ['./juice.component.css']
})
export class JuiceComponent implements OnInit {

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
    id: 0,
    product: this.product,
  };

  productList: any[] = [];
  cartList: any[] = [];

  constructor(public cartService: CartService, public productService: ProductService, public pageService: PaginationService) { }

  ngOnInit(): void {
    $('.price-progress').on('input', (e) => {
      var min = $('.price-progress').attr('min')
      var max = $('.price-progress').attr('max')
      var val = $('.price-progress').val()
      var percent = Number(val) - Number(min) * 100 / Number(max) - Number(min)
      // this.priceProgress = percent;
      $(e.target).css({
        'backgroundSize' : percent + '% 100%'
      });
    }).trigger('input');

    this.getProduct();
    this.getCart();

    this.pageService.setLink()
  }

  //Product
  getUrlProduct(id: any) {
    return (
      "url('" + this.productList.find((product) => product.id === id).img + "')"
    );
  }

  getCart(): void {
    this.cartService.getCart().subscribe((response) => {
      this.cartList = response;
    });
  }

  addCart(product: any, event: any): void {
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
      () => {

        this.getCart();
        this.cartService.buttonAdd.next(event);

        console.log("AddCart() dried-food call")
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProduct(): void {
    this.productService.getProduct().subscribe((response) => {
      this.productList = response;

      // for(let p of this.productList) {
      //   if(p.category=="Juices") {
      //     this.productListJuice.push(p)
      //   }
      // }

      // for(let p of this.productList) {
      //   if(p.category=="Vegetable") {
      //     this.productListVegetable.push(p)
      //   }
      // }

      // for(let p of this.productList) {
      //   if(p.category=="Meat") {
      //     this.productListMeat.push(p)
      //   }
      // }

      // for(let p of this.productList) {
      //   if(p.category=="Herb") {
      //     this.productListHerb.push(p)
      //   }
      // }

    });
  }

  getProductByName(name_product: string) {
    this.product = this.productList.find(
      (product) => product.name == name_product
    );
  }

}
