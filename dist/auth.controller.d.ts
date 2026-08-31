import { AuthService } from './auth.service';
import { UsersService } from './users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: {
        email: string;
        password: string;
        name?: string;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            rol: any;
            status: any;
        };
    }>;
    getProfile(req: any): any;
    updateProfile(req: any, body: {
        email?: string;
        name?: string;
        password?: string;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    createUser(body: {
        email: string;
        password: string;
        name?: string;
        rol?: number;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    getUsers(): Promise<Omit<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        status: number;
        rol: number;
    }, "password">[]>;
    updateUserStatus(id: number, body: {
        status: number;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    updateUserRole(id: number, body: {
        rol: number;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    updateUserPassword(id: number, body: {
        password: string;
    }): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
}
