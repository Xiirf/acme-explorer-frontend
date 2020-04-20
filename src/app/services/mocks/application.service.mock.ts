import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';
import { formatDate } from '@angular/common';
import { customAlphabet  } from 'nanoid';
import { Application } from 'src/app/models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationServiceMock {

    applications: Application[];
    nbApplication: number;

    pictures = ['https://i.imgur.com/W9LJEYw.jpg', 'https://i.imgur.com/Za6WIAx.jpg', 'https://i.imgur.com/zqeiTar.jpg'];

    constructor() {
        this.applications = [];
        this.nbApplication = faker.random.number(40) + 10; // Generate between 10 and 50 application;
        for (let i = 0; i < this.nbApplication; i++ ) {
            // Date
            const createdAt = faker.date.past();

            // Requirements
            const nbComments = faker.random.number(4);
            const comments = [];
            for (let y = 0; y < nbComments; y++) {
                comments.push(faker.lorem.word());
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

            this.applications.push({
                _id: faker.random.uuid(),
                version: 0,
                idExplorer: faker.random.uuid(),
                idTrip: faker.random.uuid(),
                createdAt,
                status: faker.random.arrayElement(['REJECTED', 'PENDING', 'DUE', 'ACCEPTED', 'CANCELLED']),
                comments,
                nameExplo: faker.lorem.word(),
                nameTrip: faker.lorem.word()
            });
        }
    }

    public getApplications(): Promise<Application[]> {
        return Promise.resolve(this.applications);
    }

    public getApplication(): Promise<Application> {
        return Promise.resolve(this.applications[0]);
    }
}
