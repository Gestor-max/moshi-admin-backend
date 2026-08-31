import { PrismaService } from './prisma.service';
export declare class ProxiesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user_id: number, search?: string): Promise<{
        id: number;
        password: string;
        user_id: number;
        username: string;
        ip: string;
        port: string;
    }[]>;
    findOne(user_id: number, id: number): Promise<{
        id: number;
        password: string;
        user_id: number;
        username: string;
        ip: string;
        port: string;
    } | null>;
    create(user_id: number, data: {
        ip: string;
        port: string;
        username: string;
        password: string;
    }): Promise<{
        id: number;
        password: string;
        user_id: number;
        username: string;
        ip: string;
        port: string;
    }>;
    update(user_id: number, id: number, data: {
        ip?: string;
        port?: string;
        username?: string;
        password?: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    delete(user_id: number, id: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
