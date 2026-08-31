import { Controller, Request, Post, UseGuards, Body, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { AdminGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.register(body.email, body.password, body.name, 2);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  async updateProfile(@Request() req, @Body() body: { email?: string, name?: string, password?: string }) {
    return this.authService.updateProfile(req.user.user_id, body);
  }

  // ======= Admin-only endpoints =======

  // Create user (admin only)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('users')
  async createUser(@Body() body: { email: string; password: string; name?: string; rol?: number }) {
    return this.authService.register(body.email, body.password, body.name, body.rol || 2);
  }

  // List all users (admin only)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('users')
  async getUsers() {
    return this.usersService.findAll();
  }

  // Update user status (admin only)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch('users/:id/status')
  async updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: number },
  ) {
    const user = await this.usersService.updateStatus(id, body.status);
    const { password, ...result } = user;
    return result;
  }

  // Update user role (admin only)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch('users/:id/rol')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { rol: number },
  ) {
    const user = await this.usersService.updateRole(id, body.rol);
    const { password, ...result } = user;
    return result;
  }

  // Change user password (admin only)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch('users/:id/password')
  async updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { password: string },
  ) {
    return this.authService.adminUpdatePassword(id, body.password);
  }

  // Delete user (admin only)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.deleteUser(id);
    const { password, ...result } = user;
    return result;
  }
}
