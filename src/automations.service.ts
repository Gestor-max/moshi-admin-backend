import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export interface CreateAutomationDto {
  name: string;
  description: string;
  filename: string;
}

@Injectable()
export class AutomationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(rol: number, search?: string) {
    const hasSearch = search && search.trim().length > 0;
    const automations = await this.prisma.automation.findMany({
      where: hasSearch
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { id: 'asc' },
    });

    // If user is normal user (rol === 2), hide filename
    if (rol !== 1) {
      return automations.map(({ filename, ...rest }) => rest);
    }

    return automations;
  }

  async findOne(id: number, rol: number) {
    const auto = await this.prisma.automation.findUnique({
      where: { id },
    });
    if (!auto) {
      throw new NotFoundException('Automatización no encontrada');
    }

    if (rol !== 1) {
      const { filename, ...rest } = auto;
      return rest;
    }

    return auto;
  }

  async create(data: CreateAutomationDto) {
    return this.prisma.automation.create({
      data: {
        name: data.name,
        description: data.description,
        filename: data.filename,
      },
    });
  }

  async update(id: number, data: Partial<CreateAutomationDto>) {
    await this.findOne(id, 1);
    return this.prisma.automation.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findOne(id, 1);
    return this.prisma.automation.delete({
      where: { id },
    });
  }
}
