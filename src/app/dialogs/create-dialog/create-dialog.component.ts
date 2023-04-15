import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent {

  public productForm: FormGroup;
  public productFormats: string[];
  public optionSelected: string;

  private _formSubmitted: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>,
              private formBuilder: FormBuilder, private productService: ProductService) {
    this.productForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.min(4)]],
      price: [0.1, [Validators.required, Validators.min(0)]],
      format: ["", [Validators.required, Validators.min(4)]],
      brand: ["", [Validators.required, Validators.min(4)]],
      revised: [false]
    });
    this.productFormats = ['Digital', 'Physical'];
    this.optionSelected = '';
  }

  createProduct() {
    this._formSubmitted = true;
    if(!this.productForm.valid){
      return;
    }
    this.productService.createProduct(this.productForm.value);
    this.dialogRef.close();
  }

  fieldNoValid(value: string):boolean {
    return this.productForm.get(value)!.invalid && this._formSubmitted;
  }

  removePrice() {
    let price = this.productForm.controls['price'].value;
    if(price <= 0) return;
    price -= 0.1;
    price = Math.round(price * 10) / 10;
    this.productForm.controls['price'].setValue(price);
  }

  addPrice() {
    let price = this.productForm.controls['price'].value;
    price += 0.1;
    price = Math.round(price * 10) / 10;
    this.productForm.controls['price'].setValue(price);
  }
}
