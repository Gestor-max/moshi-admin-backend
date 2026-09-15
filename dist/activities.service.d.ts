import { PrismaService } from './prisma.service';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    private verifyProfileOwnership;
    getActivitiesByProfile(userId: number, profileId: number): Promise<{
        youtube: {
            id: number;
            status: number;
            profile_id: number;
            search_query: string | null;
            video_id: string | null;
            comment_video_id: string | null;
            likes_video_id: string | null;
            publish_date: string | null;
            publish_time: string | null;
            finished_at: Date | null;
            created_at: Date;
        }[];
        quora: {
            id: number;
            status: number;
            profile_id: number;
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
        }[];
        medium: {
            id: number;
            status: number;
            profile_id: number;
            search_query: string | null;
            publish_date: string | null;
            publish_time: string | null;
            finished_at: Date | null;
            created_at: Date;
            post_id: string | null;
            claps_post_id: string | null;
            comment_post_id: string | null;
        }[];
        browser: {
            id: number;
            status: number;
            profile_id: number;
            publish_date: string | null;
            publish_time: string | null;
            finished_at: Date | null;
            created_at: Date;
            link: string | null;
        }[];
        google: {
            id: number;
            status: number;
            profile_id: number;
            search_query: string | null;
            publish_date: string | null;
            publish_time: string | null;
            finished_at: Date | null;
            created_at: Date;
        }[];
        gmaps: {
            id: number;
            status: number;
            profile_id: number;
            search_query: string | null;
            publish_date: string | null;
            publish_time: string | null;
            finished_at: Date | null;
            created_at: Date;
            place_id: string | null;
            navigate_location: string | null;
            review_text: string | null;
            rating: number | null;
        }[];
    }>;
    createActivity(userId: number, platform: string, body: any): Promise<{
        id: number;
        status: number;
        profile_id: number;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
        link: string | null;
    } | {
        id: number;
        status: number;
        profile_id: number;
        search_query: string | null;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
    }>;
    updateActivity(userId: number, platform: string, id: number, body: any): Promise<{
        id: number;
        status: number;
        profile_id: number;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
        link: string | null;
    } | {
        id: number;
        status: number;
        profile_id: number;
        search_query: string | null;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
    } | undefined>;
    updateActivityStatus(userId: number, platform: string, id: number, status: number): Promise<{
        id: number;
        status: number;
        profile_id: number;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
        link: string | null;
    } | {
        id: number;
        status: number;
        profile_id: number;
        search_query: string | null;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
    } | undefined>;
    finishActivity(userId: number, platform: string, id: number): Promise<{
        id: number;
        status: number;
        profile_id: number;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
        link: string | null;
    } | {
        id: number;
        status: number;
        profile_id: number;
        search_query: string | null;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
    } | undefined>;
    deleteActivity(userId: number, platform: string, id: number): Promise<{
        id: number;
        status: number;
        profile_id: number;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
        link: string | null;
    } | {
        id: number;
        status: number;
        profile_id: number;
        search_query: string | null;
        publish_date: string | null;
        publish_time: string | null;
        finished_at: Date | null;
        created_at: Date;
    } | undefined>;
}
