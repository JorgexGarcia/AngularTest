import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-change-settings-table',
  templateUrl: './change-settings-table.component.html',
  styleUrls: ['./change-settings-table.component.scss']
})
export class ChangeSettingsTableComponent {

  constructor(public dialogRef: MatDialogRef<ChangeSettingsTableComponent>,
              @Inject(MAT_DIALOG_DATA) public columnsName: any[][]) { }

  drop($event: CdkDragDrop<any[][]>){
    moveItemInArray(
      $event.container.data,
      $event.previousIndex,
      $event.currentIndex
    );
  }

  changeFixed(i: number) {
    this.columnsName[i][2] = !this.columnsName[i][2];
  }

  changeVisibility(i: number) {
    this.columnsName[i][3] = !this.columnsName[i][3];
  }

  closeDialog() {
    this.dialogRef.close(this.columnsName);
  }
}
