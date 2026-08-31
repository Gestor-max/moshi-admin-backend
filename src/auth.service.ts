import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      // Check if user is active
      if (user.status === 0) {
        throw new ForbiddenException('Tu cuenta está desactivada. Contacta al administrador.');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, rol: user.rol };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        rol: user.rol,
        status: user.status,
      }
    };
  }

  async register(email: string, pass: string, name?: string, rol: number = 2) {
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
      rol,
      status: 1,
    });

    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, data: { email?: string, name?: string, password?: string }) {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.usersService.update(userId, updateData);
    const { password, ...result } = user;
    return result;
  }

  async adminUpdatePassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await this.usersService.update(userId, { password: hashedPassword });
    const { password, ...result } = user;
    return result;
  }
}
