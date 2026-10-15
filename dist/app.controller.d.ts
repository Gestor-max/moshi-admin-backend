import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
export declare class AppController {
    private readonly appService;
    private prisma;
    constructor(appService: AppService, prisma: PrismaService);
    getHello(): string;
    getStats(req: any): Promise<{
        profiles: number;
        totalProfiles: number;
        activeProfiles: number;
        zombieProfiles: number;
        archivedProfiles: number;
        locations: any;
        scheduledActivities: number;
        proxies: number;
        users: number | undefined;
        websites: number;
        websiteAccounts: number;
        automations: number;
        chartDays: any[];
        latestFinished: {
            youtube: ({
                profile: {
                    id: number;
                    name: string;
                    lastname: string;
                    gmail: string | null;
                };
            } & {
                id: number;
                status: number;
                profile_id: number;
                kind: number;
                search_query: string | null;
                video_id: string | null;
                comment_video_id: string | null;
                likes_video_id: string | null;
                publish_date: string | null;
                publish_time: string | null;
                finished_at: Date | null;
                created_at: Date;
            })[];
            gmaps: ({
                profile: {
                    id: number;
                    name: string;
                    lastname: string;
                    gmail: string | null;
                };
            } & {
                id: number;
                status: number;
                profile_id: number;
                kind: number;
                search_query: string | null;
                publish_date: string | null;
                publish_time: string | null;
                finished_at: Date | null;
                created_at: Date;
                place_id: string | null;
                navigate_location: string | null;
                review_text: string | null;
                rating: number | null;
            })[];
            google: ({
                profile: {
                    id: number;
                    name: string;
                    lastname: string;
                    gmail: string | null;
                };
            } & {
                id: number;
                status: number;
                profile_id: number;
                search_query: string | null;
                publish_date: string | null;
                publish_time: string | null;
                finished_at: Date | null;
                created_at: Date;
            })[];
            browser: ({
                profile: {
                    id: number;
                    name: string;
                    lastname: string;
                    gmail: string | null;
                };
            } & {
                id: number;
                status: number;
                profile_id: number;
                publish_date: string | null;
                publish_time: string | null;
                finished_at: Date | null;
                created_at: Date;
                link: string | null;
            })[];
            quora: ({
                profile: {
                    id: number;
                    name: string;
                    lastname: string;
                    gmail: string | null;
                };
            } & {
                id: number;
                status: number;
                profile_id: number;
                kind: number;
                search_query: string | null;
                publish_date: string | null;
                publish_time: string | null;
                finished_at: Date | null;
                created_at: Date;
                question_id: string | null;
                answer_id: string | null;
                upvote_question_id: string | null;
                upvote_answer_id: string | null;
                comment_question_id: string | null;
                comment_answer_id: string | null;
            })[];
            medium: ({
                profile: {
                    id: number;
                    name: string;
                    lastname: string;
                    gmail: string | null;
                };
            } & {
                id: number;
                status: number;
                profile_id: number;
                kind: number;
                search_query: string | null;
                publish_date: string | null;
                publish_time: string | null;
                finished_at: Date | null;
                created_at: Date;
                post_id: string | null;
                claps_post_id: string | null;
                comment_post_id: string | null;
            })[];
        };
    }>;
}
