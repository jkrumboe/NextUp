import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async getForMedia(mediaItemId: string) {
    // Simple recommendation: Get linked items
    const links = await this.prisma.link.findMany({
      where: { fromMediaId: mediaItemId },
      include: {
        toMedia: {
          include: { creators: { include: { creator: true } }, tags: { include: { tag: true } } },
        },
      },
      orderBy: { strength: 'desc' },
      take: 10,
    });

    return links.map((link) => ({
      mediaItem: link.toMedia,
      score: link.strength,
      reasons: [`Linked by ${link.note || 'similarity'}`],
    }));
  }

  async getForUser(userId: string) {
    // Simple: Recommend based on high-rated items
    const topRated = await this.prisma.rating.findMany({
      where: { userId, score: { gte: 8 } },
      include: { mediaItem: true },
      take: 5,
    });

    const recommendations = [];
    for (const rating of topRated) {
      const links = await this.prisma.link.findMany({
        where: { fromMediaId: rating.mediaItemId },
        include: {
          toMedia: {
            include: { creators: { include: { creator: true } }, tags: { include: { tag: true } } },
          },
        },
        take: 2,
      });

      recommendations.push(
        ...links.map((link) => ({
          mediaItem: link.toMedia,
          score: link.strength * (rating.score / 10),
          reasons: [`Similar to ${rating.mediaItem.title}`],
        }))
      );
    }

    return recommendations.slice(0, 10);
  }
}
