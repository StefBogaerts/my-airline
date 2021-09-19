import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [DetailComponent]
})
export class DetailDialogModule { }
