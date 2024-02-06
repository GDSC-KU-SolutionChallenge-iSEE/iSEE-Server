import { Module } from '@nestjs/common';
import { BusNodeService } from './bus-node.service';
import { BusNodeController } from './bus-node.controller';

@Module({
  controllers: [BusNodeController],
  providers: [BusNodeService],
})
export class BusNodeModule {}
