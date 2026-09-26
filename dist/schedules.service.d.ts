import { PrismaService } from './prisma.service';
export declare class SchedulesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: number): Promise<any>;
    findOne(userId: number, id: number): Promise<any>;
    create(userId: number, data: {
        location_id: number;
        start_time: string;
        end_time: string;
        is_active?: boolean;
        rotate_proxy?: boolean;
        activities?: string[];
    }): Promise<any>;
    update(userId: number, id: number, data: {
        location_id?: number;
        start_time?: string;
        end_time?: string;
        is_active?: boolean;
        rotate_proxy?: boolean;
        activities?: string[];
    }): Promise<any>;
    toggleActive(userId: number, id: number): Promise<any>;
    delete(userId: number, id: number): Promise<any>;
}
