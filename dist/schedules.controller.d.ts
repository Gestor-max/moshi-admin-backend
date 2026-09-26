import { SchedulesService } from './schedules.service';
export declare class SchedulesController {
    private schedulesService;
    constructor(schedulesService: SchedulesService);
    findAll(req: any): Promise<any>;
    findOne(req: any, id: string): Promise<any>;
    create(req: any, body: {
        location_id: number;
        start_time: string;
        end_time: string;
        is_active?: boolean;
        rotate_proxy?: boolean;
        activities?: string[];
    }): Promise<any>;
    update(req: any, id: string, body: {
        location_id?: number;
        start_time?: string;
        end_time?: string;
        is_active?: boolean;
        rotate_proxy?: boolean;
        activities?: string[];
    }): Promise<any>;
    toggleActive(req: any, id: string): Promise<any>;
    delete(req: any, id: string): Promise<any>;
}
