import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogModule } from 'src/app/dialog/confirm-dialog/confirm-dialog.module';
import { AirlineService } from '../airline.service';
import { AirlineFormComponent } from './form.component';

@NgModule({
    imports: [
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        ConfirmDialogModule
    ],
    providers: [AirlineService],
    declarations: [
        AirlineFormComponent
    ],
    exports: [AirlineFormComponent]
})
export class AirlineFormModule { }
