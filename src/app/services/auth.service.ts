import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { AngularFireAuth } from '@angular/fire/auth';

import { Actor } from '../models/actor.model';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActorService } from './actor.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentActor: Actor;

  constructor(private fireAuth: AngularFireAuth,
              private http: HttpClient,
              private actorService: ActorService) {
                if (localStorage.getItem('currentActor')) {
                  this.currentActor = JSON.parse(localStorage.getItem('currentActor'));
                }
              }

  register(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(_ => {
          this.http.post<Actor>(`${environment.backendApiBaseUrl}/actors`, actor, httpOptions).toPromise()
            .then(newActor => {
              this.currentActor = newActor;
              localStorage.setItem('currentActor', JSON.stringify(this.currentActor));
              resolve();
            })
            .catch(err => {
              this.fireAuth.auth.currentUser.delete();
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          this.actorService.getActorByEmail(email)
          .then((actor: Actor) => {
            this.currentActor = actor;
            localStorage.setItem('currentActor', JSON.stringify(this.currentActor));
            // Message co effectuée
            resolve(this.currentActor);
          }).catch(error => {
            // Message co failed
            reject(error);
          });
        }).catch(error => {
          reject(error);
        });
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          this.currentActor = null;
          resolve();
        }).catch(error => {
          reject(error);
        });
    });
  }

  getCurrentActor() {
    return this.currentActor;
  }
}
