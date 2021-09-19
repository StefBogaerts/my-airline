import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  /** The data used in the confirm dialog. */
  confirmDialogData = new ConfirmDialogData();

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData) {
    this.confirmDialogData = { ...this.confirmDialogData, ...data }
  }

  /**
   * Closes the dialog.
   * @param confirmed Whether the statement is confirmed or declined.
   */
  closeDialog(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }
}

export class ConfirmDialogData {
  constructor(
    public confirmText = 'Confirm',
    public cancelText = 'Cancel',
    public title = 'Are you sure you want to do this action?',
    public description = 'You are about to execute the action. Are you sure you want to do this?') {
  }
}