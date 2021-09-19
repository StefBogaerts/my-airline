import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent, ConfirmDialogData } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { Airline } from '../airline';
import { AirlineService } from '../airline.service';

@Component({
  selector: 'airline-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class AirlineFormComponent {

  /** The form to edit the airline. */
  formGroup!: FormGroup;

  /** The mode the form is in. */
  mode: FormMode;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<AirlineFormComponent>, private airlineService: AirlineService, @Inject(MAT_DIALOG_DATA) public airline: Airline) {
    this.mode = airline ? FormMode.Update : FormMode.Create;
    if (!this.airline) {
      this.airline = new Airline();
    }

    this.createFormGroup(this.airline!);
  }

  /**
   * Callback when the dialog will be closed.
   */
  onClose() {
    // Just close when no changes have been made.
    // Show Confirm dialog if there are changes.
    if (!this.formGroup.dirty) {
      this.dialogRef.close();
    } else {
      const confirmData = new ConfirmDialogData(`Discard`, 'Cancel', 'Discard changes?', 'Are you sure you want to discard the changes?');
      this.dialog.open(ConfirmDialogComponent, { data: confirmData }).afterClosed().subscribe((discard: boolean) => {
        if (discard) {
          this.dialogRef.close();
        }
      });
    }
  }

  /**
   * Callback when the airline will be saved.
   */
  onSave() {
    if (this.formGroup.invalid) {
      return;
    }
    
    let saveObservale;

    switch (this.mode) {
      case FormMode.Create:
        saveObservale = this.airlineService.createAirline(this.airline!);
        break;

      case FormMode.Update:
        saveObservale = this.airlineService.updateAirline(this.airline!);
        break;

      default:
        throw new Error(`${this.mode} is an unknown mode of the form component. Contact a developer.`);
    }

    // TODO(stefbogaerts): add error handling.
    saveObservale.subscribe((result: Airline) => {
      this.dialogRef.close(result);
    });
  }

  /**
   * Creates the form that holds the controls to edit an airline.
   * @param airline The airline to create the form on.
   */
  private createFormGroup(airline: Airline) {
    this.formGroup = new FormGroup({
      'name': new FormControl(airline.name, [Validators.required]),
      'slogan': new FormControl(airline.slogan),
      'logo': new FormControl(airline.logo)
    });
    this.formGroup.valueChanges.subscribe((newValue) => {
      this.airline = {
        ...this.airline,
        ...newValue
      }
    });
  }
}

/**
 * The different modes of the form.
 */
enum FormMode {
  Update = 'Update',
  Create = 'Create'
}