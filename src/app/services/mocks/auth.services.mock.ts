import { Injectable } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';

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

    public getCurrentActor() {
        return {
            _id: '5e8f36f442c7af00177be06f',
            banned: false,
            name: 'TestMajEmail',
            surname: 'test',
            phone: '54654',
            password: '$2b$05$rrVYY0.uM8cYve9rPJ.Mu.4WRIwtfxIkAZEF.dPpEYGIDB8.d8Dku',
            email: 'flavientestmaj@test.com',
            adress: 'lieu',
            role: 'Explorer',
            createdAt: new Date()
        };
    }
}
