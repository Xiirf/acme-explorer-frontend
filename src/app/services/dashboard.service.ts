import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboard(): Promise<Dashboard> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Dashboard>(`${environment.backendApiBaseUrl}/dataWareHouse/latest`, {headers}).toPromise();
  }
}
