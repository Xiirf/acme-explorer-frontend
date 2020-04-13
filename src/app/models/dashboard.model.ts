import { Entity } from './entity.model';

export class Dashboard extends Entity {
    statsNumberTripsByManager: Amms;
    statsNumberApplicationByTrips: Amms;
    statsPriceByTrips: Amms;
    ratioApplicationsByStatus: RatioApplicationsByStatus[];
    statsAveragePriceInFinders: Amms;
    statsTopKeyWords: object;

    constructor() {
        super();
    }
}

class Amms extends Entity {
    avg: number;
    min: number;
    max: number;
    std: number;
}

class RatioApplicationsByStatus {
    status: string;
    ratio: number;
}