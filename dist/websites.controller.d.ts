import { WebsitesService, CreateWebsiteDto, CreateProfileWebsiteDto } from './websites.service';
export declare class WebsitesController {
    private websitesService;
    constructor(websitesService: WebsitesService);
    findAll(search: string): Promise<({
        _count: {
            profile_websites: number;
        };
    } & {
        id: number;
        name: string;
        user_id: number;
        url: string;
    })[]>;
    findAllAccounts(req: any, search: string): Promise<({
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
    findAccountsByProfile(req: any, profileId: string): Promise<({
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
    createAccount(req: any, body: CreateProfileWebsiteDto): Promise<{
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
    updateAccount(req: any, id: string, body: Partial<CreateProfileWebsiteDto>): Promise<{
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
    deleteAccount(req: any, id: string): Promise<{
        id: number;
        email: string;
        password: string;
        profile_id: number;
        website_id: number;
        cookie: string;
    }>;
    findOne(id: string): Promise<{
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
    create(req: any, body: CreateWebsiteDto): Promise<{
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
    update(id: string, body: Partial<CreateWebsiteDto>): Promise<{
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
    delete(id: string): Promise<{
        id: number;
        name: string;
        user_id: number;
        url: string;
    }>;
}
