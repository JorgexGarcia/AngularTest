import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { LoginComponent } from "../../dialogs/login/login.component";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public productsCount: number;

  private _serviceProduct: Subscription | undefined;

  constructor(private dialogRef: MatDialog, private productService: ProductService) {
    this.productsCount = 0;
  }

  ngOnInit(): void {
    this._getProductCount();
  }

  ngOnDestroy(): void {
    if (this._serviceProduct) {
      this._serviceProduct.unsubscribe();
    }
  }

  login() {
    this.dialogRef.open(LoginComponent, {
      width:'300px'
    });
  }

  private _getProductCount() {
    this.productService.getProduct();
    if(this._serviceProduct){
      this._serviceProduct.unsubscribe();
    }
    this._serviceProduct = this.productService.getCheckProductsCount()
      .subscribe((resp:any) => {
          if(resp) this.productsCount = resp;
      });
  }
}
