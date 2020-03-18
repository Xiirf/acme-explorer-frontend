import { Entity } from './entity.model';

export class Trip extends Entity {
    title: string;
    ticker: string;
    description: string;
    requirements: string[];
    start: Date;
    end: Date;
    pictures: string[];
    stages: Stage[];
    managerId: string;

    constructor() {
        super();
    }
}

class Stage {
    title: string;
    description: string;
    price: number;
}
