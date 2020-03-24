import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthServiceMock {
    constructor() { }

    public register(): Promise<any> {
        return Promise.resolve();
    }

    public login(): Promise<any> {
        return Promise.resolve();
    }

    public logout(): Promise<any> {
        return Promise.resolve();
    }
}
