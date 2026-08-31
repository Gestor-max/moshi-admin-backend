"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsitesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let WebsitesService = class WebsitesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search) {
        const hasSearch = search && search.trim().length > 0;
        return this.prisma.website.findMany({
            where: hasSearch
                ? {
                    OR: [
                        { name: { contains: search } },
                        { url: { contains: search } },
                    ],
                }
                : undefined,
            include: {
                _count: {
                    select: { profile_websites: true },
                },
            },
        });
    }
    async findOne(id) {
        const site = await this.prisma.website.findFirst({
            where: { id },
            include: {
                profile_websites: {
                    include: { profile: true },
                },
            },
        });
        if (!site) {
            throw new common_1.NotFoundException('Website no encontrado');
        }
        return site;
    }
    async create(user_id, data) {
        return this.prisma.website.create({
            data: {
                name: data.name,
                url: data.url,
                user_id,
            },
        });
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.website.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.prisma.website.delete({
            where: { id },
        });
    }
    async findAllAccounts(user_id, rol, search) {
        const hasSearch = search && search.trim().length > 0;
        const whereProfile = rol === 1 ? {} : { profile: { user_id } };
        return this.prisma.profileWebsite.findMany({
            where: {
                ...whereProfile,
                OR: hasSearch
                    ? [
                        { email: { contains: search } },
                        { website: { name: { contains: search } } },
                        { profile: { name: { contains: search } } },
                        { profile: { lastname: { contains: search } } },
                    ]
                    : undefined,
            },
            include: {
                profile: true,
                website: true,
            },
        });
    }
    async findAccountsByProfile(user_id, rol, profile_id) {
        if (rol !== 1) {
            const profile = await this.prisma.profile.findFirst({
                where: { id: profile_id, user_id },
            });
            if (!profile) {
                throw new common_1.ForbiddenException('Perfil no encontrado o acceso denegado');
            }
        }
        return this.prisma.profileWebsite.findMany({
            where: { profile_id },
            include: { website: true },
        });
    }
    async createAccount(user_id, rol, data) {
        if (rol !== 1) {
            const profile = await this.prisma.profile.findFirst({
                where: { id: data.profile_id, user_id },
            });
            if (!profile) {
                throw new common_1.ForbiddenException('Perfil no encontrado o no pertenece a tu usuario');
            }
        }
        else {
            const profile = await this.prisma.profile.findUnique({
                where: { id: data.profile_id },
            });
            if (!profile) {
                throw new common_1.NotFoundException('Perfil no encontrado');
            }
        }
        const website = await this.prisma.website.findUnique({
            where: { id: data.website_id },
        });
        if (!website) {
            throw new common_1.NotFoundException('Website no encontrado');
        }
        const existing = await this.prisma.profileWebsite.findUnique({
            where: {
                profile_id_website_id: {
                    profile_id: data.profile_id,
                    website_id: data.website_id,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Este perfil ya tiene una cuenta registrada para el sitio web ${website.name}. Solo se permite 1 cuenta por sitio web por perfil.`);
        }
        return this.prisma.profileWebsite.create({
            data: {
                profile_id: data.profile_id,
                website_id: data.website_id,
                email: data.email,
                password: data.password,
                cookie: data.cookie || '',
            },
            include: {
                profile: true,
                website: true,
            },
        });
    }
    async updateAccount(user_id, rol, id, data) {
        const whereProfile = rol === 1 ? {} : { profile: { user_id } };
        const account = await this.prisma.profileWebsite.findFirst({
            where: {
                id,
                ...whereProfile,
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Cuenta no encontrada');
        }
        return this.prisma.profileWebsite.update({
            where: { id },
            data,
            include: {
                profile: true,
                website: true,
            },
        });
    }
    async deleteAccount(user_id, rol, id) {
        const whereProfile = rol === 1 ? {} : { profile: { user_id } };
        const account = await this.prisma.profileWebsite.findFirst({
            where: {
                id,
                ...whereProfile,
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Cuenta no encontrada');
        }
        return this.prisma.profileWebsite.delete({
            where: { id },
        });
    }
};
exports.WebsitesService = WebsitesService;
exports.WebsitesService = WebsitesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WebsitesService);
//# sourceMappingURL=websites.service.js.map