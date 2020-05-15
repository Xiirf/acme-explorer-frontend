import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../models/global-variables.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor(private http: HttpClient) { }

  getGlobalVars(): Promise<GlobalVariables> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<GlobalVariables>(`${environment.backendApiBaseUrl}/globalVars`, {headers}).toPromise();
  }

  updateFlatRateSponsorships(flatRateSponsorships: number): Promise<GlobalVariables> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<GlobalVariables>(`${environment.backendApiBaseUrl}/sponsorships/flatRate`,
    {flatRateSponsorships}, {headers}).toPromise();
  }

  updateCacheTimeOutFinderResults(cacheTimeOutFinderResults: number): Promise<GlobalVariables> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<GlobalVariables>(`${environment.backendApiBaseUrl}/globalVars/cacheTimeOutFinderResults`,
      {cacheTimeOutFinderResults}, {headers}).toPromise();
  }

  updateMaxNumberFinderResults(maxNumberFinderResults: number): Promise<GlobalVariables> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<GlobalVariables>(`${environment.backendApiBaseUrl}/globalVars/maxNumberFinderResults`,
      {maxNumberFinderResults}, {headers}).toPromise();
  }
}
