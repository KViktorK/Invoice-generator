import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceService, IProduct } from 'src/app/invoice.service';
interface ICompanyInfo {
  name: string;
  address: string;
  phones: number[];
}
@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css'],
})
export class InvoicePreviewComponent implements OnInit {
  constructor(private _invoiceService: InvoiceService) {}
  products!: IProduct[];
  sum: number = 0;
  subscription!: Subscription;
  companyInfo!: ICompanyInfo;
  ngOnInit(): void {
    this.products = this._invoiceService.getProducts();
    this.sum = this._invoiceService.sum;
    this.subscription = this._invoiceService
      .getCompanyInfo()
      .subscribe((info) => {
        this.companyInfo = info;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
