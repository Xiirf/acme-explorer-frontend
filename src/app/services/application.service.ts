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

  updateApplicationToDue(idApp: string): Promise<Application> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<Application>(`${environment.backendApiBaseUrl}/applications/${idApp}/status`,
                                        {status: 'ACCEPTED'}, {headers}).toPromise();
  }

  createApplication(application: any): Promise<Application> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Application>(`${environment.backendApiBaseUrl}/applications`, application, {headers}).toPromise();
  }

  updateApplication(application: Application, applicationId: string): Promise<Application> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Application>(`${environment.backendApiBaseUrl}/applications/${applicationId}`, application, {headers}).toPromise();
  }
}
