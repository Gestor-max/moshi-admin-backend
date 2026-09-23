import { LocationsService } from './locations.service';
export declare class LocationsController {
    private locationsService;
    constructor(locationsService: LocationsService);
    findAll(req: any, search: string): Promise<any>;
    findOne(req: any, id: string): Promise<any>;
    create(req: any, body: {
        state: string;
        location: string;
    }): Promise<any>;
    update(req: any, id: string, body: {
        state?: string;
        location?: string;
    }): Promise<any>;
    delete(req: any, id: string): Promise<any>;
}
