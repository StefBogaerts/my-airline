import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { IS_MOBILE } from 'src/main';

import { Airline } from '../airline';
import { AirlineFormComponent } from '../airline-form/form.component';
import { AirlineService } from '../airline.service';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  /** The amount of airlines to show per page. */
  @Input() pageSize = 5;

  /** Whether to use list or table template. */
  readonly useList = IS_MOBILE;

  /** The columns to show. */
  displayedColumns: string[] = ['functions', 'logo', 'name', 'slogan'];

  /** The total amount of airlines. */
  get amountOfAirlines() { return this.airlineService.totalAmountOfAirlines; };

  /** Observale that contains the airlines data. */
  dataSource!: Observable<Airline[]>;

  /** The control to search airlines. */
  searchControl = new FormControl();

  /** The value on which is currently being searched on. */
  currentFilterValue = '';

  /** Reference to the pager. */
  @ViewChild(MatPaginator) pager!: MatPaginator;

  constructor(private airlineService: AirlineService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.retrievePageData();
    this.listenToSearchControl();
  }

  /**
   * Deletes the airlines passed.
   * @param airline The airline to remove.
   */
  deleteAirline(airline: Airline) {
    // TODO(StefBogarts): Add translations
    const description = `You are about to remove <b>${airline.name}</b>. Are you sure you want to delete <b>${airline.name}</b>`;
    const confirmDialogData = new ConfirmDialogData(undefined, undefined, `Delete ${airline.name}`, description);

    // Open confirm dialog.
    // If confirmed, remove the airline.
    this.dialog.open(ConfirmDialogComponent, { data: confirmDialogData }).afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) {
        this.airlineService.deleteAirline(airline.id).subscribe(() => {
          this.snackbar.open(`Succesfuly removed ${airline.name}`, undefined, { duration: 3500 });
          this.retrievePageData();
        });
      }
    })
  }

  /**
   * Open dialog with the details about the airline.
   * @param airline The airline to show the details of.
   */
  openDetails(airline: Airline) {
    this.dialog.open(DetailComponent, { data: airline, width: IS_MOBILE ? '' : '50%' })
  }

  /**
   * Open dialog to edit values of the airline.
   * @param airline The airline to edit.
   */
  openUpdate(airline: Airline) {
    const updateDialog = this.dialog.open(AirlineFormComponent, { data: airline, width: IS_MOBILE ? '' : '50%' });
    updateDialog.afterClosed().subscribe((updatedAirline?: Airline) => {
      if (updatedAirline) {
        this.snackbar.open(`Successfuly updated ${airline.name}`, undefined, { duration: 3500 });
        this.retrievePageData();
      }
    });
  }

  /**
   * Open dialog to create a new airline.
   */
  openCreate() {
    const createDialog = this.dialog.open(AirlineFormComponent, { width: IS_MOBILE ? '' : '50%' });
    createDialog.afterClosed().subscribe((airline?: Airline) => {
      if (airline) {
        this.snackbar.open(`Successfuly created ${airline.name}`, undefined, { duration: 3500 });
        this.retrievePageData();
      }
    });
  }

  /**
   * Get the data to show on the current page.
   * @param filterValue The value on which the airlines should be filtered.
   * @param currentPage The current page to get the data for.
   */
  retrievePageData(filterValue: string = this.currentFilterValue, currentPage = this.pager?.pageIndex || 0) {
    this.dataSource = this.airlineService.getAirlineSet(this.pageSize, filterValue, currentPage).pipe(
      catchError((e) => {
        throw new Error(`An error occured during retrieval of airlines. ${e}`);
      })
    );
  }

  /**
   * Subscribe to changes on the search control.
   * Filter values when value is changed.
   */
  private listenToSearchControl() {
    this.searchControl.valueChanges
      .pipe(debounceTime(750))
      .subscribe((newVal) => {
        if (newVal !== this.currentFilterValue) {
          this.currentFilterValue = newVal;
          this.retrievePageData(newVal);
        }
      });
  }
}
