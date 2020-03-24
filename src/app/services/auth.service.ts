import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { AngularFireAuth } from '@angular/fire/auth';

import { Actor } from '../models/actor.model';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) { }

  register(actor: Actor): Promise<Actor> {
    return this.http.post<Actor>(`${environment.backendApiBaseUrl}/actors`, actor, httpOptions).toPromise();
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          resolve();
        }).catch(error => {
          reject(error);
        });
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          resolve();
        }).catch(error => {
          reject(error);
        });
    });
  }
}
