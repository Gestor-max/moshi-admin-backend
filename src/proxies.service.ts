import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProxiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(user_id: number, search?: string) {
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

  async findOne(user_id: number, id: number) {
    return this.prisma.proxy.findFirst({
      where: { id, user_id },
    });
  }

  async create(
    user_id: number,
    data: { ip: string; port: string; username: string; password: string },
  ) {
    return this.prisma.proxy.create({
      data: {
        ...data,
        user_id,
      },
    });
  }

  async update(
    user_id: number,
    id: number,
    data: { ip?: string; port?: string; username?: string; password?: string },
  ) {
    return this.prisma.proxy.updateMany({
      where: { id, user_id },
      data,
    });
  }

  async delete(user_id: number, id: number) {
    return this.prisma.proxy.deleteMany({
      where: { id, user_id },
    });
  }
}
