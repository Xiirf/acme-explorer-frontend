import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
}
