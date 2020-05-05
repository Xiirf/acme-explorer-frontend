import { Entity } from './entity.model';

export class Application extends Entity {
    idExplorer: string;
    idTrip: string;
    payedAt?: Date;
    createdAt: Date;
    status: string;
    comments: string[];
    reasonRejected?: string;
    nameExplo?: string;
    nameTrip?: string;
    price?: number;

    constructor() {
        super();
    }
}
