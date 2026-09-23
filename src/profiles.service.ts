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
  two_fa?: string;
  telefono?: string;
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

  async findAll(user_id: number, search?: string, archived?: string | boolean) {
    const hasSearch = search && search.trim().length > 0;
    
    // Filtro de archivado: si archived es 'all', no filtra; si es 'true'/true, solo archivados; por defecto (false), solo no archivados.
    let isArchivedCondition: boolean | undefined = false;
    if (archived === 'all') {
      isArchivedCondition = undefined;
    } else if (archived === 'true' || archived === true) {
      isArchivedCondition = true;
    }

    return this.prisma.profile.findMany({
      where: {
        user_id,
        is_archived: isArchivedCondition,
        OR: hasSearch
          ? [
              { name: { contains: search, mode: 'insensitive' } },
              { lastname: { contains: search, mode: 'insensitive' } },
              { gmail: { contains: search, mode: 'insensitive' } },
              { email_recovery: { contains: search, mode: 'insensitive' } },
              { profile_email: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      include: {
        proxy: true,
        location: true,
        location_proxy: true,
        location_proxy_alt: true,
        tag: true,
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
        location: true,
        location_proxy: true,
        location_proxy_alt: true,
        tag: true,
        profile_websites: {
          include: {
            website: true,
          },
        },
      },
    });
  }

  async create(user_id: number, data: any) {
    const { empleo, educacion, ubicacion, proxy_id, location_id, location_proxy_id, location_proxy_alt_id, tag_id, ...rest } = data;
    return this.prisma.profile.create({
      data: {
        ...rest,
        user_id,
        proxy_id: proxy_id ? Number(proxy_id) : null,
        location_id: location_id ? Number(location_id) : null,
        location_proxy_id: location_proxy_id ? Number(location_proxy_id) : null,
        location_proxy_alt_id: location_proxy_alt_id ? Number(location_proxy_alt_id) : null,
        tag_id: tag_id ? Number(tag_id) : null,
        empleo: this.stringifyJsonField(empleo),
        educacion: this.stringifyJsonField(educacion),
        ubicacion: this.stringifyJsonField(ubicacion),
      },
      include: {
        proxy: true,
        location: true,
        location_proxy: true,
        location_proxy_alt: true,
        tag: true,
        profile_websites: {
          include: {
            website: true,
          },
        },
      },
    });
  }

  async update(user_id: number, id: number, data: any) {
    const updateData: any = { ...data };
    delete updateData.id;
    delete updateData.user_id;
    delete updateData.proxy;
    delete updateData.location;
    delete updateData.location_proxy;
    delete updateData.location_proxy_alt;
    delete updateData.tag;
    delete updateData.profile_websites;
    delete updateData.activity_logs;
    delete updateData.created_at;
    delete updateData.updated_at;

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
    if (data.location_id !== undefined) {
      updateData.location_id = data.location_id ? Number(data.location_id) : null;
    }
    if (data.location_proxy_id !== undefined) {
      updateData.location_proxy_id = data.location_proxy_id ? Number(data.location_proxy_id) : null;
    }
    if (data.location_proxy_alt_id !== undefined) {
      updateData.location_proxy_alt_id = data.location_proxy_alt_id ? Number(data.location_proxy_alt_id) : null;
    }
    if (data.tag_id !== undefined) {
      updateData.tag_id = data.tag_id ? Number(data.tag_id) : null;
    }
    if (data.is_archived !== undefined) {
      updateData.is_archived = Boolean(data.is_archived);
    }

    return this.prisma.profile.updateMany({
      where: { id, user_id },
      data: updateData,
    });
  }

  async archive(user_id: number, id: number, is_archived: boolean = true) {
    return this.prisma.profile.updateMany({
      where: { id, user_id },
      data: { is_archived },
    });
  }

  async delete(user_id: number, id: number) {
    return this.prisma.profile.deleteMany({
      where: { id, user_id },
    });
  }
}
