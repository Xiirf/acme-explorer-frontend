import { Entity } from './entity.model';

export class Dashboard extends Entity {
    statsNumberTripsByManager: Amms;
    statsNumberApplicationByTrips: Amms;
    statsPriceByTrips: Amms;
    statsTopKeyWords: StatsTopKeyWords[];
    ratioApplicationsByStatus: RatioApplicationsByStatus[];
    statsAveragePriceInFinders: StatsAveragePriceInFinders;

    constructor() {
        super();
    }
}

class Amms extends Entity {
    avg: number;
    min: number;
    max: number;
    stdDeviation: number;
}

class RatioApplicationsByStatus {
    status: string;
    ratio: number;
}

class StatsAveragePriceInFinders {
    minAvg: number;
    maxAvg: number;
}

class StatsTopKeyWords {
    keyWord: string;
}
