import { Entity } from './entity.model';

export class Sponsorship extends Entity {
    banner: string[];
    link: string;
    price: number;
    payed: boolean;
    // tslint:disable-next-line: variable-name
    sponsor_id: string;
    // tslint:disable-next-line: variable-name
    trip_id: string;
    createdAt: Date;
    nameTrip?: string;

    constructor() {
        super();
    }
}
