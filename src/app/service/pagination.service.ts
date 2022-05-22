import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient, private productService: ProductService) { }

  page: number = 0;

  ARRAY_PRODUCT_URL: string[] = [];
  PRODUCT_URL_LIMIT_BEGIN: string = 'http://localhost:3000/product?_page=';
  PRODUCT_URL_LIMIT_END: string = '&_limit=12';

  productList: any= []

  setLink() {
    let page_number = 0;
    let round_number = 0;

    this.productService.getProduct().subscribe(res => {
      this.productList = res;

      page_number = this.productList.length / 10;

      // Rounding number
      round_number = page_number * 10;
      round_number %= 10;
      if (round_number != 0) {
        page_number = page_number - round_number / 10 + 1;
      }

      this.page = page_number;

      for (let i = 1; i <= page_number; i++) {
        let page_url =
          this.PRODUCT_URL_LIMIT_BEGIN + i + this.PRODUCT_URL_LIMIT_END;
        this.ARRAY_PRODUCT_URL.push(page_url);
      }
    })
  }
}
