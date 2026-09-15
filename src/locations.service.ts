import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(user_id: number, search?: string) {
    const hasSearch = search && search.trim().length > 0;
    return (this.prisma as any).location.findMany({
      where: {
        user_id,
        OR: hasSearch
          ? [
              { state: { contains: search, mode: 'insensitive' } },
              { location: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      include: {
        _count: {
          select: { profiles: true },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(user_id: number, id: number) {
    return (this.prisma as any).location.findFirst({
      where: { id, user_id },
      include: {
        profiles: true,
      },
    });
  }

  async create(
    user_id: number,
    data: { state: string; location: string },
  ) {
    return (this.prisma as any).location.create({
      data: {
        state: data.state || '',
        location: data.location || '',
        user_id,
      },
    });
  }

  async update(
    user_id: number,
    id: number,
    data: { state?: string; location?: string },
  ) {
    const updateData: any = { ...data };
    delete updateData.id;
    delete updateData.user_id;

    return (this.prisma as any).location.updateMany({
      where: { id, user_id },
      data: updateData,
    });
  }

  async delete(user_id: number, id: number) {
    return (this.prisma as any).location.deleteMany({
      where: { id, user_id },
    });
  }
}
