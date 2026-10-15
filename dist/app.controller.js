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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("./prisma.service");
let AppController = class AppController {
    appService;
    prisma;
    constructor(appService, prisma) {
        this.appService = appService;
        this.prisma = prisma;
    }
    getHello() {
        return this.appService.getHello();
    }
    async getStats(req) {
        const user_id = req.user.user_id;
        const isAdmin = req.user.rol === 1;
        const whereUser = isAdmin ? {} : { user_id };
        const whereProfile = isAdmin ? {} : { profile: { user_id } };
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 14);
        fifteenDaysAgo.setHours(0, 0, 0, 0);
        const [totalProfiles, activeProfiles, zombieProfiles, archivedProfiles, locations, proxies, websites, websiteAccounts, automations, users, pendingYt, pendingGm, pendingGg, pendingBr, pendingQ, pendingMed, finishedYtList, finishedGmList, finishedGgList, finishedBrList, finishedQList, finishedMedList, latestYt, latestGm, latestGg, latestBr, latestQ, latestMed,] = await Promise.all([
            this.prisma.profile.count({ where: whereUser }),
            this.prisma.profile.count({ where: { ...whereUser, is_archived: false, is_zombie: 0 } }),
            this.prisma.profile.count({ where: { ...whereUser, is_zombie: 1, is_archived: false } }),
            this.prisma.profile.count({ where: { ...whereUser, is_archived: true } }),
            this.prisma.location.count({ where: whereUser }),
            this.prisma.proxy.count({ where: whereUser }),
            this.prisma.website.count({ where: whereUser }),
            this.prisma.profileWebsite.count({ where: whereProfile }),
            this.prisma.automation.count(),
            this.prisma.user.count(),
            this.prisma.youtubeActivity.count({ where: { ...whereProfile, status: 0 } }),
            this.prisma.gmapsActivity.count({ where: { ...whereProfile, status: 0 } }),
            this.prisma.googleActivity.count({ where: { ...whereProfile, status: 0 } }),
            this.prisma.browserActivity.count({ where: { ...whereProfile, status: 0 } }),
            this.prisma.quoraActivity.count({ where: { ...whereProfile, status: 0 } }),
            this.prisma.mediumActivity.count({ where: { ...whereProfile, status: 0 } }),
            this.prisma.youtubeActivity.findMany({
                where: { ...whereProfile, status: 1, finished_at: { gte: fifteenDaysAgo } },
                select: { finished_at: true },
            }),
            this.prisma.gmapsActivity.findMany({
                where: { ...whereProfile, status: 1, finished_at: { gte: fifteenDaysAgo } },
                select: { finished_at: true },
            }),
            this.prisma.googleActivity.findMany({
                where: { ...whereProfile, status: 1, finished_at: { gte: fifteenDaysAgo } },
                select: { finished_at: true },
            }),
            this.prisma.browserActivity.findMany({
                where: { ...whereProfile, status: 1, finished_at: { gte: fifteenDaysAgo } },
                select: { finished_at: true },
            }),
            this.prisma.quoraActivity.findMany({
                where: { ...whereProfile, status: 1, finished_at: { gte: fifteenDaysAgo } },
                select: { finished_at: true },
            }),
            this.prisma.mediumActivity.findMany({
                where: { ...whereProfile, status: 1, finished_at: { gte: fifteenDaysAgo } },
                select: { finished_at: true },
            }),
            this.prisma.youtubeActivity.findMany({
                where: { ...whereProfile, status: 1 },
                orderBy: { finished_at: 'desc' },
                take: 5,
                include: { profile: { select: { id: true, name: true, lastname: true, gmail: true } } },
            }),
            this.prisma.gmapsActivity.findMany({
                where: { ...whereProfile, status: 1 },
                orderBy: { finished_at: 'desc' },
                take: 5,
                include: { profile: { select: { id: true, name: true, lastname: true, gmail: true } } },
            }),
            this.prisma.googleActivity.findMany({
                where: { ...whereProfile, status: 1 },
                orderBy: { finished_at: 'desc' },
                take: 5,
                include: { profile: { select: { id: true, name: true, lastname: true, gmail: true } } },
            }),
            this.prisma.browserActivity.findMany({
                where: { ...whereProfile, status: 1 },
                orderBy: { finished_at: 'desc' },
                take: 5,
                include: { profile: { select: { id: true, name: true, lastname: true, gmail: true } } },
            }),
            this.prisma.quoraActivity.findMany({
                where: { ...whereProfile, status: 1 },
                orderBy: { finished_at: 'desc' },
                take: 5,
                include: { profile: { select: { id: true, name: true, lastname: true, gmail: true } } },
            }),
            this.prisma.mediumActivity.findMany({
                where: { ...whereProfile, status: 1 },
                orderBy: { finished_at: 'desc' },
                take: 5,
                include: { profile: { select: { id: true, name: true, lastname: true, gmail: true } } },
            }),
        ]);
        const scheduledActivities = pendingYt + pendingGm + pendingGg + pendingBr + pendingQ + pendingMed;
        const chartDays = [];
        const dateMap = new Map();
        for (let i = 14; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const isoKey = d.toISOString().split('T')[0];
            const dayLabel = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
            const entry = {
                date: isoKey,
                label: dayLabel,
                total: 0,
                youtube: 0,
                gmaps: 0,
                google: 0,
                browser: 0,
                quora: 0,
                medium: 0,
            };
            chartDays.push(entry);
            dateMap.set(isoKey, entry);
        }
        const processItems = (items, key) => {
            for (const item of items) {
                if (!item.finished_at)
                    continue;
                const iso = new Date(item.finished_at).toISOString().split('T')[0];
                const dayEntry = dateMap.get(iso);
                if (dayEntry) {
                    dayEntry[key] += 1;
                    dayEntry.total += 1;
                }
            }
        };
        processItems(finishedYtList, 'youtube');
        processItems(finishedGmList, 'gmaps');
        processItems(finishedGgList, 'google');
        processItems(finishedBrList, 'browser');
        processItems(finishedQList, 'quora');
        processItems(finishedMedList, 'medium');
        return {
            profiles: totalProfiles,
            totalProfiles,
            activeProfiles,
            zombieProfiles,
            archivedProfiles,
            locations,
            scheduledActivities,
            proxies,
            users: isAdmin ? users : undefined,
            websites,
            websiteAccounts,
            automations,
            chartDays,
            latestFinished: {
                youtube: latestYt,
                gmaps: latestGm,
                google: latestGg,
                browser: latestBr,
                quora: latestQ,
                medium: latestMed,
            },
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getStats", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        prisma_service_1.PrismaService])
], AppController);
//# sourceMappingURL=app.controller.js.map