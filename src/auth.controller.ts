import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from './prisma.service';

@Controller('auth')
export class AuthController {
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
    try {
      const user_id = Number(req.user.user_id);
      const isAdmin = req.user.rol === 1;

      const userFilterSql = isAdmin ? '' : `WHERE user_id = ${user_id}`;
      const profileFilterSql = isAdmin ? '' : `WHERE profile_id IN (SELECT id FROM profile WHERE user_id = ${user_id})`;
      const profileActFilter = isAdmin ? '' : `AND profile_id IN (SELECT id FROM profile WHERE user_id = ${user_id})`;
      const whereProfile = isAdmin ? {} : { profile: { user_id } };

      // 15 días atrás
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 14);
      fifteenDaysAgo.setHours(0, 0, 0, 0);
      const fifteenDaysIso = fifteenDaysAgo.toISOString();

      // 1. Perfiles y recursos en consultas agrupadas ultrarrápidas
      const [profileCountsRaw, resourceCountsRaw, pendingActsRaw, chartRaw] = await Promise.all([
        this.prisma.$queryRawUnsafe<any[]>(`
          SELECT 
            COUNT(*)::int as total,
            COUNT(*) FILTER (WHERE is_archived = false AND is_zombie = 0)::int as active,
            COUNT(*) FILTER (WHERE is_zombie = 1 AND is_archived = false)::int as zombie,
            COUNT(*) FILTER (WHERE is_archived = true)::int as archived
          FROM profile
          ${userFilterSql}
        `),
        this.prisma.$queryRawUnsafe<any[]>(`
          SELECT
            (SELECT COUNT(*)::int FROM location ${userFilterSql}) as locations,
            (SELECT COUNT(*)::int FROM proxy ${userFilterSql}) as proxies,
            (SELECT COUNT(*)::int FROM website ${userFilterSql}) as websites,
            (SELECT COUNT(*)::int FROM profile_website ${profileFilterSql}) as website_accounts,
            (SELECT COUNT(*)::int FROM automation) as automations,
            (SELECT COUNT(*)::int FROM "user") as users
        `),
        this.prisma.$queryRawUnsafe<any[]>(`
          SELECT
            (SELECT COUNT(*)::int FROM youtube_activity WHERE status = 0 ${profileActFilter}) +
            (SELECT COUNT(*)::int FROM gmaps_activity WHERE status = 0 ${profileActFilter}) +
            (SELECT COUNT(*)::int FROM google_activity WHERE status = 0 ${profileActFilter}) +
            (SELECT COUNT(*)::int FROM browser_activity WHERE status = 0 ${profileActFilter}) +
            (SELECT COUNT(*)::int FROM quora_activity WHERE status = 0 ${profileActFilter}) +
            (SELECT COUNT(*)::int FROM medium_activity WHERE status = 0 ${profileActFilter}) as scheduled_activities
        `),
        this.prisma.$queryRawUnsafe<any[]>(`
          SELECT 
            to_char(finished_at, 'YYYY-MM-DD') as day,
            platform,
            count(*)::int as count
          FROM (
            SELECT finished_at, 'youtube' as platform FROM youtube_activity WHERE status = 1 AND finished_at >= '${fifteenDaysIso}' ${profileActFilter}
            UNION ALL
            SELECT finished_at, 'gmaps' as platform FROM gmaps_activity WHERE status = 1 AND finished_at >= '${fifteenDaysIso}' ${profileActFilter}
            UNION ALL
            SELECT finished_at, 'google' as platform FROM google_activity WHERE status = 1 AND finished_at >= '${fifteenDaysIso}' ${profileActFilter}
            UNION ALL
            SELECT finished_at, 'browser' as platform FROM browser_activity WHERE status = 1 AND finished_at >= '${fifteenDaysIso}' ${profileActFilter}
            UNION ALL
            SELECT finished_at, 'quora' as platform FROM quora_activity WHERE status = 1 AND finished_at >= '${fifteenDaysIso}' ${profileActFilter}
            UNION ALL
            SELECT finished_at, 'medium' as platform FROM medium_activity WHERE status = 1 AND finished_at >= '${fifteenDaysIso}' ${profileActFilter}
          ) combined
          GROUP BY day, platform
          ORDER BY day ASC
        `)
      ]);

      const profileCounts = profileCountsRaw[0] || { total: 0, active: 0, zombie: 0, archived: 0 };
      const resourceCounts = resourceCountsRaw[0] || { locations: 0, proxies: 0, websites: 0, website_accounts: 0, automations: 0, users: 0 };
      const scheduledActivities = pendingActsRaw[0]?.scheduled_activities || 0;

      // 2. Construir estructura de los últimos 15 días
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

      // Rellenar métricas desde el resultado SQL
      for (const row of chartRaw || []) {
        const dayEntry = dateMap.get(row.day);
        if (dayEntry && row.platform) {
          dayEntry[row.platform] = (dayEntry[row.platform] || 0) + Number(row.count || 0);
          dayEntry.total = (dayEntry.total || 0) + Number(row.count || 0);
        }
      }

      // 3. Últimas 5 finalizadas de cada plataforma
      const [latestYt, latestGm, latestGg, latestBr, latestQ, latestMed] = await Promise.all([
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

      return {
        // Fila 1: Perfiles
        profiles: profileCounts.total,
        totalProfiles: profileCounts.total,
        activeProfiles: profileCounts.active,
        zombieProfiles: profileCounts.zombie,
        archivedProfiles: profileCounts.archived,

        // Fila 2: Recursos y Agenda
        locations: resourceCounts.locations,
        scheduledActivities,
        proxies: resourceCounts.proxies,
        users: isAdmin ? resourceCounts.users : undefined,
        websites: resourceCounts.websites,
        websiteAccounts: resourceCounts.website_accounts,
        automations: resourceCounts.automations,

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
    } catch (err) {
      console.error('[getStats ERROR]:', err);
      throw err;
    }
  }
}
