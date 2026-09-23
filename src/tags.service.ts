import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll(user_id: number, search?: string) {
    const hasSearch = search && search.trim().length > 0;
    return (this.prisma as any).tag.findMany({
      where: {
        user_id,
        OR: hasSearch
          ? [
              { name: { contains: search, mode: 'insensitive' } },
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
    return (this.prisma as any).tag.findFirst({
      where: { id, user_id },
      include: {
        profiles: true,
      },
    });
  }

  async create(user_id: number, data: { name: string; color?: string }) {
    return (this.prisma as any).tag.create({
      data: {
        name: data.name || '',
        color: data.color || '#3b82f6',
        user_id,
      },
    });
  }

  async update(
    user_id: number,
    id: number,
    data: { name?: string; color?: string },
  ) {
    const updateData: any = { ...data };
    delete updateData.id;
    delete updateData.user_id;

    return (this.prisma as any).tag.updateMany({
      where: { id, user_id },
      data: updateData,
    });
  }

  async delete(user_id: number, id: number) {
    await (this.prisma as any).profile.updateMany({
      where: { tag_id: id, user_id },
      data: { tag_id: null },
    });

    return (this.prisma as any).tag.deleteMany({
      where: { id, user_id },
    });
  }
}
