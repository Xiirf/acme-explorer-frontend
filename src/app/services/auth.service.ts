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
    return new Promise<Actor>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(_ => {
          this.http.post<Actor>(`${environment.backendApiBaseUrl}/actors`, actor, httpOptions).toPromise()
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
    return 
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
