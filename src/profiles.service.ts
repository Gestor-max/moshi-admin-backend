import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export interface CreateProfileDto {
  name: string;
  lastname: string;
  gmail?: string;
  gmail_password?: string;
  email_recovery?: string;
  profile_email?: string;
  profile_email_password?: string;
  bio?: string;
  img?: string;
  pais_iso?: string;
  mes_nac?: number;
  year_nac?: number;
  day_nac?: number;
  gender?: string;
  time_zone?: string;
  proxy_id?: number | null;
  empleo?: string | object;
  educacion?: string | object;
  ubicacion?: string | object;
}

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  private stringifyJsonField(val?: any): string {
    if (!val) return '';
    if (typeof val === 'string') return val;
    try {
      return JSON.stringify(val);
    } catch {
      return '';
    }
  }

  async findAll(user_id: number, search?: string) {
    const hasSearch = search && search.trim().length > 0;
    return this.prisma.profile.findMany({
      where: {
        user_id,
        OR: hasSearch
          ? [
              { name: { contains: search } },
              { lastname: { contains: search } },
              { gmail: { contains: search } },
              { email_recovery: { contains: search } },
              { profile_email: { contains: search } },
            ]
          : undefined,
      },
      include: {
        proxy: true,
        profile_websites: {
          include: {
            website: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(user_id: number, id: number) {
    return this.prisma.profile.findFirst({
      where: { id, user_id },
      include: {
        proxy: true,
        profile_websites: {
          include: {
            website: true,
          },
        },
      },
    });
  }

  async create(user_id: number, data: CreateProfileDto) {
    const { empleo, educacion, ubicacion, proxy_id, ...rest } = data;
    return this.prisma.profile.create({
      data: {
        ...rest,
        user_id,
        proxy_id: proxy_id ? Number(proxy_id) : null,
        empleo: this.stringifyJsonField(empleo),
        educacion: this.stringifyJsonField(educacion),
        ubicacion: this.stringifyJsonField(ubicacion),
      },
      include: {
        proxy: true,
        profile_websites: {
          include: {
            website: true,
          },
        },
      },
    });
  }

  async update(user_id: number, id: number, data: Partial<CreateProfileDto>) {
    const updateData: any = { ...data };
    if (data.empleo !== undefined) {
      updateData.empleo = this.stringifyJsonField(data.empleo);
    }
    if (data.educacion !== undefined) {
      updateData.educacion = this.stringifyJsonField(data.educacion);
    }
    if (data.ubicacion !== undefined) {
      updateData.ubicacion = this.stringifyJsonField(data.ubicacion);
    }
    if (data.proxy_id !== undefined) {
      updateData.proxy_id = data.proxy_id ? Number(data.proxy_id) : null;
    }

    return this.prisma.profile.updateMany({
      where: { id, user_id },
      data: updateData,
    });
  }

  async delete(user_id: number, id: number) {
    return this.prisma.profile.deleteMany({
      where: { id, user_id },
    });
  }
}
