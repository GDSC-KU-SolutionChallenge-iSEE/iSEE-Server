import { Module } from '@nestjs/common';
import { BusImageController } from './bus-image.controller';
import { BusImageService } from './bus-image.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BusImageController],
  providers: [BusImageService],
})
export class BusImageModule {}
