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
import { TagsService } from './tags.service';

@Controller('tags')
@UseGuards(AuthGuard('jwt'))
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll(@Request() req, @Query('search') search: string) {
    return this.tagsService.findAll(req.user.user_id, search);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.tagsService.findOne(req.user.user_id, parseInt(id));
  }

  @Post()
  async create(
    @Request() req,
    @Body() body: { name: string; color?: string },
  ) {
    return this.tagsService.create(req.user.user_id, body);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { name?: string; color?: string },
  ) {
    return this.tagsService.update(req.user.user_id, parseInt(id), body);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.tagsService.delete(req.user.user_id, parseInt(id));
  }
}
