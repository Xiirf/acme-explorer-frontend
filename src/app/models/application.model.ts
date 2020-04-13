import { Entity } from './entity.model';

export class Application extends Entity {
    idExplorer: string;
    idTrip: string;
    payedAt: Date;
    createdAt: Date;
    status: string;
    comments: string[];
    reasonRejected?: string;
    nameTrip?: string;
    nameExplo?: string;

    constructor() {
        super();
    }
}
