import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Finder } from '../models/finder.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(private http: HttpClient) { }

  getFinderByExplorerId(idExplorer: string): Promise<Finder> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Finder>(`${environment.backendApiBaseUrl}/finders/byExplorer/${idExplorer}`, {headers}).toPromise();
  }

  createFinder(finder: any): Promise<Finder> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Finder>(`${environment.backendApiBaseUrl}/finders`, finder, {headers}).toPromise();
  }

  updateFinder(finder: Finder): Promise<Finder> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Finder>(`${environment.backendApiBaseUrl}/finders/${finder._id}`, finder, {headers}).toPromise();
  }
}
