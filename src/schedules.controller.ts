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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
@UseGuards(AuthGuard('jwt'))
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  async findAll(@Request() req) {
    return this.schedulesService.findAll(req.user.user_id);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.schedulesService.findOne(req.user.user_id, parseInt(id));
  }

  @Post()
  async create(
    @Request() req,
    @Body()
    body: {
      location_id: number;
      start_time: string;
      end_time: string;
      is_active?: boolean;
      rotate_proxy?: boolean;
      activities?: string[];
    },
  ) {
    return this.schedulesService.create(req.user.user_id, body);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body()
    body: {
      location_id?: number;
      start_time?: string;
      end_time?: string;
      is_active?: boolean;
      rotate_proxy?: boolean;
      activities?: string[];
    },
  ) {
    return this.schedulesService.update(req.user.user_id, parseInt(id), body);
  }

  @Patch(':id/toggle')
  async toggleActive(@Request() req, @Param('id') id: string) {
    return this.schedulesService.toggleActive(req.user.user_id, parseInt(id));
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.schedulesService.delete(req.user.user_id, parseInt(id));
  }
}
