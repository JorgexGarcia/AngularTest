import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  private _formSubmitted: boolean = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.min(6)]],
      password: ["", [Validators.required,
        Validators.pattern("[a-zA-Z0-9.-_]{6}")]]
    });
    this._formSubmitted = false;
  }

  login() {
    this._formSubmitted = true;
    if(!this.loginForm.valid){
      return;
    }
    this.userService.login(this.loginForm.value);
    this.dialogRef.close();
  }

  fieldNoValid(value: string):boolean {
    return this.loginForm.get(value)!.invalid && this._formSubmitted;
  }
}
