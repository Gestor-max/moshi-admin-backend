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

    // 15 días atrás a las 00:00:00
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 14);
    fifteenDaysAgo.setHours(0, 0, 0, 0);

    const [
      totalProfiles,
      activeProfiles,
      zombieProfiles,
      archivedProfiles,
      locations,
      proxies,
      websites,
      websiteAccounts,
      automations,
      users,
      // Actividades agendadas / pendientes (status = 0)
      pendingYt,
      pendingGm,
      pendingGg,
      pendingBr,
      pendingQ,
      pendingMed,
      // Actividades completadas en últimos 15 días para la gráfica
      finishedYtList,
      finishedGmList,
      finishedGgList,
      finishedBrList,
      finishedQList,
      finishedMedList,
      // Últimas 5 completadas por plataforma
      latestYt,
      latestGm,
      latestGg,
      latestBr,
      latestQ,
      latestMed,
    ] = await Promise.all([
      // Fila 1: Perfiles
      this.prisma.profile.count({ where: whereUser }),
      this.prisma.profile.count({ where: { ...whereUser, is_archived: false, is_zombie: 0 } }),
      this.prisma.profile.count({ where: { ...whereUser, is_zombie: 1, is_archived: false } }),
      this.prisma.profile.count({ where: { ...whereUser, is_archived: true } }),

      // Fila 2: Recursos y Agenda
      (this.prisma as any).location.count({ where: whereUser }),
      this.prisma.proxy.count({ where: whereUser }),
      this.prisma.website.count({ where: whereUser }),
      this.prisma.profileWebsite.count({ where: whereProfile }),
      this.prisma.automation.count(),
      this.prisma.user.count(),

      // Actividades agendadas (status = 0)
      this.prisma.youtubeActivity.count({ where: { ...whereProfile, status: 0 } }),
      this.prisma.gmapsActivity.count({ where: { ...whereProfile, status: 0 } }),
      this.prisma.googleActivity.count({ where: { ...whereProfile, status: 0 } }),
      this.prisma.browserActivity.count({ where: { ...whereProfile, status: 0 } }),
      this.prisma.quoraActivity.count({ where: { ...whereProfile, status: 0 } }),
      this.prisma.mediumActivity.count({ where: { ...whereProfile, status: 0 } }),

      // Gráfica de últimos 15 días
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

      // Fila 4: Últimas 5 completadas de cada tipo
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

    // Procesar los últimos 15 días para la gráfica
    const chartDays: any[] = [];
    const dateMap = new Map<string, any>();

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

    const processItems = (items: any[], key: string) => {
      for (const item of items) {
        if (!item.finished_at) continue;
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
      // Fila 1: Perfiles
      profiles: totalProfiles,
      totalProfiles,
      activeProfiles,
      zombieProfiles,
      archivedProfiles,

      // Fila 2: Recursos y Agenda
      locations,
      scheduledActivities,
      proxies,
      users: isAdmin ? users : undefined,
      websites,
      websiteAccounts,
      automations,

      // Fila 3: Gráfica últimos 15 días
      chartDays,

      // Fila 4: Últimas 5 actividades finalizadas
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
}
