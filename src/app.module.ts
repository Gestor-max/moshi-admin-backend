import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { PrismaService } from './prisma.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProxiesController } from './proxies.controller';
import { ProxiesService } from './proxies.service';
import { WebsitesController } from './websites.controller';
import { WebsitesService } from './websites.service';
import { AutomationsController } from './automations.controller';
import { AutomationsService } from './automations.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // In production, use environment variables
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    ProfilesController,
    ProxiesController,
    WebsitesController,
    AutomationsController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    ProfilesService,
    ProxiesService,
    WebsitesService,
    AutomationsService,
  ],
})
export class AppModule {}
