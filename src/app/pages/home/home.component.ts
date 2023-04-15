import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../../dialogs/login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productsCount = 100;

  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  login() {
    this.dialogRef.open(LoginComponent, {
      width:'300px'
    });
  }
}
