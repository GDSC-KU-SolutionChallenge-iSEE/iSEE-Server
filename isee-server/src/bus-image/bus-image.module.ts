import { Module } from '@nestjs/common';
import { BusImageController } from './bus-image.controller';
import { BusImageService } from './bus-image.service';
import { HttpModule } from '@nestjs/axios';
import { BusRouteService } from 'src/bus-route/bus-route.service';

@Module({
  imports: [HttpModule],
  controllers: [BusImageController],
  providers: [BusImageService, BusRouteService],
})
export class BusImageModule {}
