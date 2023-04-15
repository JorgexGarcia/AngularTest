import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";

import { User } from "../models/User";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string;
  private _userActive: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private setUserActive(value: User | null): void {
    this._userActive.next(value);
  }

  public getUserActive(): Observable<User | null> {
    return this._userActive.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {
    this._baseUrl = environment.userPath;
  }

  logout() {
    this.setUserActive(null);
    this.router.navigateByUrl('/home');
  }

  login( formData : User): Observable<any>{
    return this.http.get<any>(`${this._baseUrl}`).pipe(
      map((resp:User) => {
          if(resp){
            if( formData.name === resp.name &&
              formData.password === resp.password){
              this.setUserActive(resp);
              this.router.navigateByUrl('/product');
              return true;
            }
          }
          return false;
        }
      ));
  }
}
