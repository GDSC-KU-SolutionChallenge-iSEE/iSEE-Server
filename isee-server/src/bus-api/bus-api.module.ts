import { Module } from '@nestjs/common';
import { BusApiController } from './bus-api.controller';
import { BusApiService } from './bus-api.service';

@Module({
  controllers: [BusApiController],
  providers: [BusApiService],
})
export class BusApiModule {}
