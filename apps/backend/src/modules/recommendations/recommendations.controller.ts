import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserPayload } from '../../common/types/auth.types';

@ApiTags('recommendations')
@Controller()
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get('media/:id/recommendations')
  @ApiOperation({ summary: 'Get recommendations for a media item' })
  async getForMedia(@Param('id') id: string) {
    return this.recommendationsService.getForMedia(id);
  }

  @Get('users/me/recommendations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get personalized recommendations' })
  async getForUser(@CurrentUser() user: UserPayload) {
    return this.recommendationsService.getForUser(user.sub);
  }
}
