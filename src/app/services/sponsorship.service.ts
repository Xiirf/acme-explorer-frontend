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
    const params = new HttpParams().set('sponsorId', sponsorId)
                                    .set('payed', 'true');
    return this.http.get<Sponsorship[]>(`${environment.backendApiBaseUrl}/sponsorships`, {params}).toPromise();
  }
}
