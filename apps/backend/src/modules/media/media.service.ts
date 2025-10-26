import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MediaType } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    query?: string;
    type?: MediaType;
    tag?: string;
    creator?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const { query, type, tag, creator, sort = 'recent', page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query) where.title = { contains: query, mode: 'insensitive' };
    if (type) where.type = type;
    if (tag) where.tags = { some: { tag: { name: { equals: tag, mode: 'insensitive' } } } };
    if (creator)
      where.creators = { some: { creator: { name: { contains: creator, mode: 'insensitive' } } } };

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'title') orderBy = { title: 'asc' };

    const [items, total] = await Promise.all([
      this.prisma.mediaItem.findMany({
        where,
        include: {
          creators: { include: { creator: true } },
          tags: { include: { tag: true } },
          _count: { select: { ratings: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.mediaItem.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId?: string) {
    const mediaItem = await this.prisma.mediaItem.findUnique({
      where: { id },
      include: {
        creators: { include: { creator: true } },
        tags: { include: { tag: true } },
        ratings: {
          select: {
            score: true,
            reviewText: true,
            createdAt: true,
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!mediaItem) return null;

    // Calculate average rating
    const ratings = await this.prisma.rating.findMany({
      where: { mediaItemId: id },
      select: { score: true },
    });

    const averageRating = ratings.length
      ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
      : null;

    // Get user's rating if logged in
    let userRating = null;
    if (userId) {
      const rating = await this.prisma.rating.findUnique({
        where: {
          userId_mediaItemId: { userId, mediaItemId: id },
        },
      });
      userRating = rating?.score || null;
    }

    return {
      ...mediaItem,
      averageRating,
      ratingsCount: ratings.length,
      userRating,
    };
  }

  async create(data: any) {
    return this.prisma.mediaItem.create({
      data,
      include: {
        creators: { include: { creator: true } },
        tags: { include: { tag: true } },
      },
    });
  }
}
