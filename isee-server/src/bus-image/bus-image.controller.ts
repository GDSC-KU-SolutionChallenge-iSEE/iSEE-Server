import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import { BusImageDto } from './dto/bus-image.dto';
import { BusImageService } from './bus-image.service';
import { BusImageResultDto } from './dto/bus-image.result.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth-guard/firebase-auth.guard';

@Controller('bus-image')
@ApiTags('Bus-Image API')
export class BusImageController {
  constructor(private busService: BusImageService) {}

  @Post('')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이미지 속 버스 번호들을 조회합니다.' })
  @ApiCreatedResponse({ type: DefaultDto<BusImageResultDto> })
  async uploadImage(
    @Body() busImagePayload: BusImageDto,
  ): Promise<DefaultDto<BusImageResultDto>> {
    return this.busService.uploadImage(busImagePayload.bus_image);
  }
}
