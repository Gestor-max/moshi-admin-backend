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
  async findAll(
    @Request() req,
    @Query('search') search: string,
    @Query('archived') archived: string,
    @Query('zombie') zombie: string,
  ) {
    return this.profilesService.findAll(req.user.user_id, search, archived, zombie);
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

  @Patch(':id/archive')
  async archive(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { is_archived?: boolean },
  ) {
    const isArchived = body.is_archived !== undefined ? body.is_archived : true;
    return this.profilesService.archive(req.user.user_id, parseInt(id), isArchived);
  }

  @Patch(':id/zombie')
  async setZombie(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { is_zombie?: number | boolean },
  ) {
    const isZombie = body.is_zombie !== undefined ? body.is_zombie : 1;
    return this.profilesService.setZombie(req.user.user_id, parseInt(id), isZombie);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.profilesService.delete(req.user.user_id, parseInt(id));
  }
}
