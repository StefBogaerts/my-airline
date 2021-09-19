import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Airline } from '../airline';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {


  constructor(private dialogRef: MatDialogRef<DetailComponent>, @Inject(MAT_DIALOG_DATA) public airline: Airline) {
  }

  /**
   * Callback for when the dialog is getting closed.
   */
  onClose() {
    this.dialogRef.close();
  }
}
