import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplicationByIdTrip(tripId: string): Promise<Application[]> {
    return this.http.get<Application[]>(`${environment.backendApiBaseUrl}/applications/trip/${tripId}`).toPromise();
  }

}
