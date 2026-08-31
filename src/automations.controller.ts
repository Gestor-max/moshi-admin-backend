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
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.guard';
import { AutomationsService, CreateAutomationDto } from './automations.service';

@Controller('automations')
@UseGuards(AuthGuard('jwt'))
export class AutomationsController {
  constructor(private automationsService: AutomationsService) {}

  @Get()
  async findAll(@Request() req, @Query('search') search: string) {
    return this.automationsService.findAll(req.user.rol, search);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.automationsService.findOne(id, req.user.rol);
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() body: CreateAutomationDto) {
    return this.automationsService.create(body);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateAutomationDto>,
  ) {
    return this.automationsService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.automationsService.delete(id);
  }
}
