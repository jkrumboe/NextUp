import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserPayload } from '../../common/types/auth.types';

@ApiTags('ratings')
@Controller('media')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get(':id/ratings')
  @ApiOperation({ summary: 'Get all ratings for a media item' })
  async getMediaRatings(@Param('id') id: string) {
    return this.ratingsService.getMediaRatings(id);
  }

  @Put(':id/rating')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rate a media item' })
  async upsertRating(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
    @Body() body: { score: number; reviewText?: string }
  ) {
    return this.ratingsService.upsertRating(user.sub, id, body.score, body.reviewText);
  }
}
