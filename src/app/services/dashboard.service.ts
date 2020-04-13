import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboard(): Promise<Dashboard> {
    return this.http.get<Dashboard>(`${environment.backendApiBaseUrl}/dataWareHouse/latest`).toPromise();
  }
}
