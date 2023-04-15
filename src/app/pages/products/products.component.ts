import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../models/Product";
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DeleteDialogComponent} from "../../dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  public loading: boolean;
  public products: Product[];
  public productsToShow: Product[];
  private _total: number = 0;
  private _serviceProduct: Subscription | undefined;

  public pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private productService: ProductService, private dialogRef: MatDialog) {
    this.loading = false;
    this.products = [];
    this.productsToShow = [];
  }

  ngOnInit(): void {
    this._getProducts();
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
          console.log(this.products);
          console.log(this.productsToShow);
        }
        this.loading = false;
      });
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
}
