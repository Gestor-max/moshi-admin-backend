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
import {
  WebsitesService,
  CreateWebsiteDto,
  CreateProfileWebsiteDto,
} from './websites.service';
import { AdminGuard } from './admin.guard';

@Controller('websites')
@UseGuards(AuthGuard('jwt'))
export class WebsitesController {
  constructor(private websitesService: WebsitesService) {}

  // Website catalog routes (Everyone can list global websites)
  @Get()
  async findAll(@Query('search') search: string) {
    return this.websitesService.findAll(search);
  }

  @Get('accounts')
  async findAllAccounts(@Request() req, @Query('search') search: string) {
    return this.websitesService.findAllAccounts(req.user.user_id, req.user.rol, search);
  }

  @Get('accounts/profile/:profileId')
  async findAccountsByProfile(
    @Request() req,
    @Param('profileId') profileId: string
  ) {
    return this.websitesService.findAccountsByProfile(
      req.user.user_id,
      req.user.rol,
      parseInt(profileId)
    );
  }

  @Post('accounts')
  async createAccount(@Request() req, @Body() body: CreateProfileWebsiteDto) {
    return this.websitesService.createAccount(req.user.user_id, req.user.rol, body);
  }

  @Patch('accounts/:id')
  async updateAccount(
    @Request() req,
    @Param('id') id: string,
    @Body() body: Partial<CreateProfileWebsiteDto>
  ) {
    return this.websitesService.updateAccount(
      req.user.user_id,
      req.user.rol,
      parseInt(id),
      body
    );
  }

  @Delete('accounts/:id')
  async deleteAccount(@Request() req, @Param('id') id: string) {
    return this.websitesService.deleteAccount(req.user.user_id, req.user.rol, parseInt(id));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.websitesService.findOne(parseInt(id));
  }

  // Admin-only endpoints for creating, updating and deleting global Websites
  @UseGuards(AdminGuard)
  @Post()
  async create(@Request() req, @Body() body: CreateWebsiteDto) {
    return this.websitesService.create(req.user.user_id, body);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateWebsiteDto>
  ) {
    return this.websitesService.update(parseInt(id), body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.websitesService.delete(parseInt(id));
  }
}
