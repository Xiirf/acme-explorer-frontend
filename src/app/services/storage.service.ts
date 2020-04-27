import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class StorageService {

  private storageSub = new Subject<string>();

  private keyWord = new Subject<string>();

  watchKeyWord(): Observable<any> {
    return this.keyWord.asObservable();
  }

  setKeyWord(keyWord: string) {
    this.keyWord.next(keyWord);
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('changed');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    if (key === 'token') {
      localStorage.removeItem('currentActor');
    }
    this.storageSub.next('changed');
  }
}
