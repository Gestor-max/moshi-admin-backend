import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = 'admin@admin.com';
    const existingAdmin = await this.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin2026@', 10);
      await this.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Administrador',
          status: 1,
          rol: 1,
        },
      });
      console.log('✅ Usuario administrador creado: admin@admin.com');
    }
  }
}
