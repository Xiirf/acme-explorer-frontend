import { Entity } from './entity.model';

export class Finder extends Entity {
    idExplorer: string;
    keyWord: string;
    priceMin: number;
    priceMax: number;
    dateMin: Date;
    dateMax: Date;
}
