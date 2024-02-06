import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BusRouteService } from './bus-route.service';
import {
  BusRouteDto,
  QueryBusRouteDto,
  ResponseBusRouteDto,
} from './dto/bus-route.dto';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth-guard/firebase-auth.guard';

@Controller('routes')
@ApiTags('Bus-Route API')
export class BusRouteController {
  constructor(private busRouteService: BusRouteService) {}
  @Get('search')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '버스 노선을 이름으로 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusRouteDto })
  searchBusNodeByName(
    @Query(new ValidationPipe({ transform: true }))
    queryBusRoute: QueryBusRouteDto,
  ): DefaultDto<BusRouteDto[]> {
    return DefaultDto.of<BusRouteDto[]>(
      true,
      'Found bus route by name',
      this.busRouteService.searchBusNodeByName(queryBusRoute.keyword),
    );
  }

  @Get('')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 버스 노선을 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusRouteDto })
  getAllBusRoute(): ResponseBusRouteDto {
    return DefaultDto.of<BusRouteDto[]>(
      true,
      'Found all bus route',
      this.busRouteService.getAllBusRoute(),
    );
  }
}
