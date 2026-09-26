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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let SchedulesService = class SchedulesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        const schedules = await this.prisma.schedule.findMany({
            where: { user_id: userId },
            include: {
                location: true,
                schedule_activity: true,
            },
            orderBy: { start_time: 'asc' },
        });
        return schedules.map((s) => ({
            ...s,
            activities: s.schedule_activity?.activities || [],
        }));
    }
    async findOne(userId, id) {
        const schedule = await this.prisma.schedule.findFirst({
            where: { id, user_id: userId },
            include: {
                location: true,
                schedule_activity: true,
            },
        });
        if (!schedule) {
            throw new common_1.NotFoundException('Horario de agenda no encontrado');
        }
        return {
            ...schedule,
            activities: schedule.schedule_activity?.activities || [],
        };
    }
    async create(userId, data) {
        const locationId = Number(data.location_id);
        const activities = Array.isArray(data.activities) ? data.activities : [];
        const schedule = await this.prisma.schedule.create({
            data: {
                user_id: userId,
                location_id: locationId,
                start_time: data.start_time || '08:00',
                end_time: data.end_time || '12:00',
                is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
                rotate_proxy: Boolean(data.rotate_proxy),
                schedule_activity: {
                    create: {
                        activities: activities,
                    },
                },
            },
            include: {
                location: true,
                schedule_activity: true,
            },
        });
        return {
            ...schedule,
            activities: schedule.schedule_activity?.activities || [],
        };
    }
    async update(userId, id, data) {
        const existing = await this.prisma.schedule.findFirst({
            where: { id, user_id: userId },
            include: { schedule_activity: true },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Horario de agenda no encontrado');
        }
        const updateScheduleData = {};
        if (data.location_id !== undefined)
            updateScheduleData.location_id = Number(data.location_id);
        if (data.start_time !== undefined)
            updateScheduleData.start_time = data.start_time;
        if (data.end_time !== undefined)
            updateScheduleData.end_time = data.end_time;
        if (data.is_active !== undefined)
            updateScheduleData.is_active = Boolean(data.is_active);
        if (data.rotate_proxy !== undefined)
            updateScheduleData.rotate_proxy = Boolean(data.rotate_proxy);
        await this.prisma.schedule.update({
            where: { id },
            data: updateScheduleData,
        });
        if (data.activities !== undefined) {
            const activities = Array.isArray(data.activities) ? data.activities : [];
            await this.prisma.scheduleActivity.upsert({
                where: { schedule_id: id },
                create: {
                    schedule_id: id,
                    activities: activities,
                },
                update: {
                    activities: activities,
                },
            });
        }
        return this.findOne(userId, id);
    }
    async toggleActive(userId, id) {
        const existing = await this.prisma.schedule.findFirst({
            where: { id, user_id: userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Horario de agenda no encontrado');
        }
        const updated = await this.prisma.schedule.update({
            where: { id },
            data: { is_active: !existing.is_active },
            include: {
                location: true,
                schedule_activity: true,
            },
        });
        return {
            ...updated,
            activities: updated.schedule_activity?.activities || [],
        };
    }
    async delete(userId, id) {
        const existing = await this.prisma.schedule.findFirst({
            where: { id, user_id: userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Horario de agenda no encontrado');
        }
        return this.prisma.schedule.delete({
            where: { id },
        });
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map