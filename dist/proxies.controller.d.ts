import { ProxiesService } from './proxies.service';
export declare class ProxiesController {
    private proxiesService;
    constructor(proxiesService: ProxiesService);
    findAll(req: any, search: string): Promise<{
        id: number;
        password: string;
        user_id: number;
        username: string;
        ip: string;
        port: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: number;
        password: string;
        user_id: number;
        username: string;
        ip: string;
        port: string;
    } | null>;
    create(req: any, body: {
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
    update(req: any, id: string, body: {
        ip?: string;
        port?: string;
        username?: string;
        password?: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    delete(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
