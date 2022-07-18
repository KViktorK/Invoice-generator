import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface IProduct {
  name: string;
  count: number;
  price: number;
}
@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private _http: HttpClient) {}
  private products: IProduct[] = [];
  sum: number = 0;
  
  getProducts() {
    return this.products;
  }

  addProducts(products: IProduct[]) {
    products.map((el: IProduct) => {
      this.sum = this.sum + el.count * el.price;
      this.products.push(el);
    });
  }

  getCompanyInfo() {
    return this._http.get<any>('assets/company.json');
  }
}
