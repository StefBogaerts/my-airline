import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AirlineService } from './airline.service';
import { ListModule } from './list/list.module';
import { DetailDialogModule } from './detail/detail.module';
import { AirlineFormModule } from './airline-form/form.module';

@NgModule({
  imports: [
    ListModule,
    HttpClientModule,
    MatDialogModule,
    DetailDialogModule,
    AirlineFormModule
  ],
  providers: [AirlineService],
  declarations: [
  ],

})
export class AirlineModule { }
