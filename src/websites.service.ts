import { Injectable, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export interface CreateWebsiteDto {
  name: string;
  url: string;
}

export interface CreateProfileWebsiteDto {
  profile_id: number;
  website_id: number;
  email: string;
  password: string;
  cookie?: string;
}

@Injectable()
export class WebsitesService {
  constructor(private prisma: PrismaService) {}

  // Global Website Catalog (Websites are global for all users)
  async findAll(search?: string) {
    const hasSearch = search && search.trim().length > 0;
    return this.prisma.website.findMany({
      where: hasSearch
        ? {
            OR: [
              { name: { contains: search } },
              { url: { contains: search } },
            ],
          }
        : undefined,
      include: {
        _count: {
          select: { profile_websites: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const site = await this.prisma.website.findFirst({
      where: { id },
      include: {
        profile_websites: {
          include: { profile: true },
        },
      },
    });
    if (!site) {
      throw new NotFoundException('Website no encontrado');
    }
    return site;
  }

  async create(user_id: number, data: CreateWebsiteDto) {
    return this.prisma.website.create({
      data: {
        name: data.name,
        url: data.url,
        user_id,
      },
    });
  }

  async update(id: number, data: Partial<CreateWebsiteDto>) {
    await this.findOne(id);
    return this.prisma.website.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.prisma.website.delete({
      where: { id },
    });
  }

  // Profile Website Accounts Management
  async findAllAccounts(user_id: number, rol: number, search?: string) {
    const hasSearch = search && search.trim().length > 0;
    // Admin sees all profile accounts, normal user sees only accounts of their profiles
    const whereProfile = rol === 1 ? {} : { profile: { user_id } };

    return this.prisma.profileWebsite.findMany({
      where: {
        ...whereProfile,
        OR: hasSearch
          ? [
              { email: { contains: search } },
              { website: { name: { contains: search } } },
              { profile: { name: { contains: search } } },
              { profile: { lastname: { contains: search } } },
            ]
          : undefined,
      },
      include: {
        profile: true,
        website: true,
      },
    });
  }

  async findAccountsByProfile(user_id: number, rol: number, profile_id: number) {
    if (rol !== 1) {
      const profile = await this.prisma.profile.findFirst({
        where: { id: profile_id, user_id },
      });
      if (!profile) {
        throw new ForbiddenException('Perfil no encontrado o acceso denegado');
      }
    }

    return this.prisma.profileWebsite.findMany({
      where: { profile_id },
      include: { website: true },
    });
  }

  async createAccount(user_id: number, rol: number, data: CreateProfileWebsiteDto) {
    // 1. Verify profile belongs to user (or user is admin)
    if (rol !== 1) {
      const profile = await this.prisma.profile.findFirst({
        where: { id: data.profile_id, user_id },
      });
      if (!profile) {
        throw new ForbiddenException('Perfil no encontrado o no pertenece a tu usuario');
      }
    } else {
      const profile = await this.prisma.profile.findUnique({
        where: { id: data.profile_id },
      });
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
    }

    // 2. Verify website exists globally
    const website = await this.prisma.website.findUnique({
      where: { id: data.website_id },
    });
    if (!website) {
      throw new NotFoundException('Website no encontrado');
    }

    // 3. Enforce rule: 1 profile can only have 1 account for a given website
    const existing = await this.prisma.profileWebsite.findUnique({
      where: {
        profile_id_website_id: {
          profile_id: data.profile_id,
          website_id: data.website_id,
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Este perfil ya tiene una cuenta registrada para el sitio web ${website.name}. Solo se permite 1 cuenta por sitio web por perfil.`
      );
    }

    return this.prisma.profileWebsite.create({
      data: {
        profile_id: data.profile_id,
        website_id: data.website_id,
        email: data.email,
        password: data.password,
        cookie: data.cookie || '',
      },
      include: {
        profile: true,
        website: true,
      },
    });
  }

  async updateAccount(
    user_id: number,
    rol: number,
    id: number,
    data: Partial<CreateProfileWebsiteDto>
  ) {
    const whereProfile = rol === 1 ? {} : { profile: { user_id } };
    const account = await this.prisma.profileWebsite.findFirst({
      where: {
        id,
        ...whereProfile,
      },
    });
    if (!account) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return this.prisma.profileWebsite.update({
      where: { id },
      data,
      include: {
        profile: true,
        website: true,
      },
    });
  }

  async deleteAccount(user_id: number, rol: number, id: number) {
    const whereProfile = rol === 1 ? {} : { profile: { user_id } };
    const account = await this.prisma.profileWebsite.findFirst({
      where: {
        id,
        ...whereProfile,
      },
    });
    if (!account) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return this.prisma.profileWebsite.delete({
      where: { id },
    });
  }
}
