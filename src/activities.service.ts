import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  private async verifyProfileOwnership(userId: number, profileId: number) {
    const profile = await this.prisma.profile.findFirst({
      where: { id: profileId, user_id: userId },
    });
    if (!profile) {
      throw new ForbiddenException('Perfil no encontrado o no tienes acceso');
    }
    return profile;
  }

  async getActivitiesByProfile(userId: number, profileId: number) {
    await this.verifyProfileOwnership(userId, profileId);

    const [youtube, quora, medium, browser, google, gmaps] = await Promise.all([
      this.prisma.youtubeActivity.findMany({
        where: { profile_id: profileId },
        orderBy: { id: 'desc' },
      }),
      this.prisma.quoraActivity.findMany({
        where: { profile_id: profileId },
        orderBy: { id: 'desc' },
      }),
      this.prisma.mediumActivity.findMany({
        where: { profile_id: profileId },
        orderBy: { id: 'desc' },
      }),
      this.prisma.browserActivity.findMany({
        where: { profile_id: profileId },
        orderBy: { id: 'desc' },
      }),
      this.prisma.googleActivity.findMany({
        where: { profile_id: profileId },
        orderBy: { id: 'desc' },
      }),
      this.prisma.gmapsActivity.findMany({
        where: { profile_id: profileId },
        orderBy: { id: 'desc' },
      }),
    ]);

    return { youtube, quora, medium, browser, google, gmaps };
  }

  async createActivity(userId: number, platform: string, body: any) {
    const profileId = Number(body.profile_id);
    if (!profileId) {
      throw new BadRequestException('profile_id es requerido');
    }
    await this.verifyProfileOwnership(userId, profileId);

    const status = body.status !== undefined ? Number(body.status) : 0;
    const publish_date = body.publish_date || '';
    const publish_time = body.publish_time || '';
    const finished_at = status === 1 ? (body.finished_at ? new Date(body.finished_at) : new Date()) : null;

    switch (platform.toLowerCase()) {
      case 'youtube':
        return this.prisma.youtubeActivity.create({
          data: {
            profile_id: profileId,
            search_query: body.search_query || '',
            video_id: body.video_id || '',
            comment_video_id: body.comment_video_id || '',
            likes_video_id: body.likes_video_id || '',
            status,
            publish_date,
            publish_time,
            finished_at,
          },
        });
      case 'quora':
        return this.prisma.quoraActivity.create({
          data: {
            profile_id: profileId,
            search_query: body.search_query || '',
            question_id: body.question_id || '',
            answer_id: body.answer_id || '',
            upvote_question_id: body.upvote_question_id || '',
            upvote_answer_id: body.upvote_answer_id || '',
            comment_question_id: body.comment_question_id || '',
            comment_answer_id: body.comment_answer_id || '',
            status,
            publish_date,
            publish_time,
            finished_at,
          },
        });
      case 'medium':
        return this.prisma.mediumActivity.create({
          data: {
            profile_id: profileId,
            search_query: body.search_query || '',
            post_id: body.post_id || '',
            claps_post_id: body.claps_post_id || '',
            comment_post_id: body.comment_post_id || '',
            status,
            publish_date,
            publish_time,
            finished_at,
          },
        });
      case 'browser':
        return this.prisma.browserActivity.create({
          data: {
            profile_id: profileId,
            link: body.link || '',
            status,
            publish_date,
            publish_time,
            finished_at,
          },
        });
      case 'google':
        return this.prisma.googleActivity.create({
          data: {
            profile_id: profileId,
            search_query: body.search_query || '',
            status,
            publish_date,
            publish_time,
            finished_at,
          },
        });
      case 'gmaps':
        return this.prisma.gmapsActivity.create({
          data: {
            profile_id: profileId,
            place_id: body.place_id || '',
            search_query: body.search_query || '',
            navigate_location: body.navigate_location || '',
            review_text: body.review_text || '',
            rating: body.rating !== undefined ? Number(body.rating) : 5,
            status,
            publish_date,
            publish_time,
            finished_at,
          },
        });
      default:
        throw new BadRequestException('Plataforma no soportada. Usar: youtube, quora, medium, browser, google, gmaps');
    }
  }

  async updateActivity(userId: number, platform: string, id: number, body: any) {
    const plat = platform.toLowerCase();
    let activity: any = null;

    if (plat === 'youtube') {
      activity = await this.prisma.youtubeActivity.findUnique({ where: { id } });
    } else if (plat === 'quora') {
      activity = await this.prisma.quoraActivity.findUnique({ where: { id } });
    } else if (plat === 'medium') {
      activity = await this.prisma.mediumActivity.findUnique({ where: { id } });
    } else if (plat === 'browser') {
      activity = await this.prisma.browserActivity.findUnique({ where: { id } });
    } else if (plat === 'google') {
      activity = await this.prisma.googleActivity.findUnique({ where: { id } });
    } else if (plat === 'gmaps') {
      activity = await this.prisma.gmapsActivity.findUnique({ where: { id } });
    } else {
      throw new BadRequestException('Plataforma no válida');
    }

    if (!activity) {
      throw new NotFoundException('Actividad no encontrada');
    }

    await this.verifyProfileOwnership(userId, activity.profile_id);

    const updateData: any = {};
    if (body.search_query !== undefined) updateData.search_query = body.search_query;
    if (body.publish_date !== undefined) updateData.publish_date = body.publish_date;
    if (body.publish_time !== undefined) updateData.publish_time = body.publish_time;

    if (body.status !== undefined) {
      const newStatus = Number(body.status);
      updateData.status = newStatus;
      if (newStatus === 1) {
        updateData.finished_at = body.finished_at ? new Date(body.finished_at) : new Date();
      } else {
        updateData.finished_at = null;
      }
    } else if (body.finished_at !== undefined) {
      updateData.finished_at = body.finished_at ? new Date(body.finished_at) : null;
    }

    if (plat === 'youtube') {
      if (body.video_id !== undefined) updateData.video_id = body.video_id;
      if (body.comment_video_id !== undefined) updateData.comment_video_id = body.comment_video_id;
      if (body.likes_video_id !== undefined) updateData.likes_video_id = body.likes_video_id;
      return this.prisma.youtubeActivity.update({ where: { id }, data: updateData });
    } else if (plat === 'quora') {
      if (body.question_id !== undefined) updateData.question_id = body.question_id;
      if (body.answer_id !== undefined) updateData.answer_id = body.answer_id;
      if (body.upvote_question_id !== undefined) updateData.upvote_question_id = body.upvote_question_id;
      if (body.upvote_answer_id !== undefined) updateData.upvote_answer_id = body.upvote_answer_id;
      if (body.comment_question_id !== undefined) updateData.comment_question_id = body.comment_question_id;
      if (body.comment_answer_id !== undefined) updateData.comment_answer_id = body.comment_answer_id;
      return this.prisma.quoraActivity.update({ where: { id }, data: updateData });
    } else if (plat === 'medium') {
      if (body.post_id !== undefined) updateData.post_id = body.post_id;
      if (body.claps_post_id !== undefined) updateData.claps_post_id = body.claps_post_id;
      if (body.comment_post_id !== undefined) updateData.comment_post_id = body.comment_post_id;
      return this.prisma.mediumActivity.update({ where: { id }, data: updateData });
    } else if (plat === 'browser') {
      if (body.link !== undefined) updateData.link = body.link;
      return this.prisma.browserActivity.update({ where: { id }, data: updateData });
    } else if (plat === 'google') {
      return this.prisma.googleActivity.update({ where: { id }, data: updateData });
    } else if (plat === 'gmaps') {
      if (body.place_id !== undefined) updateData.place_id = body.place_id;
      if (body.navigate_location !== undefined) updateData.navigate_location = body.navigate_location;
      if (body.review_text !== undefined) updateData.review_text = body.review_text;
      if (body.rating !== undefined) updateData.rating = Number(body.rating);
      return this.prisma.gmapsActivity.update({ where: { id }, data: updateData });
    }
  }

  async updateActivityStatus(userId: number, platform: string, id: number, status: number) {
    return this.updateActivity(userId, platform, id, { status });
  }

  async finishActivity(userId: number, platform: string, id: number) {
    return this.updateActivity(userId, platform, id, { status: 1, finished_at: new Date() });
  }

  async deleteActivity(userId: number, platform: string, id: number) {
    const plat = platform.toLowerCase();
    let activity: any = null;

    if (plat === 'youtube') {
      activity = await this.prisma.youtubeActivity.findUnique({ where: { id } });
    } else if (plat === 'quora') {
      activity = await this.prisma.quoraActivity.findUnique({ where: { id } });
    } else if (plat === 'medium') {
      activity = await this.prisma.mediumActivity.findUnique({ where: { id } });
    } else if (plat === 'browser') {
      activity = await this.prisma.browserActivity.findUnique({ where: { id } });
    } else if (plat === 'google') {
      activity = await this.prisma.googleActivity.findUnique({ where: { id } });
    } else if (plat === 'gmaps') {
      activity = await this.prisma.gmapsActivity.findUnique({ where: { id } });
    } else {
      throw new BadRequestException('Plataforma no válida');
    }

    if (!activity) {
      throw new NotFoundException('Actividad no encontrada');
    }

    await this.verifyProfileOwnership(userId, activity.profile_id);

    if (plat === 'youtube') {
      return this.prisma.youtubeActivity.delete({ where: { id } });
    } else if (plat === 'quora') {
      return this.prisma.quoraActivity.delete({ where: { id } });
    } else if (plat === 'medium') {
      return this.prisma.mediumActivity.delete({ where: { id } });
    } else if (plat === 'browser') {
      return this.prisma.browserActivity.delete({ where: { id } });
    } else if (plat === 'google') {
      return this.prisma.googleActivity.delete({ where: { id } });
    } else if (plat === 'gmaps') {
      return this.prisma.gmapsActivity.delete({ where: { id } });
    }
  }

  async logActivity(
    userId: number,
    data: {
      profile_id: number;
      activity_name: string;
      status: string;
      message?: string;
      platform?: string;
    },
  ) {
    await this.verifyProfileOwnership(userId, Number(data.profile_id));
    return this.prisma.activityLog.create({
      data: {
        profile_id: Number(data.profile_id),
        activity_name: data.activity_name || '',
        platform: data.platform || '',
        status: data.status || 'Correcto',
        message: data.message || '',
      },
    });
  }

  async getActivityLogsByProfile(userId: number, profileId: number) {
    await this.verifyProfileOwnership(userId, profileId);
    return this.prisma.activityLog.findMany({
      where: { profile_id: profileId },
      orderBy: { created_at: 'desc' },
      take: 100,
    });
  }

  async createBulkProfile(
    userId: number,
    platform: string,
    body: {
      profile_id: number;
      queries?: string[];
      entries?: string[];
      action_type?: string;
      publish_date?: string;
      publish_time?: string;
    },
  ) {
    const profileId = Number(body.profile_id);
    await this.verifyProfileOwnership(userId, profileId);

    const rawList = body.queries || body.entries || [];
    const cleanList = rawList
      .map((item: string) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item: string) => item.length > 0);

    const publish_date = body.publish_date || '';
    const publish_time = body.publish_time || '';
    const createdItems: any[] = [];

    for (const item of cleanList) {
      if (platform === 'youtube') {
        const isVideo = body.action_type === 'view_video';
        const res = await this.prisma.youtubeActivity.create({
          data: {
            profile_id: profileId,
            search_query: isVideo ? '' : item,
            video_id: isVideo ? item : '',
            status: 0,
            publish_date,
            publish_time,
          },
        });
        createdItems.push(res);
      } else if (platform === 'google') {
        const res = await this.prisma.googleActivity.create({
          data: {
            profile_id: profileId,
            search_query: item,
            status: 0,
            publish_date,
            publish_time,
          },
        });
        createdItems.push(res);
      } else if (platform === 'browser') {
        const res = await this.prisma.browserActivity.create({
          data: {
            profile_id: profileId,
            link: item,
            status: 0,
            publish_date,
            publish_time,
          },
        });
        createdItems.push(res);
      } else if (platform === 'gmaps') {
        const isPlaceId = body.action_type === 'gmaps_visit' || item.startsWith('http') || item.startsWith('ChIJ');
        const res = await this.prisma.gmapsActivity.create({
          data: {
            profile_id: profileId,
            search_query: isPlaceId ? '' : item,
            place_id: isPlaceId ? item : '',
            status: 0,
            publish_date,
            publish_time,
          },
        });
        createdItems.push(res);
      }
    }

    return {
      success: true,
      total_created: createdItems.length,
      items: createdItems,
    };
  }

  async createBulkLocation(
    userId: number,
    body: {
      location_id: number;
      activity_type: string;
      entries: string[];
      publish_date?: string;
      publish_time?: string;
    },
  ) {
    const locationId = Number(body.location_id);
    const location = await (this.prisma as any).location.findFirst({
      where: { id: locationId, user_id: userId },
    });
    if (!location) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    // Buscar perfiles activos asignados a esta Location
    const profiles = await this.prisma.profile.findMany({
      where: {
        user_id: userId,
        location_id: locationId,
        is_archived: false,
      },
    });

    if (!profiles || profiles.length === 0) {
      return {
        success: false,
        profiles_count: 0,
        activities_created: 0,
        message: 'No se encontraron perfiles activos asociados a esta ubicación.',
      };
    }

    const rawList = body.entries || [];
    const cleanEntries = rawList
      .map((e: string) => (typeof e === 'string' ? e.trim() : ''))
      .filter((e: string) => e.length > 0);

    if (cleanEntries.length === 0) {
      return {
        success: false,
        profiles_count: profiles.length,
        activities_created: 0,
        message: 'No se proporcionaron registros válidos para importar.',
      };
    }

    const publish_date = body.publish_date || '';
    const publish_time = body.publish_time || '';
    let totalCreated = 0;

    for (const prof of profiles) {
      for (const entry of cleanEntries) {
        switch (body.activity_type) {
          case 'browser_link':
            await this.prisma.browserActivity.create({
              data: {
                profile_id: prof.id,
                link: entry,
                status: 0,
                publish_date,
                publish_time,
              },
            });
            totalCreated++;
            break;
          case 'google_search':
            await this.prisma.googleActivity.create({
              data: {
                profile_id: prof.id,
                search_query: entry,
                status: 0,
                publish_date,
                publish_time,
              },
            });
            totalCreated++;
            break;
          case 'youtube_search':
            await this.prisma.youtubeActivity.create({
              data: {
                profile_id: prof.id,
                search_query: entry,
                status: 0,
                publish_date,
                publish_time,
              },
            });
            totalCreated++;
            break;
          case 'youtube_video':
            await this.prisma.youtubeActivity.create({
              data: {
                profile_id: prof.id,
                video_id: entry,
                status: 0,
                publish_date,
                publish_time,
              },
            });
            totalCreated++;
            break;
          case 'gmaps_search':
            await this.prisma.gmapsActivity.create({
              data: {
                profile_id: prof.id,
                search_query: entry,
                status: 0,
                publish_date,
                publish_time,
              },
            });
            totalCreated++;
            break;
          case 'gmaps_place_id':
            await this.prisma.gmapsActivity.create({
              data: {
                profile_id: prof.id,
                place_id: entry,
                status: 0,
                publish_date,
                publish_time,
              },
            });
            totalCreated++;
            break;
          default:
            break;
        }
      }
    }

    return {
      success: true,
      profiles_count: profiles.length,
      activities_created: totalCreated,
      message: `Se crearon ${totalCreated} actividades exitosamente para ${profiles.length} perfiles.`,
    };
  }

  async saveGmapsReview(data: { place_id?: string; name_place?: string; review?: string; kind?: number; profile_id?: number }) {
    return (this.prisma as any).gmapsReview.create({
      data: {
        place_id: data.place_id || '',
        name_place: data.name_place || '',
        review: data.review || '',
        kind: data.kind !== undefined ? Number(data.kind) : 1,
        profile_id: data.profile_id ? Number(data.profile_id) : null,
      },
    });
  }

  async getGmapsReviews(limit = 100) {
    return (this.prisma as any).gmapsReview.findMany({
      take: limit,
      orderBy: { id: 'desc' },
      include: { profile: true },
    });
  }
}



