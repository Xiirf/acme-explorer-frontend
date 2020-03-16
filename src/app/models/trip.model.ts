import { Entity } from './entity.model';

export class Trip extends Entity {
    title: string;
    description: string;
    requirements: string[];
    start: Date;
    end: Date;
    pictures: String[];
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
