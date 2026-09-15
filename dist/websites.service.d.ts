import { PrismaService } from './prisma.service';
export interface CreateWebsiteDto {
    name: string;
    url: string;
}
export interface CreateProfileWebsiteDto {
    profile_id: number;
    website_id: number;
    email: string;
    password: string;
    cookie?: string;
}
export declare class WebsitesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string): Promise<({
        _count: {
            profile_websites: number;
        };
    } & {
        id: number;
        name: string;
        user_id: number;
        url: string;
    })[]>;
    findOne(id: number): Promise<{
        profile_websites: ({
            profile: {
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
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
    create(user_id: number, data: CreateWebsiteDto): Promise<{
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
    update(id: number, data: Partial<CreateWebsiteDto>): Promise<{
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
    findAllAccounts(user_id: number, rol: number, search?: string): Promise<({
        profile: {
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
        };
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
    })[]>;
    findAccountsByProfile(user_id: number, rol: number, profile_id: number): Promise<({
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
    })[]>;
    createAccount(user_id: number, rol: number, data: CreateProfileWebsiteDto): Promise<{
        profile: {
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
        };
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
    }>;
    updateAccount(user_id: number, rol: number, id: number, data: Partial<CreateProfileWebsiteDto>): Promise<{
        profile: {
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
        };
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
    }>;
    deleteAccount(user_id: number, rol: number, id: number): Promise<{
        id: number;
        email: string;
        password: string;
        profile_id: number;
        website_id: number;
        cookie: string;
    }>;
}
