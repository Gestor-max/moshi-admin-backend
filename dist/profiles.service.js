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
    async findAll(user_id, search, archived, zombie) {
        const hasSearch = search && search.trim().length > 0;
        let isArchivedCondition = false;
        if (archived === 'all') {
            isArchivedCondition = undefined;
        }
        else if (archived === 'true' || archived === true) {
            isArchivedCondition = true;
        }
        let isZombieCondition = 0;
        if (zombie === 'all') {
            isZombieCondition = undefined;
        }
        else if (zombie === 'true' || zombie === true || zombie === '1' || zombie === 1) {
            isZombieCondition = 1;
            if (archived === undefined) {
                isArchivedCondition = undefined;
            }
        }
        else if (zombie === 'false' || zombie === false || zombie === '0' || zombie === 0) {
            isZombieCondition = 0;
        }
        else if (archived === 'true' || archived === true) {
            isZombieCondition = undefined;
        }
        return this.prisma.profile.findMany({
            where: {
                user_id,
                is_archived: isArchivedCondition,
                is_zombie: isZombieCondition,
                OR: hasSearch
                    ? [
                        { name: { contains: search, mode: 'insensitive' } },
                        { lastname: { contains: search, mode: 'insensitive' } },
                        { gmail: { contains: search, mode: 'insensitive' } },
                        { email_recovery: { contains: search, mode: 'insensitive' } },
                        { profile_email: { contains: search, mode: 'insensitive' } },
                    ]
                    : undefined,
            },
            include: {
                proxy: true,
                location: true,
                location_proxy: true,
                location_proxy_alt: true,
                tag: true,
                profile_websites: {
                    include: {
                        website: true,
                    },
                },
                _count: {
                    select: {
                        google_activities: true,
                        youtube_activities: true,
                        gmaps_activities: true,
                        browser_activities: true,
                        quora_activities: true,
                        medium_activities: true,
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
                location: true,
                location_proxy: true,
                location_proxy_alt: true,
                tag: true,
                profile_websites: {
                    include: {
                        website: true,
                    },
                },
                _count: {
                    select: {
                        google_activities: true,
                        youtube_activities: true,
                        gmaps_activities: true,
                        browser_activities: true,
                        quora_activities: true,
                        medium_activities: true,
                    },
                },
            },
        });
    }
    async create(user_id, data) {
        const { empleo, educacion, ubicacion, proxy_id, location_id, location_proxy_id, location_proxy_alt_id, tag_id, ...rest } = data;
        return this.prisma.profile.create({
            data: {
                ...rest,
                user_id,
                proxy_id: proxy_id ? Number(proxy_id) : null,
                location_id: location_id ? Number(location_id) : null,
                location_proxy_id: location_proxy_id ? Number(location_proxy_id) : null,
                location_proxy_alt_id: location_proxy_alt_id ? Number(location_proxy_alt_id) : null,
                tag_id: tag_id ? Number(tag_id) : null,
                empleo: this.stringifyJsonField(empleo),
                educacion: this.stringifyJsonField(educacion),
                ubicacion: this.stringifyJsonField(ubicacion),
            },
            include: {
                proxy: true,
                location: true,
                location_proxy: true,
                location_proxy_alt: true,
                tag: true,
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
        delete updateData.id;
        delete updateData.user_id;
        delete updateData.proxy;
        delete updateData.location;
        delete updateData.location_proxy;
        delete updateData.location_proxy_alt;
        delete updateData.tag;
        delete updateData.profile_websites;
        delete updateData.activity_logs;
        delete updateData.created_at;
        delete updateData.updated_at;
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
        if (data.location_id !== undefined) {
            updateData.location_id = data.location_id ? Number(data.location_id) : null;
        }
        if (data.location_proxy_id !== undefined) {
            updateData.location_proxy_id = data.location_proxy_id ? Number(data.location_proxy_id) : null;
        }
        if (data.location_proxy_alt_id !== undefined) {
            updateData.location_proxy_alt_id = data.location_proxy_alt_id ? Number(data.location_proxy_alt_id) : null;
        }
        if (data.tag_id !== undefined) {
            updateData.tag_id = data.tag_id ? Number(data.tag_id) : null;
        }
        if (data.is_archived !== undefined) {
            updateData.is_archived = Boolean(data.is_archived);
        }
        if (data.is_zombie !== undefined) {
            updateData.is_zombie = Number(data.is_zombie) || (data.is_zombie === true ? 1 : 0);
        }
        return this.prisma.profile.updateMany({
            where: { id, user_id },
            data: updateData,
        });
    }
    async archive(user_id, id, is_archived = true) {
        return this.prisma.profile.updateMany({
            where: { id, user_id },
            data: { is_archived },
        });
    }
    async setZombie(user_id, id, is_zombie = 1) {
        const val = typeof is_zombie === 'boolean' ? (is_zombie ? 1 : 0) : Number(is_zombie);
        return this.prisma.profile.updateMany({
            where: { id, user_id },
            data: { is_zombie: val },
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