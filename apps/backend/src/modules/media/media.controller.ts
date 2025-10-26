import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserPayload } from '../../common/types/auth.types';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Search and filter media items' })
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'creator', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findMany(@Query() query: any) {
    return this.mediaService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media item by ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user?: UserPayload) {
    return this.mediaService.findOne(id, user?.sub);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new media item' })
  async create(@Body() data: any) {
    return this.mediaService.create(data);
  }
}
