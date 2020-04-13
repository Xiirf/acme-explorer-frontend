import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Audit } from '../models/audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) { }

  getAuditByIdAuditor(auditorId: string): Promise<Audit[]> {
    const params = new HttpParams().set('auditorId', auditorId);
    return this.http.get<Audit[]>(`${environment.backendApiBaseUrl}/audits`, {params}).toPromise();
  }

  getAuditByIdTrip(tripId: string): Promise<Audit[]> {
    const params = new HttpParams().set('tripId', tripId);
    return this.http.get<Audit[]>(`${environment.backendApiBaseUrl}/audits`, {params}).toPromise();
  }

  getAuditByIdAudit(auditId: string): Promise<Audit> {
    return this.http.get<Audit>(`${environment.backendApiBaseUrl}/audits/${auditId}`).toPromise();
  }
}
