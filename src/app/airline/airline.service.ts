import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

import { Airline, AirlineResponse } from './airline';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  /** The total amount of airlines. */
  public totalAmountOfAirlines: number = 0;

  constructor(private http: HttpClient) { }

  /**
   * Retrieve the airlines for a specific page.
   * @param amountToRetrieve The amount of airlines to retrieve.
   * @param filterValue The value on which to filter the airlines.
   * @param page The page to get data for.
   */
  getAirlineSet(amountToRetrieve: number, filterValue = '', page = 0) {
    let airlineUrl = `${environment.apiUrl}/airlines?page=${page}&amount=${amountToRetrieve}`;
    if (filterValue) {
      airlineUrl += `&filterValue=${filterValue}`;
    }
    return this.http.get<AirlineResponse>(airlineUrl)
      .pipe(
        tap((airlineResponse) => {
          this.totalAmountOfAirlines = airlineResponse.totalAmount;
        }),
        map((airlineResponse) => airlineResponse.airlines)
      );
  }

  /**
   * Removes the airline.
   * @param id The unique identifier of the airline.
   */
  deleteAirline(id: string) {
    return this.http.delete(`${environment.apiUrl}/airlines/${id}`);
  }

  /**
   * Creates a new airline.
   * @param airline The airline to create.
   */
  createAirline(airline: Airline) {
    return this.http.post<Airline>(`${environment.apiUrl}/airlines`, airline);
  }

  /**
   * Updates the passed airline.
   * @param airline The airline to update.
   */
  updateAirline(airline: Airline) {
    return this.http.put<Airline>(`${environment.apiUrl}/airlines/${airline.id}`, airline);
  }
}