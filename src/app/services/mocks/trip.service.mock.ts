import { Trip } from 'src/app/models/trip.model';
import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';
import { formatDate } from '@angular/common';
import { customAlphabet  } from 'nanoid';

@Injectable({ providedIn: 'root' })
export class TripServiceMock {

    trips: Trip[];
    nbTrip: number;

    pictures = ['https://i.imgur.com/W9LJEYw.jpg', 'https://i.imgur.com/Za6WIAx.jpg', 'https://i.imgur.com/zqeiTar.jpg'];

    constructor() {
        this.trips = [];
        this.nbTrip = faker.random.number(40) + 10; // Generate between 10 and 50 trip;
        for (let i = 0; i < this.nbTrip; i++ ) {
            // Date
            const start = faker.date.future();
            const end = new Date(start.getDate() + 20);

            // Ticker
            const date = formatDate(new Date(), 'yymmdd', 'en');
            const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);
            let ticker = [date, nanoid()].join('-');
            // Check ticker is unique
            while (this.trips.find(trip => trip.ticker === ticker)) {
                ticker = [date, nanoid()].join('-');
            }

            // Requirements
            const nbRandomRequirement = faker.random.number(4);
            const requirements = [];
            for (let y = 0; y < nbRandomRequirement; y++) {
                requirements.push(faker.lorem.word());
            }

            // Stages
            const nbRandomStage = faker.random.number(8);
            const stages = [];
            for (let y = 0; y < nbRandomStage; y++) {
                stages.push({
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraph(),
                    price: faker.random.number(800) + 100
                });
            }

            // Price
            let price: number;
            for (const stage of stages) {
                price += stage.price;
            }

            this.trips.push({
                _id: faker.random.uuid(),
                version: 0,
                title: faker.address.city(),
                ticker,
                description: faker.lorem.paragraph(),
                requirements,
                start,
                end,
                pictures: faker.random.arrayElement(this.pictures),
                stages,
                managerId: faker.random.uuid(),
                price
            });
        }
    }

    public getTrips(): Promise<Trip[]> {
        return Promise.resolve(this.trips);
    }

    public getTripsManager(): Promise<Trip[]> {
        return Promise.resolve(this.trips);
    }

    public getTrip(): Promise<Trip> {
        return Promise.resolve(this.trips[0]);
    }

    public getTripsPage(start: number, psize: number): Promise<Trip[]> {
        return Promise.resolve(this.trips.slice(start, start + psize));
    }
}
