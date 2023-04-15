import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";

import {Product} from "../../models/Product";
import {ProductService} from "../../services/product.service";
import {DeleteDialogComponent} from "../../dialogs/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  public loading: boolean;
  public products: Product[];
  public productsToShow: Product[];
  public pageSizeOptions: number[];

  private _total: number = 0;
  private _serviceProduct: Subscription | undefined;

  constructor(private productService: ProductService, private dialogRef: MatDialog) {
    this.loading = false;
    this.products = [];
    this.productsToShow = [];
    this.pageSizeOptions = [5, 10, 20];
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(id: string) {
    const dialogResponse = this.dialogRef.open(DeleteDialogComponent, {
      width:'400px'
    });

    dialogResponse.afterClosed().subscribe(result => {
      if(result){
        this.productService.deleteProduct(id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this._serviceProduct) {
      this._serviceProduct.unsubscribe();
    }
  }

  getPagesMovies(event: any) {
    let start = (event.pageIndex) * event.pageSize;
    let end =  (start + event.pageSize);
    this.productsToShow = [...this.products.slice(start, end)];
  }

  private _getProducts() {
    this.loading = true;
    this.productService.getProduct();
    if(this._serviceProduct){
      this._serviceProduct.unsubscribe();
    }
    this._serviceProduct = this.productService.getProductsList()
      .subscribe((resp:any) => {
        this._total = resp.total;
        if(resp.length !== 0){
          this.products = resp
          this.productsToShow = [...this.products.slice(0, 5)];
        }
        this.loading = false;
      });
  }
}
