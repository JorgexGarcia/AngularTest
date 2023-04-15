import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../models/Product";
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public loading = false;
  public products: Product[] = [];
  private _total: number = 0;
  private _page: number = 0;
  private _serviceProduct: Subscription | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.loading = true;
    this.products = [];
    if(this._serviceProduct){
      this._serviceProduct.unsubscribe();
    }
    this._serviceProduct = this.productService.getProduct()
      .subscribe((resp:any) => {
        this._total = resp.total;
        if(resp.length !== 0){
          this.products = resp
        }
        this.loading = false;
      });
  }

  createProduct() {

  }

  deleteProduct(id: string) {

  }
}
