import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _baseUrl = environment.productsPath;
  private _productsList: Product[] = [];

  constructor(private http: HttpClient) {}

  createProduct(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}`, formData);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/product/${product.id}`,
      product);
  }

  getProduct(): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}`).pipe(
      map((resp:Product[]) => {
         this._productsList = resp;
         return this._productsList;
      }
    ));
  }

  deleteProduct(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/product/delete/${id}`, data);
  }
}
