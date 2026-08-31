import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProxiesService } from './proxies.service';

@Controller('proxies')
@UseGuards(AuthGuard('jwt'))
export class ProxiesController {
  constructor(private proxiesService: ProxiesService) {}

  @Get()
  async findAll(@Request() req, @Query('search') search: string) {
    return this.proxiesService.findAll(req.user.user_id, search);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.proxiesService.findOne(req.user.user_id, parseInt(id));
  }

  @Post()
  async create(
    @Request() req,
    @Body() body: { ip: string; port: string; username: string; password: string },
  ) {
    return this.proxiesService.create(req.user.user_id, body);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { ip?: string; port?: string; username?: string; password?: string },
  ) {
    return this.proxiesService.update(req.user.user_id, parseInt(id), body);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.proxiesService.delete(req.user.user_id, parseInt(id));
  }
}
