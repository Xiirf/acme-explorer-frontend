import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { AngularFireAuth } from '@angular/fire/auth';

import { Actor } from '../models/actor.model';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActorService } from './actor.service';
import { StorageService } from './storage.service';

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
              private actorService: ActorService,
              private storageService: StorageService) {
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
        .then(userCredential => {
          this.actorService.getActorByEmail(email)
          .then((actor: Actor) => {
            this.currentActor = actor;
            localStorage.setItem('currentActor', JSON.stringify(this.currentActor));
            localStorage.setItem('userCredential', JSON.stringify(userCredential));
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

  updateProfile(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
      this.http.put<Actor>(`${environment.backendApiBaseUrl}/actors/${actor._id}`, actor, {headers}).toPromise()
        .then(newActor => {
          this.currentActor = newActor;
          const user = this.fireAuth.auth.currentUser;
          user.updateEmail(actor.email);
          if (actor.password) {
            user.updatePassword(actor.password);
          }
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.storageService.removeItem('token');
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

  checkRole(roles: string): boolean {
    return true;
    /*let result = false;

    if (this.currentActor) {
      if (roles.indexOf(this.currentActor.role.toString()) !== -1) {
        result = true;
      } else {
        result = false;
      }
    } else {
      if (roles.indexOf('anonymous') !== -1) {
        result = true;
      } else {
        result = false;
      }
    }

    return result;*/
  }
}
