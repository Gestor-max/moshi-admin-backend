import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    const schedules = await (this.prisma as any).schedule.findMany({
      where: { user_id: userId },
      include: {
        location: true,
        schedule_activity: true,
      },
      orderBy: { start_time: 'asc' },
    });

    return schedules.map((s) => ({
      ...s,
      activities: s.schedule_activity?.activities || [],
    }));
  }

  async findOne(userId: number, id: number) {
    const schedule = await (this.prisma as any).schedule.findFirst({
      where: { id, user_id: userId },
      include: {
        location: true,
        schedule_activity: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException('Horario de agenda no encontrado');
    }

    return {
      ...schedule,
      activities: schedule.schedule_activity?.activities || [],
    };
  }

  async create(
    userId: number,
    data: {
      location_id: number;
      start_time: string;
      end_time: string;
      is_active?: boolean;
      rotate_proxy?: boolean;
      activities?: string[];
    },
  ) {
    const locationId = Number(data.location_id);
    const activities = Array.isArray(data.activities) ? data.activities : [];

    const schedule = await (this.prisma as any).schedule.create({
      data: {
        user_id: userId,
        location_id: locationId,
        start_time: data.start_time || '08:00',
        end_time: data.end_time || '12:00',
        is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
        rotate_proxy: Boolean(data.rotate_proxy),
        schedule_activity: {
          create: {
            activities: activities,
          },
        },
      },
      include: {
        location: true,
        schedule_activity: true,
      },
    });

    return {
      ...schedule,
      activities: schedule.schedule_activity?.activities || [],
    };
  }

  async update(
    userId: number,
    id: number,
    data: {
      location_id?: number;
      start_time?: string;
      end_time?: string;
      is_active?: boolean;
      rotate_proxy?: boolean;
      activities?: string[];
    },
  ) {
    const existing = await (this.prisma as any).schedule.findFirst({
      where: { id, user_id: userId },
      include: { schedule_activity: true },
    });

    if (!existing) {
      throw new NotFoundException('Horario de agenda no encontrado');
    }

    const updateScheduleData: any = {};
    if (data.location_id !== undefined) updateScheduleData.location_id = Number(data.location_id);
    if (data.start_time !== undefined) updateScheduleData.start_time = data.start_time;
    if (data.end_time !== undefined) updateScheduleData.end_time = data.end_time;
    if (data.is_active !== undefined) updateScheduleData.is_active = Boolean(data.is_active);
    if (data.rotate_proxy !== undefined) updateScheduleData.rotate_proxy = Boolean(data.rotate_proxy);

    await (this.prisma as any).schedule.update({
      where: { id },
      data: updateScheduleData,
    });

    if (data.activities !== undefined) {
      const activities = Array.isArray(data.activities) ? data.activities : [];
      await (this.prisma as any).scheduleActivity.upsert({
        where: { schedule_id: id },
        create: {
          schedule_id: id,
          activities: activities,
        },
        update: {
          activities: activities,
        },
      });
    }

    return this.findOne(userId, id);
  }

  async toggleActive(userId: number, id: number) {
    const existing = await (this.prisma as any).schedule.findFirst({
      where: { id, user_id: userId },
    });

    if (!existing) {
      throw new NotFoundException('Horario de agenda no encontrado');
    }

    const updated = await (this.prisma as any).schedule.update({
      where: { id },
      data: { is_active: !existing.is_active },
      include: {
        location: true,
        schedule_activity: true,
      },
    });

    return {
      ...updated,
      activities: updated.schedule_activity?.activities || [],
    };
  }

  async delete(userId: number, id: number) {
    const existing = await (this.prisma as any).schedule.findFirst({
      where: { id, user_id: userId },
    });

    if (!existing) {
      throw new NotFoundException('Horario de agenda no encontrado');
    }

    return (this.prisma as any).schedule.delete({
      where: { id },
    });
  }
}
