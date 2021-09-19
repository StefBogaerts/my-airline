import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
