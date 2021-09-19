import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { ToolbarComponent } from './toolbar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
