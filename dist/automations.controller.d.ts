import { AutomationsService, CreateAutomationDto } from './automations.service';
export declare class AutomationsController {
    private automationsService;
    constructor(automationsService: AutomationsService);
    findAll(req: any, search: string): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(req: any, id: number): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    create(body: CreateAutomationDto): Promise<{
        id: number;
        name: string;
        description: string;
        filename: string;
    }>;
    update(id: number, body: Partial<CreateAutomationDto>): Promise<{
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
