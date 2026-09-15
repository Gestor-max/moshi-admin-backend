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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const activities_service_1 = require("./activities.service");
let ActivitiesController = class ActivitiesController {
    activitiesService;
    constructor(activitiesService) {
        this.activitiesService = activitiesService;
    }
    async getByProfile(req, profileId) {
        return this.activitiesService.getActivitiesByProfile(req.user.user_id, profileId);
    }
    async exportActivities(req, profileId, res) {
        const activities = await this.activitiesService.getActivitiesByProfile(req.user.user_id, profileId);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="profile_${profileId}_activities.json"`);
        return res.status(200).send(JSON.stringify(activities, null, 2));
    }
    async create(req, platform, body) {
        return this.activitiesService.createActivity(req.user.user_id, platform, body);
    }
    async update(req, platform, id, body) {
        return this.activitiesService.updateActivity(req.user.user_id, platform, id, body);
    }
    async updateStatus(req, platform, id, body) {
        return this.activitiesService.updateActivityStatus(req.user.user_id, platform, id, Number(body.status));
    }
    async finishActivity(req, platform, id) {
        return this.activitiesService.finishActivity(req.user.user_id, platform, id);
    }
    async delete(req, platform, id) {
        return this.activitiesService.deleteActivity(req.user.user_id, platform, id);
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Get)('profile/:profileId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('profileId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "getByProfile", null);
__decorate([
    (0, common_1.Get)('profile/:profileId/export'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('profileId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "exportActivities", null);
__decorate([
    (0, common_1.Post)(':platform'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('platform')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':platform/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('platform')),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Object]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':platform/:id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('platform')),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Object]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':platform/:id/finish'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('platform')),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "finishActivity", null);
__decorate([
    (0, common_1.Delete)(':platform/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('platform')),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "delete", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, common_1.Controller)('activities'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [activities_service_1.ActivitiesService])
], ActivitiesController);
//# sourceMappingURL=activities.controller.js.map