import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Sponsorship } from '../models/sponsorship.model';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {

  constructor(private http: HttpClient) { }

  getSponsorshipsByIdSponsor(sponsorId: string): Promise<Sponsorship[]> {
    const params = new HttpParams().set('sponsorId', sponsorId);
    return this.http.get<Sponsorship[]>(`${environment.backendApiBaseUrl}/sponsorships`, {params}).toPromise();
  }

  getSponsorshipsByIdTrip(tripId: string): Promise<Sponsorship[]> {
    const params = new HttpParams().set('tripId', tripId)
                                    .set('payed', 'true');
    return this.http.get<Sponsorship[]>(`${environment.backendApiBaseUrl}/sponsorships`, {params}).toPromise();
  }

  createSponsorship(sponsorship: any): Promise<Sponsorship> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Sponsorship>(`${environment.backendApiBaseUrl}/sponsorships`, sponsorship, {headers}).toPromise();
  }

  getSponsorship(idSponsorship: string): Promise<Sponsorship> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Sponsorship>(`${environment.backendApiBaseUrl}/sponsorships/${idSponsorship}`, {headers}).toPromise();
  }

  updateSponsorship(sponsorship: any, idSponsorship: string): Promise<Sponsorship> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Sponsorship>(`${environment.backendApiBaseUrl}/sponsorships/${idSponsorship}`, sponsorship, {headers}).toPromise();
  }

  deleteSponsorship(idSponsorship: string): Promise<Sponsorship> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<Sponsorship>(`${environment.backendApiBaseUrl}/sponsorships/${idSponsorship}`, {headers}).toPromise();
  }
}
