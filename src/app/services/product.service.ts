import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../models/Product";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _baseUrl: string;
  private _productsList: BehaviorSubject<Product[]>
  private _checkProductsCount: BehaviorSubject<number>;

  public getCheckProductsCount(): Observable<number> {
    return this._checkProductsCount.asObservable();
  }

  private setCheckProductsCount(value: number): void {
    this._checkProductsCount.next(value);
  }

  public getProductsList(): Observable<Product[]> {
    return this._productsList.asObservable();
  }

  private setProductsList(value: Product[]): void {
    console.log("a")
    this._productsList.next(value);
    this.setCheckProductsCount(value.filter((item: Product) => !item.revised).length);
    console.log(this._checkProductsCount.getValue())
  }

  constructor(private http: HttpClient) {
    this._baseUrl = environment.productsPath;
    this._productsList = new BehaviorSubject<Product[]>([]);
    this._checkProductsCount = new BehaviorSubject<number>(0);
  }

  createProduct(formData: any): void{
    if(this._productsList.getValue().length > 0){
      let lastId: number = Number(this._productsList.getValue()[this._productsList.getValue().length - 1].id);
      formData.id = (lastId + 1).toString();
    }else{
      formData.id = "1";
    }
    let newList: Product[] = this._productsList.getValue();
    newList.push(formData);
    this.setProductsList(newList);
  }

  getProduct(): void {
    this.http.get<any>(`${this._baseUrl}`).pipe(
      map((resp:Product[]) => {
        if(resp){
          this.setProductsList(resp);
        }
      }
    )).subscribe();
  }

  deleteProduct(id: string): void {
    let newList: Product[] = this._productsList.getValue().filter((item: Product) => item.id !== id);
    this.setProductsList(newList);
  }
}
