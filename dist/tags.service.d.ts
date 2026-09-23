import { PrismaService } from './prisma.service';
export declare class TagsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user_id: number, search?: string): Promise<any>;
    findOne(user_id: number, id: number): Promise<any>;
    create(user_id: number, data: {
        name: string;
        color?: string;
    }): Promise<any>;
    update(user_id: number, id: number, data: {
        name?: string;
        color?: string;
    }): Promise<any>;
    delete(user_id: number, id: number): Promise<any>;
}
