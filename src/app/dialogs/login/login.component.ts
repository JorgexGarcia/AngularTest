import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.min(6)]],
    password: ["", [Validators.required,
      Validators.pattern("[a-zA-Z0-9.-_]{6}")]]
  });

  private _formSubmitted = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
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
