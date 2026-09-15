import { PrismaService } from './prisma.service';
export interface CreateProfileDto {
    name: string;
    lastname: string;
    gmail?: string;
    gmail_password?: string;
    email_recovery?: string;
    profile_email?: string;
    profile_email_password?: string;
    bio?: string;
    img?: string;
    pais_iso?: string;
    mes_nac?: number;
    year_nac?: number;
    day_nac?: number;
    gender?: string;
    time_zone?: string;
    proxy_id?: number | null;
    empleo?: string | object;
    educacion?: string | object;
    ubicacion?: string | object;
    two_fa?: string;
    telefono?: string;
}
export declare class ProfilesService {
    private prisma;
    constructor(prisma: PrismaService);
    private stringifyJsonField;
    findAll(user_id: number, search?: string): Promise<({
        proxy: {
            id: number;
            password: string;
            user_id: number;
            username: string;
            ip: string;
            port: string;
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
        empleo: string | null;
        educacion: string | null;
        ubicacion: string | null;
        two_fa: string | null;
        telefono: string | null;
    })[]>;
    findOne(user_id: number, id: number): Promise<({
        proxy: {
            id: number;
            password: string;
            user_id: number;
            username: string;
            ip: string;
            port: string;
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
        empleo: string | null;
        educacion: string | null;
        ubicacion: string | null;
        two_fa: string | null;
        telefono: string | null;
    }) | null>;
    create(user_id: number, data: CreateProfileDto): Promise<{
        proxy: {
            id: number;
            password: string;
            user_id: number;
            username: string;
            ip: string;
            port: string;
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
        empleo: string | null;
        educacion: string | null;
        ubicacion: string | null;
        two_fa: string | null;
        telefono: string | null;
    }>;
    update(user_id: number, id: number, data: Partial<CreateProfileDto>): Promise<import(".prisma/client").Prisma.BatchPayload>;
    delete(user_id: number, id: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
