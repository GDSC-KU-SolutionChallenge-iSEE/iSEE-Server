import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import { BusImageDto } from './dto/bus-image.dto';
import { BusImageService } from './bus-image.service';
import {
  BusImageResultCliDto,
  ResponseBusImgDto,
} from './dto/bus-image.result.dto';
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
  @ApiCreatedResponse({ type: ResponseBusImgDto })
  async uploadImage(
    @Body() busImagePayload: BusImageDto,
  ): Promise<DefaultDto<BusImageResultCliDto>> {
    return this.busService.uploadImage(busImagePayload.bus_image);
  }
}
