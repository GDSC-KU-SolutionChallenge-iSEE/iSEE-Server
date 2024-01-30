import { Module } from '@nestjs/common';
import { BusImageController } from './bus-image.controller';
import { BusImageService } from './bus-image.service';

@Module({
  controllers: [BusImageController],
  providers: [BusImageService],
})
export class BusImageModule {}
