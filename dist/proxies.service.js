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
exports.ProxiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let ProxiesService = class ProxiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(user_id, search) {
        const hasSearch = search && search.trim().length > 0;
        return this.prisma.proxy.findMany({
            where: {
                user_id,
                OR: hasSearch
                    ? [
                        { ip: { contains: search } },
                        { port: { contains: search } },
                        { username: { contains: search } },
                    ]
                    : undefined,
            },
        });
    }
    async findOne(user_id, id) {
        return this.prisma.proxy.findFirst({
            where: { id, user_id },
        });
    }
    async create(user_id, data) {
        return this.prisma.proxy.create({
            data: {
                ...data,
                user_id,
            },
        });
    }
    async update(user_id, id, data) {
        return this.prisma.proxy.updateMany({
            where: { id, user_id },
            data,
        });
    }
    async delete(user_id, id) {
        return this.prisma.proxy.deleteMany({
            where: { id, user_id },
        });
    }
};
exports.ProxiesService = ProxiesService;
exports.ProxiesService = ProxiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProxiesService);
//# sourceMappingURL=proxies.service.js.map