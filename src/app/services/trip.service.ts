import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getTrips(): Promise<Trip[]> {
    return this.http.get<Trip[]>(`${environment.backendApiBaseUrl}/trips`).toPromise();
  }
}
