import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LinksService } from './links.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserPayload } from '../../common/types/auth.types';

@ApiTags('links')
@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get('media/:id/links')
  @ApiOperation({ summary: 'Get all links for a media item' })
  async getMediaLinks(@Param('id') id: string) {
    return this.linksService.getMediaLinks(id);
  }

  @Post('links')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a link between two media items' })
  async create(@CurrentUser() user: UserPayload, @Body() body: any) {
    return this.linksService.create({ ...body, userId: user.sub });
  }
}
