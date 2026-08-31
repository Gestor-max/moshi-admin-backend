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
exports.AutomationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let AutomationsService = class AutomationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(rol, search) {
        const hasSearch = search && search.trim().length > 0;
        const automations = await this.prisma.automation.findMany({
            where: hasSearch
                ? {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } },
                    ],
                }
                : undefined,
            orderBy: { id: 'asc' },
        });
        if (rol !== 1) {
            return automations.map(({ filename, ...rest }) => rest);
        }
        return automations;
    }
    async findOne(id, rol) {
        const auto = await this.prisma.automation.findUnique({
            where: { id },
        });
        if (!auto) {
            throw new common_1.NotFoundException('Automatización no encontrada');
        }
        if (rol !== 1) {
            const { filename, ...rest } = auto;
            return rest;
        }
        return auto;
    }
    async create(data) {
        return this.prisma.automation.create({
            data: {
                name: data.name,
                description: data.description,
                filename: data.filename,
            },
        });
    }
    async update(id, data) {
        await this.findOne(id, 1);
        return this.prisma.automation.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await this.findOne(id, 1);
        return this.prisma.automation.delete({
            where: { id },
        });
    }
};
exports.AutomationsService = AutomationsService;
exports.AutomationsService = AutomationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AutomationsService);
//# sourceMappingURL=automations.service.js.map