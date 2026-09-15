"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("./users.service");
const prisma_service_1 = require("./prisma.service");
const local_strategy_1 = require("./local.strategy");
const jwt_strategy_1 = require("./jwt.strategy");
const profiles_controller_1 = require("./profiles.controller");
const profiles_service_1 = require("./profiles.service");
const proxies_controller_1 = require("./proxies.controller");
const proxies_service_1 = require("./proxies.service");
const websites_controller_1 = require("./websites.controller");
const websites_service_1 = require("./websites.service");
const automations_controller_1 = require("./automations.controller");
const automations_service_1 = require("./automations.service");
const activities_module_1 = require("./activities.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            activities_module_1.ActivitiesModule,
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '60m' },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            profiles_controller_1.ProfilesController,
            proxies_controller_1.ProxiesController,
            websites_controller_1.WebsitesController,
            automations_controller_1.AutomationsController,
        ],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            prisma_service_1.PrismaService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            profiles_service_1.ProfilesService,
            proxies_service_1.ProxiesService,
            websites_service_1.WebsitesService,
            automations_service_1.AutomationsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map