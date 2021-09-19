import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
      BrowserModule,
      MatCardModule,
      MatButtonModule
  ],
  exports: [HomeComponent]
})
export class HomeComponentModule { }
