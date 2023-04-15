import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { User } from "../models/User";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userActive = new BehaviorSubject<User | null>(null);

  public getUserActive(): Observable<User | null> {
    return this._userActive.asObservable();
  }

  private setUserActive(value: User | null): void {
    this._userActive.next(value);
  }

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public logout() {
    this.setUserActive(null);
    this.router.navigateByUrl('/home');
  }

  login( formData : User){
    if(formData){
      this.setUserActive(formData);
      this.router.navigateByUrl('/product')
    }
    /*
    return this.http.post<any>(``, formData)
      .pipe(
        tap((resp:any) => {
          if(resp.go){
            localStorage.setItem('token', resp.token)
          }
        })
      );
     */
  }
}
