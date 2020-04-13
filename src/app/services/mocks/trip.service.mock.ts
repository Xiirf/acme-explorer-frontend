import { Trip } from 'src/app/models/trip.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TripServiceMock {
    start = new Date();
    end = new Date(this.start.getDate() + 20);

    trips: Trip[] = [{
        _id: '507f1f77bcf86cd799439012',
        version: 0,
        title: 'titleTrip1',
        ticker: '20/03/24-AAAA',
        description: 'descTrip1',
        requirements: ['req1Trip1', 'req2Trip1'],
        start: this.start,
        end: this.end,
        pictures: ['pictureTrip1'],
        stages: [{
            title: 'stage1',
            description: 'descStage1',
            price: 250
        }],
        managerId: '507f1f77bcf86cd799439011',
        price: 250
    },
    {
        _id: '507f1f77bcf86cd799439013',
        version: 0,
        title: 'titleTrip1',
        ticker: '20/03/24-AAAA',
        description: 'descTrip1',
        requirements: ['req1Trip1', 'req2Trip1'],
        start: this.start,
        end: this.end,
        pictures: ['pictureTrip1'],
        stages: [{
            title: 'stage1',
            description: 'descStage1',
            price: 250
        },
        {
            title: 'stage2',
            description: 'descStage2',
            price: 300
        }],
        managerId: '507f1f77bcf86cd799439010',
        price: 550
    }];

    constructor() { }

    public getTrips(): Promise<Trip[]> {
        return Promise.resolve(this.trips);
    }
}