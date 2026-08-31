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
exports.WebsitesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const websites_service_1 = require("./websites.service");
const admin_guard_1 = require("./admin.guard");
let WebsitesController = class WebsitesController {
    websitesService;
    constructor(websitesService) {
        this.websitesService = websitesService;
    }
    async findAll(search) {
        return this.websitesService.findAll(search);
    }
    async findAllAccounts(req, search) {
        return this.websitesService.findAllAccounts(req.user.user_id, req.user.rol, search);
    }
    async findAccountsByProfile(req, profileId) {
        return this.websitesService.findAccountsByProfile(req.user.user_id, req.user.rol, parseInt(profileId));
    }
    async createAccount(req, body) {
        return this.websitesService.createAccount(req.user.user_id, req.user.rol, body);
    }
    async updateAccount(req, id, body) {
        return this.websitesService.updateAccount(req.user.user_id, req.user.rol, parseInt(id), body);
    }
    async deleteAccount(req, id) {
        return this.websitesService.deleteAccount(req.user.user_id, req.user.rol, parseInt(id));
    }
    async findOne(id) {
        return this.websitesService.findOne(parseInt(id));
    }
    async create(req, body) {
        return this.websitesService.create(req.user.user_id, body);
    }
    async update(id, body) {
        return this.websitesService.update(parseInt(id), body);
    }
    async delete(id) {
        return this.websitesService.delete(parseInt(id));
    }
};
exports.WebsitesController = WebsitesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('accounts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "findAllAccounts", null);
__decorate([
    (0, common_1.Get)('accounts/profile/:profileId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "findAccountsByProfile", null);
__decorate([
    (0, common_1.Post)('accounts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Patch)('accounts/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Delete)('accounts/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebsitesController.prototype, "delete", null);
exports.WebsitesController = WebsitesController = __decorate([
    (0, common_1.Controller)('websites'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [websites_service_1.WebsitesService])
], WebsitesController);
//# sourceMappingURL=websites.controller.js.map