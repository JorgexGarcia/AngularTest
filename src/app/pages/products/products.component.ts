import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { Product } from "../../models/Product";
import { ProductService } from "../../services/product.service";
import { DeleteDialogComponent } from "../../dialogs/delete-dialog/delete-dialog.component";
import { ChangeSettingsTableComponent } from "../../dialogs/change-settings-table/change-settings-table.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  public loading: boolean;
  public products: Product[];
  public productsToShow: any[];
  public nameToShow: any[][];
  public columnsToShow: any[][];
  public pageSizeOptions: number[];

  private _serviceProduct: Subscription | undefined;

  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(private productService: ProductService, private dialogRef: MatDialog) {
    this.loading = false;
    this.products = [];
    this.productsToShow = [];
    this.pageSizeOptions = [5, 10, 20];
    this.columnsToShow = [];
    this.nameToShow = [
      ['Nombre', 'name', false, true],
      ['Precio', 'price', false, true],
      ['Formato', 'format', false, true],
      ['Marca', 'brand', false, true]
    ];
    this._selectedColumnsToShow();
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(item: string[][]) {
    let arrayId:string[] = [];
    item.forEach((x:string[]) => {
      if(x[0] === 'id') arrayId = x;
    });
    const dialogResponse = this.dialogRef.open(DeleteDialogComponent, {
      width:'400px'
    });

    dialogResponse.afterClosed().subscribe(result => {
      if(result){
        this.productService.deleteProduct(arrayId[1]);
      }
    });
  }

  private _selectedColumnsToShow(){
    this.columnsToShow = [];
    this.nameToShow.forEach((item:any[]) =>{
      if(item[3]) this.columnsToShow.push(item);
    });
  }

  ngOnDestroy(): void {
    if (this._serviceProduct) {
      this._serviceProduct.unsubscribe();
    }
  }

  getPagesMovies(event: any): void {
    this.productsToShow = [];
    let start: number = (event.pageIndex) * event.pageSize;
    let end: number =  (start + event.pageSize);
    let list: Product[] = [...this.products.slice(start, end)];
    list.forEach((item: Product): void =>{
      this.productsToShow.push(Object.entries(item));
    });
  }

  changeSettingsTable() {
    const dialogResponse = this.dialogRef.open(ChangeSettingsTableComponent, {
      width:'600px',
      data: this.nameToShow,
    });

    dialogResponse.afterClosed().subscribe(result => {
      if(result){
        this.nameToShow = result;
        this._selectedColumnsToShow();
      }
    });
  }

  private _getProducts(): void {
    this.loading = true;
    this.productService.getProduct();
    if(this._serviceProduct){
      this._serviceProduct.unsubscribe();
    }
    this._serviceProduct = this.productService.getProductsList()
      .subscribe((resp:any): void => {
        if(resp.length !== 0){
          this.paginator?.firstPage();
          this.paginator?._changePageSize(5);
          this.products = resp
          let list: Product[] = [...this.products.slice(0, 5)];
          this.productsToShow = [];
          list.forEach((item: Product) =>{
            this.productsToShow.push(Object.entries(item));
          });
        }
        this.loading = false;
      });
  }
}
