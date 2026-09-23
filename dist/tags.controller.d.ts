import { TagsService } from './tags.service';
export declare class TagsController {
    private tagsService;
    constructor(tagsService: TagsService);
    findAll(req: any, search: string): Promise<any>;
    findOne(req: any, id: string): Promise<any>;
    create(req: any, body: {
        name: string;
        color?: string;
    }): Promise<any>;
    update(req: any, id: string, body: {
        name?: string;
        color?: string;
    }): Promise<any>;
    delete(req: any, id: string): Promise<any>;
}
