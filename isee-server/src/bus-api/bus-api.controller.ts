import { Controller, Get, UseGuards } from '@nestjs/common'; // Import the missing module
import { BusApiService } from './bus-api.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth-guard/firebase-auth.guard';
import { DefaultDto } from '../common/dto/deafult.dto';
import { BusNodeDto, ResponseBusNodeDto } from './dto/bus.dto';

@Controller('bus-api')
@ApiTags('Bus-API')
export class BusApiController {
  constructor(private busApiService: BusApiService) {}

  @Get('nodes')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 사용자를 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusNodeDto })
  async getAllNodes(): Promise<DefaultDto<BusNodeDto[]>> {
    const bus_nodes = await this.busApiService.getAllNodes();
    return DefaultDto.of<BusNodeDto[]>(true, 'success', bus_nodes);
  }
}
