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
  ParseIntPipe,
  Header,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivitiesService } from './activities.service';
import { Response } from 'express';

@Controller('activities')
@UseGuards(AuthGuard('jwt'))
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get('profile/:profileId')
  async getByProfile(
    @Request() req,
    @Param('profileId', ParseIntPipe) profileId: number,
  ) {
    return this.activitiesService.getActivitiesByProfile(
      req.user.user_id,
      profileId,
    );
  }

  @Get('profile/:profileId/export')
  async exportActivities(
    @Request() req,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Res() res: Response,
  ) {
    const activities = await this.activitiesService.getActivitiesByProfile(
      req.user.user_id,
      profileId,
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="profile_${profileId}_activities.json"`,
    );
    return res.status(200).send(JSON.stringify(activities, null, 2));
  }

  @Post(':platform')
  async create(
    @Request() req,
    @Param('platform') platform: string,
    @Body() body: any,
  ) {
    return this.activitiesService.createActivity(
      req.user.user_id,
      platform,
      body,
    );
  }

  @Patch(':platform/:id')
  async update(
    @Request() req,
    @Param('platform') platform: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.activitiesService.updateActivity(
      req.user.user_id,
      platform,
      id,
      body,
    );
  }

  @Patch(':platform/:id/status')
  async updateStatus(
    @Request() req,
    @Param('platform') platform: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: number },
  ) {
    return this.activitiesService.updateActivityStatus(
      req.user.user_id,
      platform,
      id,
      Number(body.status),
    );
  }

  @Patch(':platform/:id/finish')
  async finishActivity(
    @Request() req,
    @Param('platform') platform: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.activitiesService.finishActivity(
      req.user.user_id,
      platform,
      id,
    );
  }

  @Delete(':platform/:id')
  async delete(
    @Request() req,
    @Param('platform') platform: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.activitiesService.deleteActivity(
      req.user.user_id,
      platform,
      id,
    );
  }
}
