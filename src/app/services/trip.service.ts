import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private root = 'https://localhost:8080/v1';

  constructor(private http: HttpClient) { }

  getTrips(): Promise<Trip[]> {
    return this.http.get<Trip[]>(`${this.root}/trips`).toPromise();
  }
}
