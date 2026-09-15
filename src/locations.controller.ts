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
import { LocationsService } from './locations.service';

@Controller('locations')
@UseGuards(AuthGuard('jwt'))
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async findAll(@Request() req, @Query('search') search: string) {
    return this.locationsService.findAll(req.user.user_id, search);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.locationsService.findOne(req.user.user_id, parseInt(id));
  }

  @Post()
  async create(
    @Request() req,
    @Body() body: { state: string; location: string },
  ) {
    return this.locationsService.create(req.user.user_id, body);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { state?: string; location?: string },
  ) {
    return this.locationsService.update(req.user.user_id, parseInt(id), body);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.locationsService.delete(req.user.user_id, parseInt(id));
  }
}
