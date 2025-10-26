import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class RatingsService {
  constructor(
    private prisma: PrismaService,
    private activityService: ActivityService
  ) {}

  async upsertRating(userId: string, mediaItemId: string, score: number, reviewText?: string) {
    const rating = await this.prisma.rating.upsert({
      where: { userId_mediaItemId: { userId, mediaItemId } },
      update: { score, reviewText, updatedAt: new Date() },
      create: { userId, mediaItemId, score, reviewText },
    });

    await this.activityService.create(userId, 'RATE', mediaItemId);

    return rating;
  }

  async getMediaRatings(mediaItemId: string) {
    return this.prisma.rating.findMany({
      where: { mediaItemId },
      include: { user: { select: { id: true, username: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
