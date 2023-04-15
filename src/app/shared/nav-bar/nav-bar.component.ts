import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { LoginComponent } from "../../dialogs/login/login.component";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy{

  public name: string | null;
  private _subscription: Subscription | undefined;

  constructor(public userService: UserService, private dialogRef: MatDialog, private router: Router) {
    this.name = null;
  }

  ngOnInit(): void {
    this._getUser();
  }

  login() {
    this.dialogRef.open(LoginComponent, {
      width:'300px'
    });
  }

  logout() {
    this.name = null;
    this.userService.logout();
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _getUser() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._subscription = this.userService.getUserActive().subscribe(
      (value:User | null) => {
        if(value){
          this.name = value.name;
        }else{
          this.router.navigateByUrl('/home');
        }
      }
    );
  }
}
