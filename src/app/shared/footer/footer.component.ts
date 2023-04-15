import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { CreateDialogComponent } from "../../dialogs/create-dialog/create-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public showFooter: boolean;

  constructor(private dialogRef: MatDialog) {
    this.showFooter = false;
  }

  createProduct() {
    this.dialogRef.open(CreateDialogComponent, {
      width:'500px'
    });
  }

  ngOnInit(): void {
    this.showFooter = !window.location.href.includes('home');
  }
}
