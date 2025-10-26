import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ActivityService } from '../activity/activity.service';
import { LinkType } from '@prisma/client';

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    private activityService: ActivityService
  ) {}

  async create(data: {
    fromMediaId: string;
    toMediaId: string;
    userId: string;
    linkType: LinkType;
    strength: number;
    note?: string;
  }) {
    const link = await this.prisma.link.create({
      data,
      include: { fromMedia: true, toMedia: true },
    });

    await this.activityService.create(data.userId, 'LINK', link.id);

    return link;
  }

  async getMediaLinks(mediaItemId: string) {
    return this.prisma.link.findMany({
      where: {
        OR: [{ fromMediaId: mediaItemId }, { toMediaId: mediaItemId }],
      },
      include: {
        fromMedia: true,
        toMedia: true,
        user: { select: { id: true, username: true } },
      },
    });
  }
}
