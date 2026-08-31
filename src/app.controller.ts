import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('stats')
  async getStats(@Request() req) {
    const user_id = req.user.user_id;
    const isAdmin = req.user.rol === 1;

    // Admin sees all data, normal user sees only their own
    const whereUser = isAdmin ? {} : { user_id };
    const whereProfile = isAdmin ? {} : { profile: { user_id } };

    const queries: any[] = [
      this.prisma.profile.count({ where: whereUser }),
      this.prisma.proxy.count({ where: whereUser }),
      this.prisma.website.count({ where: whereUser }),
      this.prisma.profileWebsite.count({ where: whereProfile }),
      this.prisma.automation.count(),
    ];

    // Admin also gets user count
    if (isAdmin) {
      queries.push(this.prisma.user.count());
    }

    const results = await Promise.all(queries);

    const response: any = {
      profiles: results[0],
      proxies: results[1],
      websites: results[2],
      websiteAccounts: results[3],
      automations: results[4],
    };

    if (isAdmin) {
      response.users = results[5];
    }

    return response;
  }
}
