import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DefaultDto } from 'src/common/dto/deafult.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHello(): DefaultDto<null> {
    return this.appService.getHealth();
  }
}
