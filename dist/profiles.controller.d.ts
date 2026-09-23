import { ProfilesService, CreateProfileDto } from './profiles.service';
export declare class ProfilesController {
    private profilesService;
    constructor(profilesService: ProfilesService);
    findAll(req: any, search: string, archived: string): Promise<({
        location: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        proxy: {
            id: number;
            password: string;
            user_id: number;
            username: string;
            ip: string;
            port: string;
        } | null;
        tag: {
            id: number;
            name: string;
            user_id: number;
            created_at: Date;
            color: string | null;
        } | null;
        location_proxy: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        location_proxy_alt: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        profile_websites: ({
            website: {
                id: number;
                name: string;
                user_id: number;
                url: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            profile_id: number;
            website_id: number;
            cookie: string;
        })[];
    } & {
        website: string | null;
        id: number;
        name: string;
        status: number;
        user_id: number;
        lastname: string;
        gmail: string | null;
        gmail_password: string | null;
        email_recovery: string | null;
        profile_email: string | null;
        profile_email_password: string | null;
        bio: string | null;
        img: string | null;
        username: string | null;
        pronouns: string | null;
        company_basic: string | null;
        location_basic: string | null;
        social_accounts: string | null;
        topic_about_you: string | null;
        profile_credential: string | null;
        description_html: string | null;
        pais_iso: string | null;
        mes_nac: number | null;
        year_nac: number | null;
        day_nac: number | null;
        gender: string | null;
        time_zone: string | null;
        proxy_id: number | null;
        location_id: number | null;
        location_proxy_id: number | null;
        location_proxy_alt_id: number | null;
        tag_id: number | null;
        is_archived: boolean;
        empleo: string | null;
        educacion: string | null;
        ubicacion: string | null;
        two_fa: string | null;
        telefono: string | null;
    })[]>;
    findOne(req: any, id: string): Promise<({
        location: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        proxy: {
            id: number;
            password: string;
            user_id: number;
            username: string;
            ip: string;
            port: string;
        } | null;
        tag: {
            id: number;
            name: string;
            user_id: number;
            created_at: Date;
            color: string | null;
        } | null;
        location_proxy: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        location_proxy_alt: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        profile_websites: ({
            website: {
                id: number;
                name: string;
                user_id: number;
                url: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            profile_id: number;
            website_id: number;
            cookie: string;
        })[];
    } & {
        website: string | null;
        id: number;
        name: string;
        status: number;
        user_id: number;
        lastname: string;
        gmail: string | null;
        gmail_password: string | null;
        email_recovery: string | null;
        profile_email: string | null;
        profile_email_password: string | null;
        bio: string | null;
        img: string | null;
        username: string | null;
        pronouns: string | null;
        company_basic: string | null;
        location_basic: string | null;
        social_accounts: string | null;
        topic_about_you: string | null;
        profile_credential: string | null;
        description_html: string | null;
        pais_iso: string | null;
        mes_nac: number | null;
        year_nac: number | null;
        day_nac: number | null;
        gender: string | null;
        time_zone: string | null;
        proxy_id: number | null;
        location_id: number | null;
        location_proxy_id: number | null;
        location_proxy_alt_id: number | null;
        tag_id: number | null;
        is_archived: boolean;
        empleo: string | null;
        educacion: string | null;
        ubicacion: string | null;
        two_fa: string | null;
        telefono: string | null;
    }) | null>;
    create(req: any, body: CreateProfileDto): Promise<{
        location: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        proxy: {
            id: number;
            password: string;
            user_id: number;
            username: string;
            ip: string;
            port: string;
        } | null;
        tag: {
            id: number;
            name: string;
            user_id: number;
            created_at: Date;
            color: string | null;
        } | null;
        location_proxy: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        location_proxy_alt: {
            location: string;
            id: number;
            user_id: number;
            state: string;
        } | null;
        profile_websites: ({
            website: {
                id: number;
                name: string;
                user_id: number;
                url: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            profile_id: number;
            website_id: number;
            cookie: string;
        })[];
    } & {
        website: string | null;
        id: number;
        name: string;
        status: number;
        user_id: number;
        lastname: string;
        gmail: string | null;
        gmail_password: string | null;
        email_recovery: string | null;
        profile_email: string | null;
        profile_email_password: string | null;
        bio: string | null;
        img: string | null;
        username: string | null;
        pronouns: string | null;
        company_basic: string | null;
        location_basic: string | null;
        social_accounts: string | null;
        topic_about_you: string | null;
        profile_credential: string | null;
        description_html: string | null;
        pais_iso: string | null;
        mes_nac: number | null;
        year_nac: number | null;
        day_nac: number | null;
        gender: string | null;
        time_zone: string | null;
        proxy_id: number | null;
        location_id: number | null;
        location_proxy_id: number | null;
        location_proxy_alt_id: number | null;
        tag_id: number | null;
        is_archived: boolean;
        empleo: string | null;
        educacion: string | null;
        ubicacion: string | null;
        two_fa: string | null;
        telefono: string | null;
    }>;
    update(req: any, id: string, body: Partial<CreateProfileDto>): Promise<import(".prisma/client").Prisma.BatchPayload>;
    archive(req: any, id: string, body: {
        is_archived?: boolean;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    delete(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
