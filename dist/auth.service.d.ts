import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            rol: any;
            status: any;
        };
    }>;
    register(email: string, pass: string, name?: string, rol?: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
    updateProfile(userId: number, data: {
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
    adminUpdatePassword(userId: number, newPassword: string): Promise<{
        id: number;
        email: string;
        name: string | null;
        status: number;
        rol: number;
    }>;
}
