import { Entity } from './entity.model';

export class Audit extends Entity {

    idAuditor: string;
    idTrip: string;
    createdAt: Date;
    title: string;
    description: string;
    optionalAttachments: string[];
    nameTrip?: string;
    nameAuditor?: string;

    constructor() {
        super();
    }
}
