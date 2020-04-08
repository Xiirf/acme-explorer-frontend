import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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

  getTripsManager(): Promise<Trip[]> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Trip[]>(`${environment.backendApiBaseUrl}/trips`, {headers}).toPromise();
  }
}
