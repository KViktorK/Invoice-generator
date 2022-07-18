import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _invoiceService: InvoiceService,
    private _router: Router
  ) {}

  invoiceForm!: FormGroup;

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  get f(): any {
    return this.invoiceForm.controls;
  }

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      products: this._fb.array([this._initForm()]),
    });
  }
  private _initForm() {
    return this._fb.group({
      name: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.required,
        ],
      ],
      count: [
        1,
        [
          Validators.pattern(/^[1-9]+[0-9]*$/),
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ],
      ],
      price: [
        0,
        [
          Validators.pattern(/^[1-9]+[0-9]*$/),
          Validators.required,
          Validators.min(1),
          Validators.max(1000000),
        ],
      ],
    });
  }

  onAddProduct() {
    const control = <FormArray>this.invoiceForm?.get('products');
    control.push(this._initForm());
  }

  onDeletProduct(i: number) {
    (<FormArray>this.invoiceForm?.get('products')).removeAt(i);
  }

  onSubmit() {
    if (this.products.length === 0) {
      alert('Please add new item');
      return
    }
    if (this.invoiceForm.invalid) {
      return;
    }
    this._invoiceService.addProducts(this.invoiceForm.value.products);
    this._router.navigate([`/preview`])
  }
}
