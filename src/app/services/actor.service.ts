import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Actor } from '../models/actor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  getActorByEmail(email: string): Promise<Actor> {
    return this.http.get<Actor>(`${environment.backendApiBaseUrl}/actors/email/${email}`).toPromise();
  }

  getActorById(actorId: string): Promise<Actor> {
    return this.http.get<Actor>(`${environment.backendApiBaseUrl}/actors/${actorId}`).toPromise();
  }

  getActors(): Promise<Actor[]> {
    return this.http.get<Actor[]>(`${environment.backendApiBaseUrl}/actors`).toPromise();
  }

  updateActorRole(idActor: string, role: string): Promise<Actor> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Actor>(`${environment.backendApiBaseUrl}/actors/${idActor}`, {role}, {headers}).toPromise();
  }

  updateActorState(idActor: string, banned: boolean): Promise<Actor> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.patch<Actor>(`${environment.backendApiBaseUrl}/actors/${idActor}/ban`, {banned}, {headers}).toPromise();
  }
}
