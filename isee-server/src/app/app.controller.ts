import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('iSEE')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: '서버 상태 확인.' })
  @ApiCreatedResponse({ type: DefaultDto<null> })
  getHello(): DefaultDto<null> {
    return this.appService.getHealth();
  }
}
