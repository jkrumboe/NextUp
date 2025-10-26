import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ActivityKind } from '@prisma/client';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, kind: ActivityKind, refId: string, metadata?: any) {
    return this.prisma.activity.create({
      data: { userId, kind, refId, metadata },
    });
  }

  async getActivity(params: {
    userId?: string;
    kind?: ActivityKind;
    page?: number;
    limit?: number;
  }) {
    const { userId, kind, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    if (kind) where.kind = kind;

    return this.prisma.activity.findMany({
      where,
      include: { user: { select: { id: true, username: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }
}
