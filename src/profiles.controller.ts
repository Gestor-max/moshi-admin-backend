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
import { ProfilesService, CreateProfileDto } from './profiles.service';

@Controller('profiles')
@UseGuards(AuthGuard('jwt'))
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  async findAll(@Request() req, @Query('search') search: string) {
    return this.profilesService.findAll(req.user.user_id, search);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.profilesService.findOne(req.user.user_id, parseInt(id));
  }

  @Post()
  async create(@Request() req, @Body() body: CreateProfileDto) {
    return this.profilesService.create(req.user.user_id, body);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: Partial<CreateProfileDto>,
  ) {
    return this.profilesService.update(req.user.user_id, parseInt(id), body);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.profilesService.delete(req.user.user_id, parseInt(id));
  }
}
