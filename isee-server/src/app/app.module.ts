import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { CommonModule } from 'src/common/common.module';
import { configModule } from './modules/config.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CacheModule } from '@nestjs/cache-manager';
import { BusImageModule } from 'src/bus-image/bus-image.module';
import { BusNodeModule } from 'src/bus-node/bus-node.module';
import { BusRouteModule } from 'src/bus-route/bus-route.module';

@Module({
  imports: [
    configModule,
    FirebaseModule,
    CacheModule.register({ isGlobal: true }),
    CommonModule,
    UsersModule,
    BusImageModule,
    BusNodeModule,
    BusRouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
