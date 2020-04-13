import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Application } from '../models/application.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplications(): Promise<Application[]> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Application[]>(`${environment.backendApiBaseUrl}/applications`, {headers}).toPromise();
  }

  getApplication(idApplication: string): Promise<Application> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Application>(`${environment.backendApiBaseUrl}/applications/${idApplication}`, {headers}).toPromise();
  }

  getApplicationByIdTrip(tripId: string): Promise<Application[]> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Application[]>(`${environment.backendApiBaseUrl}/applications/trip/${tripId}`, {headers}).toPromise();
  }
}