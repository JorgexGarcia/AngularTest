import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userActive: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private setUserActive(value: User | null): void {
    this._userActive.next(value);
  }

  public getUserActive(): Observable<User | null> {
    return this._userActive.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    this.setUserActive(null);
    this.router.navigateByUrl('/home');
  }

  login( formData : User){
    if(formData){
      this.setUserActive(formData);
      this.router.navigateByUrl('/product')
    }
  }
}
