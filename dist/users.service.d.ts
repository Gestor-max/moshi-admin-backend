import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: number, data: {
        email?: string;
        name?: string;
        password?: string;
        status?: number;
        rol?: number;
    }): Promise<User>;
    updateStatus(id: number, status: number): Promise<User>;
    updateRole(id: number, rol: number): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
