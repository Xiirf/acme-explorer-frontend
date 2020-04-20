import { Entity } from './entity.model';

export class Dashboard extends Entity {
    statsNumberTripsByManager: Amms;
    statsNumberApplicationByTrips: Amms;
    statsPriceByTrips: Amms;
    ratioApplicationsByStatus: RatioApplicationsByStatus[];
    statsAveragePriceInFinders: StatsAveragePriceInFinders;
    statsTopKeyWords: string[];

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

class StatsAveragePriceInFinders {
    minAvg: number;
    maxAvg: number;
}
