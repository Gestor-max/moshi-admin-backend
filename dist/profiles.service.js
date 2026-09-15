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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let ProfilesService = class ProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    stringifyJsonField(val) {
        if (!val)
            return '';
        if (typeof val === 'string')
            return val;
        try {
            return JSON.stringify(val);
        }
        catch {
            return '';
        }
    }
    async findAll(user_id, search) {
        const hasSearch = search && search.trim().length > 0;
        return this.prisma.profile.findMany({
            where: {
                user_id,
                OR: hasSearch
                    ? [
                        { name: { contains: search } },
                        { lastname: { contains: search } },
                        { gmail: { contains: search } },
                        { email_recovery: { contains: search } },
                        { profile_email: { contains: search } },
                    ]
                    : undefined,
            },
            include: {
                proxy: true,
                profile_websites: {
                    include: {
                        website: true,
                    },
                },
            },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(user_id, id) {
        return this.prisma.profile.findFirst({
            where: { id, user_id },
            include: {
                proxy: true,
                profile_websites: {
                    include: {
                        website: true,
                    },
                },
            },
        });
    }
    async create(user_id, data) {
        const { empleo, educacion, ubicacion, proxy_id, ...rest } = data;
        return this.prisma.profile.create({
            data: {
                ...rest,
                user_id,
                proxy_id: proxy_id ? Number(proxy_id) : null,
                empleo: this.stringifyJsonField(empleo),
                educacion: this.stringifyJsonField(educacion),
                ubicacion: this.stringifyJsonField(ubicacion),
            },
            include: {
                proxy: true,
                profile_websites: {
                    include: {
                        website: true,
                    },
                },
            },
        });
    }
    async update(user_id, id, data) {
        const updateData = { ...data };
        if (data.empleo !== undefined) {
            updateData.empleo = this.stringifyJsonField(data.empleo);
        }
        if (data.educacion !== undefined) {
            updateData.educacion = this.stringifyJsonField(data.educacion);
        }
        if (data.ubicacion !== undefined) {
            updateData.ubicacion = this.stringifyJsonField(data.ubicacion);
        }
        if (data.proxy_id !== undefined) {
            updateData.proxy_id = data.proxy_id ? Number(data.proxy_id) : null;
        }
        return this.prisma.profile.updateMany({
            where: { id, user_id },
            data: updateData,
        });
    }
    async delete(user_id, id) {
        return this.prisma.profile.deleteMany({
            where: { id, user_id },
        });
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map