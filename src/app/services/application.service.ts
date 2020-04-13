import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplications(): Promise<Application[]> {
    return this.http.get<Application[]>(`${environment.backendApiBaseUrl}/applications`).toPromise();
  }

  getApplication(idApplication: string): Promise<Application> {
    return this.http.get<Application>(`${environment.backendApiBaseUrl}/applications/${idApplication}`).toPromise();
  }

  getApplicationByIdTrip(tripId: string): Promise<Application[]> {
    return this.http.get<Application[]>(`${environment.backendApiBaseUrl}/applications/trip/${tripId}`).toPromise();
  }
}