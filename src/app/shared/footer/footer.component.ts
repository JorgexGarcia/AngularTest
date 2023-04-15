import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../../dialogs/login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateDialogComponent} from "../../dialogs/create-dialog/create-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  createProduct() {
    this.dialogRef.open(CreateDialogComponent, {
      width:'500px'
    });
  }
}
