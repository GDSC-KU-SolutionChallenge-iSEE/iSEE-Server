import { Module } from '@nestjs/common';
import { BusRouteController } from './bus-route.controller';
import { BusRouteService } from './bus-route.service';

@Module({
  controllers: [BusRouteController],
  providers: [BusRouteService],
})
export class BusRouteModule {}
