import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  getTrip(idTrip: string): Promise<Trip> {
    return this.http.get<Trip>(`${environment.backendApiBaseUrl}/trips/${idTrip}`).toPromise();
  }

  getTripsPage(start: number, psize: number): Promise<Trip[]> {
    const parameters = {
      startFrom: '' + start,
      pageSize: '' + psize
    };
    return this.http.get<Trip[]>(`${environment.backendApiBaseUrl}/trips`, {params: parameters, observe: 'body'}).toPromise();
  }

  createTrip(trip: any): Promise<Trip> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Trip>(`${environment.backendApiBaseUrl}/trips`, trip, {headers}).toPromise();
  }

  updateTrip(trip: any, tripId: string): Promise<Trip> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Trip>(`${environment.backendApiBaseUrl}/trips/${tripId}`, trip, {headers}).toPromise();
  }

  cancelTrip(tripId: string, reason: string): Promise<Trip> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<Trip>(`${environment.backendApiBaseUrl}/trips/${tripId}/cancel`, {reasonCancelling: reason},
                                    {headers}).toPromise();
  }
}
