import {Component, OnDestroy} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

  public loginForm: FormGroup;
  public loginError: boolean;

  private _formSubmitted: boolean;
  private _serviceUser: Subscription | undefined;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.min(6)]],
      password: ["", [Validators.required,
        Validators.pattern("[a-zA-Z0-9.-_]{6}")]]
    });
    this._formSubmitted = false;
    this.loginError = false;
  }

  login() {
    this._formSubmitted = true;
    if(!this.loginForm.valid){
      return;
    }
    if(this._serviceUser){
      this._serviceUser.unsubscribe();
    }
    this._serviceUser = this.userService.login(this.loginForm.value).subscribe((resp:boolean) => {
      if(resp) this.dialogRef.close();
      else{
        this.loginError = true;
      }
    });
  }

  fieldNoValid(value: string):boolean {
    return this.loginForm.get(value)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(): void {
    if (this._serviceUser) {
      this._serviceUser.unsubscribe();
    }
  }
}
