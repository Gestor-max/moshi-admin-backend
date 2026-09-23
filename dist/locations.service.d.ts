import { PrismaService } from './prisma.service';
export declare class LocationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user_id: number, search?: string): Promise<any>;
    findOne(user_id: number, id: number): Promise<any>;
    create(user_id: number, data: {
        state: string;
        location: string;
    }): Promise<any>;
    update(user_id: number, id: number, data: {
        state?: string;
        location?: string;
    }): Promise<any>;
    delete(user_id: number, id: number): Promise<any>;
}
