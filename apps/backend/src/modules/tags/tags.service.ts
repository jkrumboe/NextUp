import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findMany(query?: string) {
    return this.prisma.tag.findMany({
      where: query ? { name: { contains: query, mode: 'insensitive' } } : {},
      orderBy: { name: 'asc' },
    });
  }
}
