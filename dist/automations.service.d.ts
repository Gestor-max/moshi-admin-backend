import { PrismaService } from './prisma.service';
export interface CreateAutomationDto {
    name: string;
    description: string;
    filename: string;
}
export declare class AutomationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(rol: number, search?: string): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(id: number, rol: number): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    create(data: CreateAutomationDto): Promise<{
        id: number;
        name: string;
        description: string;
        filename: string;
    }>;
    update(id: number, data: Partial<CreateAutomationDto>): Promise<{
        id: number;
        name: string;
        description: string;
        filename: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        filename: string;
    }>;
}
